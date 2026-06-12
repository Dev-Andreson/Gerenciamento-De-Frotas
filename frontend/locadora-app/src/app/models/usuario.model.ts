export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'admin' | 'comum';
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}