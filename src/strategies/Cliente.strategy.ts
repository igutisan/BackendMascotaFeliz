import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';

export class estrategiaCliente implements AuthenticationStrategy{
  name: string = "Cliente";

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ){

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if(token){

      let datos = this.servicioAutenticacion.validarTokenJWT(token)
      if (datos) {
        if (datos.Data.rol === "Cliente") {
          const perfil3: UserProfile = Object.assign({
            nombre : datos.Data.nombre
          });
          return perfil3;
      }else{
        throw new HttpErrors[401]("No es un cliente")
      };



      }else{
        throw new HttpErrors[401]("El token es invalido")
      }
    }else{
      throw new HttpErrors[401]("No se a incluido un token en la solicitud ")
    }

  }
}
