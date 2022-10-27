import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Plan, Usuario} from '../models';
import {PlanRepository} from './plan.repository';
import {UsuarioRepository} from './usuario.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.Id,
  MascotaRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof Mascota.prototype.Id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Mascota.prototype.Id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Mascota, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
