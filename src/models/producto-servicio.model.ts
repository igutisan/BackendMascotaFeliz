import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductoServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'string',
    required: true,
  })
  Detalle: string;
  @property({
    type: 'string',
    required: true,
  })
  Foto: string;



  constructor(data?: Partial<ProductoServicio>) {
    super(data);
  }
}

export interface ProductoServicioRelations {
  // describe navigational properties here
}

export type ProductoServicioWithRelations = ProductoServicio & ProductoServicioRelations;
