import {AuthenticationStrategy} from '@loopback/authentication';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import {ParsedQs} from 'qs';
import parseBearerToken from 'parse-bearer-token';
import {service} from '@loopback/core';
import {AutenticacionService} from '../services';

export class estrategiaAdministrador implements AuthenticationStrategy{
  name: string = 'Admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ){

  }

 async authenticate(request: Request):Promise<UserProfile | undefined> {
  let token = parseBearerToken(request);
  if (token) {
    let datos = this.servicioAutenticacion.validarTokenJWT(token);
    if (datos) {
      if (datos.Data.rol === "Administrador") {
        const perfil: UserProfile = Object.assign({
          nombre: datos.Data.nombre
          });
        return perfil;
      }else{
        throw new HttpErrors[401]("No es administardor")
      };



    }else{
      throw new HttpErrors[401]("El token incluido no es valido")
    };
  }else{
    throw new HttpErrors[401]("No se a incluido un token en la solicitud")
  };
 }


}
