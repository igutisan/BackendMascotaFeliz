import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';

export class estrategiaAsesor implements AuthenticationStrategy{
  name: string = 'Asesor';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ){

  }
 async authenticate(request: Request):Promise<UserProfile | undefined> {
  let token = parseBearerToken(request);
  if (token){
    let datos = this.servicioAutenticacion.validarTokenJWT(token)
    if(datos){
      if(datos.Data.rol === "Asesor") {
        const perfil2: UserProfile = Object.assign({
          nombre: datos.Data.nombre
        });
        return perfil2;
      }else{
        throw new HttpErrors[401]("No es asesor")
      };
    }else{
      throw new HttpErrors[401]("El token incluido no es valido")
    }

  }else{
    throw new HttpErrors[401]("No se a incluido un token en la ")
  }
 }

}
