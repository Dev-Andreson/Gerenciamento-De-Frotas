import api from './api';

export interface Veiculo {
  id: number; modelo: string; ano: number; preco_diaria: number;
  disponibilidade: string; id_marca: number; id_categoria: number;
  nome?: string; descricao?: string;
}

export const VeiculoService = {
  listar: async (page = 1, limit = 10) => (await api.get(`/veiculos?page=${page}&limit=${limit}`)).data,
  criar: async (veiculo: any) => (await api.post('/veiculos', veiculo)).data,
  atualizar: async (id: number, veiculo: any) => (await api.put(`/veiculos/editar/${id}`, veiculo)).data,
  deletar: async (id: number) => (await api.delete(`/veiculos/${id}`)).data,
};