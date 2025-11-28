import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CrearLibroDto } from '../dto/crear-libro.dto';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  async obtenerTodos() {
    return this.librosService.encontrarTodos();
  }

  @Get('buscar')
  async buscar(@Query('q') termino: string) {
    return this.librosService.buscar(termino);
  }

  @Get(':id')
  async obtenerUno(@Param('id') id: string) {
    return this.librosService.encontrarPorId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() crearLibroDto: CrearLibroDto) {
    return this.librosService.crear(crearLibroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async actualizar(@Param('id') id: string, @Body() actualizarLibroDto: Partial<CrearLibroDto>) {
    return this.librosService.actualizar(+id, actualizarLibroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.librosService.eliminar(+id);
  }
}