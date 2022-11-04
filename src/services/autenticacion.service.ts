import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import{Llaves}from '../config/llaves';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {}


  /*
   * Add service methods here
   */
  // Metodo para generar clave
  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }
  //Metodo para cifrar la clave creada previamente
    cifrarClave(clave:string){
      let claveCifrada = cryptoJS.MD5(clave).toString();
      return claveCifrada;
    }
    // Para encontrar a una persona
    IdentificarPersona(usuario:string, contrasena: string) {

      try{
        let u = this.usuarioRepository.findOne({where:{Correo: usuario, Contrasena: contrasena}});
        if(u){
          return u;
          u;
        }
        return false;
      }catch  {
        return false;
      }

    }
    GenerarTokenJWT(usuario: Usuario){
      let token = jwt.sign({
        Data:{
          id: usuario.id,
          correo: usuario.Correo,
          nombre: usuario.Nombre + " "+usuario.Apellido,
          rol: usuario.Rol
        }

      },Llaves.claveJWT);
      return token;
    }
    validarTokenJWT(token: string){
      try {
          let datos = jwt.verify(token, Llaves.claveJWT);
          return datos;
      } catch {
        return false;
      }
    }

}
