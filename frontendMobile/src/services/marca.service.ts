import api from './api';
export const MarcaService = {
  listar: async () => (await api.get('/marcas')).data,
  criar: async (marca: { nome: string }) => (await api.post('/marca', marca)).data,
  atualizar: async (id: number, marca: { nome: string }) => (await api.put(`/marca/${id}`, marca)).data,
  deletar: async (id: number) => (await api.delete(`/marca/${id}`)).data,
};