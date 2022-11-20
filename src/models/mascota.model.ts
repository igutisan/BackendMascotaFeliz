import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {Usuario} from './usuario.model';

@model()
export class Mascota extends Entity {
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
  Especie: string;

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Raza: string;

  @property({
    type: 'number',
    required: true,
  })
  Edad: number;

  @property({
    type: 'number',
    required: true,
  })
  Peso: number;

  @property({
    type: 'number',
    required: true,
  })
  Tamano: number;

  @property({
    type: 'string',
    required: true,
  })
  Sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  Foto: string;

  @property({
    type: 'string',
    required: false,
  })
  Detalle: string;
  @property({
    type: 'string',
    required: false,
  })
  Estado: string;

  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
