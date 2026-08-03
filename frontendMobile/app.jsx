// frontendMobile/App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Telas de autenticação (exemplo)
function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  return (
    <View style={styles.center}>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => signIn({ email: 'teste@teste.com', senha: '123' })}>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

function RegisterScreen() {
  return (
    <View style={styles.center}>
      <Text>Registro</Text>
    </View>
  );
}

// Telas do app (exemplo)
function VeiculosScreen() {
  return (
    <View style={styles.center}>
      <Text>Veículos</Text>
    </View>
  );
}

function MotoristasScreen() {
  return (
    <View style={styles.center}>
      <Text>Motoristas</Text>
    </View>
  );
}

function RotasScreen() {
  return (
    <View style={styles.center}>
      <Text>Rotas</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Veiculos" component={VeiculosScreen} />
      <Tab.Screen name="Motoristas" component={MotoristasScreen} />
      <Tab.Screen name="Rotas" component={RotasScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});