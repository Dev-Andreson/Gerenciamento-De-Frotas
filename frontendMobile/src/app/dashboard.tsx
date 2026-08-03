import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { VeiculoService } from '@/services/veiculo.service';
import { MarcaService } from '@/services/marca.service';
import { CategoriaService } from '@/services/categoria.service';
import { useAuth } from '@/context/AuthContext';
import { TouchableOpacity } from 'react-native';

export default function Dashboard() {
  const [totais, setTotais] = useState({ veiculos: 0, marcas: 0, categorias: 0 });
  const [ultimos, setUltimos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut, user } = useAuth();

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    try {
      const [v, m, c] = await Promise.all([
        VeiculoService.listar(1, 5),
        MarcaService.listar(),
        CategoriaService.listar()
      ]);
      setTotais({ veiculos: v.paginacao?.total_itens || v.dados?.length || 0, marcas: m.length, categorias: c.length });
      setUltimos(v.dados || []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo, {user?.nome}!</Text>
        <TouchableOpacity onPress={signOut}><Text style={styles.logout}>Sair</Text></TouchableOpacity>
      </View>
      <View style={styles.cards}>
        <View style={styles.card}><Text style={styles.cardNumber}>{totais.veiculos}</Text><Text style={styles.cardLabel}>Veículos</Text></View>
        <View style={styles.card}><Text style={styles.cardNumber}>{totais.marcas}</Text><Text style={styles.cardLabel}>Marcas</Text></View>
        <View style={styles.card}><Text style={styles.cardNumber}>{totais.categorias}</Text><Text style={styles.cardLabel}>Categorias</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Últimos Veículos</Text>
      {ultimos.map((v) => (
        <View key={v.id} style={styles.item}>
          <Text style={styles.itemModel}>{v.modelo}</Text>
          <Text style={styles.itemDetail}>{v.nome} • {v.descricao} • R${v.preco_diaria}/dia</Text>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcome: { fontSize: 20, fontWeight: 'bold' }, logout: { color: '#dc3545', fontWeight: 'bold' },
  cards: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  card: { backgroundColor: '#667eea', padding: 20, borderRadius: 12, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  cardNumber: { fontSize: 28, fontWeight: 'bold', color: '#fff' }, cardLabel: { color: '#fff', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  itemModel: { fontSize: 16, fontWeight: 'bold' }, itemDetail: { color: '#666', marginTop: 4 }
});