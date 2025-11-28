import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async obtenerPerfil(@Request() req) {
    const usuario = await this.usuariosService.encontrarPorId(req.user.userId);
    
    if (!usuario) {
      return { message: 'Usuario no encontrado' };
    }
    
    const { password, ...resultado } = usuario;
    return resultado;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async obtenerTodos() {
    const usuarios = await this.usuariosService.encontrarTodos();
    return usuarios.map(({ password, ...user }) => user);
  }
}