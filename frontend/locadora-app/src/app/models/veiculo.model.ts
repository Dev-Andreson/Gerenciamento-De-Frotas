export interface Veiculo {
  id: number;
  modelo: string;
  ano: number;
  preco_diaria: number;
  disponibilidade: string;
  id_marca: number;
  id_categoria: number;
  nome?: string;
  descricao?: string; 
}

export interface VeiculoRequest {
  modelo: string;
  ano: number;
  preco_diaria: number;
  disponibilidade: string;
  id_marca: number;
  id_categoria: number;
}