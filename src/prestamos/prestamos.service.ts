import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo } from '../entities/prestamo.entity';
import { LibrosService } from '../libros/libros.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo)
    private prestamosRepository: Repository<Prestamo>,
    private librosService: LibrosService,
    private usuariosService: UsuariosService,
  ) {}

  async solicitarPrestamo(usuarioId: number, libroId: number): Promise<Prestamo> {
    const libro = await this.librosService.encontrarPorId(libroId);
    const usuario = await this.usuariosService.encontrarPorId(usuarioId);

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!libro.disponible || libro.copias <= 0) {
      throw new BadRequestException('El libro no está disponible');
    }

    const prestamo = this.prestamosRepository.create({
      usuario: usuario,
      libro: libro,
      estado: 'activo',
    });

    await this.librosService.reducirCopias(libroId);
    return await this.prestamosRepository.save(prestamo);
  }

  async devolverPrestamo(prestamoId: number): Promise<Prestamo> {
    const prestamo = await this.prestamosRepository.findOne({
      where: { id: prestamoId },
      relations: ['libro'],
    });

    if (!prestamo) {
      throw new NotFoundException('Préstamo no encontrado');
    }

    if (prestamo.estado === 'devuelto') {
      throw new BadRequestException('Este préstamo ya fue devuelto');
    }

    prestamo.estado = 'devuelto';
    prestamo.fechaDevolucion = new Date();

    await this.librosService.aumentarCopias(prestamo.libro.id);
    return await this.prestamosRepository.save(prestamo);
  }

  async obtenerPrestamosUsuario(usuarioId: number): Promise<Prestamo[]> {
    return this.prestamosRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['libro'],
      order: { fechaPrestamo: 'DESC' },
    });
  }

  async obtenerTodos(): Promise<Prestamo[]> {
    return this.prestamosRepository.find({
      relations: ['usuario', 'libro'],
      order: { fechaPrestamo: 'DESC' },
    });
  }
}