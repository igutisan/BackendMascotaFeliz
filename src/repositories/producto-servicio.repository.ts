import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ProductoServicio, ProductoServicioRelations} from '../models';

export class ProductoServicioRepository extends DefaultCrudRepository<
  ProductoServicio,
  typeof ProductoServicio.prototype.Id,
  ProductoServicioRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(ProductoServicio, dataSource);
  }
}
