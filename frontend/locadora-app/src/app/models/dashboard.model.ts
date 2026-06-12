import { Veiculo } from './veiculo.model';

export interface DashboardData {
  totalVeiculos: number;
  totalMarcas: number;
  totalCategorias: number;
  ultimosVeiculos: Veiculo[];
}