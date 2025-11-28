import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AutenticacionService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async registrar(crearUsuarioDto: CrearUsuarioDto) {
    const usuario = await this.usuariosService.crear(crearUsuarioDto);
    const { password, ...resultado } = usuario;
    return resultado;
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuariosService.encontrarPorEmail(loginDto.email);
    
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const esValido = await bcrypt.compare(loginDto.password, usuario.password);
    
    if (!esValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: usuario.email, sub: usuario.id, esAdmin: usuario.esAdmin };
    
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        esAdmin: usuario.esAdmin,
      },
    };
  }
}