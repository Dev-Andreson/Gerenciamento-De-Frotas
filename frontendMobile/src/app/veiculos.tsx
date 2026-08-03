import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { VeiculoService } from '@/services/veiculo.service';
import { MarcaService } from '@/services/marca.service';
import { CategoriaService } from '@/services/categoria.service';
import { useAuth } from '@/context/AuthContext';

export default function Veiculos() {
  const { user } = useAuth();
  const isAdmin = user?.perfil === 'administrador';
  const [data, setData] = useState<any[]>([]);
  const [marcas, setMarcas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<any>(null);
  const [form, setForm] = useState({ modelo: '', ano: '2024', preco_diaria: '100', disponibilidade: 'Disponivel', id_marca: '', id_categoria: '' });

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    try {
      const [v, m, c] = await Promise.all([VeiculoService.listar(1, 100), MarcaService.listar(), CategoriaService.listar()]);
      setData(v.dados || []);
      setMarcas(m);
      setCategorias(c);
    } catch (error) { Alert.alert('Erro', 'Falha ao carregar dados'); }
  };

  const salvar = async () => {
    if (!form.modelo || !form.id_marca || !form.id_categoria) { Alert.alert('Erro', 'Preencha todos os campos'); return; }
    try {
      const payload = { ...form, ano: parseInt(form.ano), preco_diaria: parseFloat(form.preco_diaria), id_marca: parseInt(form.id_marca), id_categoria: parseInt(form.id_categoria) };
      if (editando) await VeiculoService.atualizar(editando.id, payload);
      else await VeiculoService.criar(payload);
      Alert.alert('Sucesso', editando ? 'Atualizado!' : 'Cadastrado!');
      setModalVisible(false); carregarDados();
    } catch (error) { Alert.alert('Erro', 'Falha ao salvar'); }
  };

  const deletar = (id: number) => {
    Alert.alert('Confirmar', 'Excluir este veículo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await VeiculoService.deletar(id); carregarDados(); } }
    ]);
  };

  const abrirForm = (item?: any) => {
    if (!isAdmin) return;
    setEditando(item);
    setForm(item ? { ...item, id_marca: String(item.id_marca), id_categoria: String(item.id_categoria) } : { modelo: '', ano: '2024', preco_diaria: '100', disponibilidade: 'Disponivel', id_marca: '', id_categoria: '' });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Veículos</Text>{isAdmin && <TouchableOpacity style={styles.addButton} onPress={() => abrirForm()}><Text style={styles.addText}>+</Text></TouchableOpacity>}</View>
      
      <FlatList data={data} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.modelo} ({item.ano})</Text>
          <Text style={styles.itemSub}>{item.nome} • {item.descricao} • R${item.preco_diaria}</Text>
          {isAdmin && <View style={styles.actions}><TouchableOpacity onPress={() => abrirForm(item)}><Text style={styles.edit}>Editar</Text></TouchableOpacity><TouchableOpacity onPress={() => deletar(item.id)}><Text style={styles.delete}>Excluir</Text></TouchableOpacity></View>}
        </View>
      )} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editando ? 'Editar' : 'Novo'} Veículo</Text>
            <TextInput style={styles.input} placeholder="Modelo" value={form.modelo} onChangeText={(t) => setForm({...form, modelo: t})} />
            <TextInput style={styles.input} placeholder="Ano" value={form.ano} onChangeText={(t) => setForm({...form, ano: t})} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Preço Diária" value={form.preco_diaria} onChangeText={(t) => setForm({...form, preco_diaria: t})} keyboardType="numeric" />
            
            <Text style={styles.label}>Marca</Text>
            <View style={styles.pickerContainer}>
              {marcas.map(m => (
                <TouchableOpacity key={m.id} style={[styles.option, form.id_marca === String(m.id) && styles.optionSelected]} onPress={() => setForm({...form, id_marca: String(m.id)})}>
                  <Text style={form.id_marca === String(m.id) ? styles.optionSelectedText : styles.optionText}>{m.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Categoria</Text>
            <View style={styles.pickerContainer}>
              {categorias.map(c => (
                <TouchableOpacity key={c.id} style={[styles.option, form.id_categoria === String(c.id) && styles.optionSelected]} onPress={() => setForm({...form, id_categoria: String(c.id)})}>
                  <Text style={form.id_categoria === String(c.id) ? styles.optionSelectedText : styles.optionText}>{c.descricao}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={salvar}><Text style={styles.saveText}>Salvar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: { backgroundColor: '#28a745', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  addText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  item: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  itemTitle: { fontSize: 16, fontWeight: 'bold' }, itemSub: { color: '#666', marginTop: 4 },
  actions: { flexDirection: 'row', marginTop: 10, gap: 15 },
  edit: { color: '#007bff' }, delete: { color: '#dc3545' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12, maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  pickerContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  option: { padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginRight: 8, marginBottom: 8 },
  optionSelected: { backgroundColor: '#667eea', borderColor: '#667eea' },
  optionText: { color: '#333' }, optionSelectedText: { color: '#fff' },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#6c757d', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  cancelText: { color: '#fff', fontWeight: 'bold' },
});