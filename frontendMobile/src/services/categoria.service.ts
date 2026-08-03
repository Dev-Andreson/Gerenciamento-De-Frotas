import api from './api';
export const CategoriaService = {
  listar: async () => (await api.get('/categorias')).data,
  criar: async (cat: { descricao: string }) => (await api.post('/categoria', cat)).data,
  atualizar: async (id: number, cat: { descricao: string }) => (await api.put(`/categoria/${id}`, cat)).data,
  deletar: async (id: number) => (await api.delete(`/categoria/${id}`)).data,
};