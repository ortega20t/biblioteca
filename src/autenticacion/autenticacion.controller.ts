import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('registro')
  async registrar(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.autenticacionService.registrar(crearUsuarioDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.autenticacionService.login(loginDto);
  }
}