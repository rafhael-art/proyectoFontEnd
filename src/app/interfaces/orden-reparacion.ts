import { OrdenReparacionDetalle } from "./orden-reparacion-detalle";

export interface OrdenReparacion {
  idReparacion: 0,
  descripcion: string,
  clienteId: string,
  fecha: Date,
  total: number,
  numero: string,
  empleadoId: number,
  detalles: OrdenReparacionDetalle[]
}
