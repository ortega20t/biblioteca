import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';

@Controller('prestamos')
@UseGuards(JwtAuthGuard)
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Post()
  async solicitarPrestamo(@Request() req, @Body('libroId') libroId: number) {
    return this.prestamosService.solicitarPrestamo(req.user.userId, libroId);
  }

  @Put(':id/devolver')
  async devolverPrestamo(@Param('id') id: string) {
    return this.prestamosService.devolverPrestamo(+id);
  }

  @Get('mis-prestamos')
  async obtenerMisPrestamos(@Request() req) {
    return this.prestamosService.obtenerPrestamosUsuario(req.user.userId);
  }

  @Get()
  async obtenerTodos() {
    return this.prestamosService.obtenerTodos();
  }
}