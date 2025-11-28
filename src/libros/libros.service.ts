import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Libro } from '../entities/libro.entity';
import { CrearLibroDto } from '../dto/crear-libro.dto';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private librosRepository: Repository<Libro>,
  ) {}

  async crear(crearLibroDto: CrearLibroDto): Promise<Libro> {
    const libro = this.librosRepository.create({
      ...crearLibroDto,
      disponible: crearLibroDto.copias > 0,
    });
    return this.librosRepository.save(libro);
  }

  async encontrarTodos(): Promise<Libro[]> {
    return this.librosRepository.find();
  }

  async encontrarPorId(id: number): Promise<Libro> {
    const libro = await this.librosRepository.findOne({ where: { id } });
    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }
    return libro;
  }

  async buscar(termino: string): Promise<Libro[]> {
    return this.librosRepository.find({
      where: [
        { titulo: Like(`%${termino}%`) },
        { autor: Like(`%${termino}%`) },
      ],
    });
  }

  async actualizar(id: number, actualizarLibroDto: Partial<CrearLibroDto>): Promise<Libro> {
    await this.librosRepository.update(id, actualizarLibroDto);
    return this.encontrarPorId(id);
  }

  async eliminar(id: number): Promise<void> {
    const resultado = await this.librosRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException('Libro no encontrado');
    }
  }

  async reducirCopias(id: number): Promise<void> {
    const libro = await this.encontrarPorId(id);
    libro.copias -= 1;
    libro.disponible = libro.copias > 0;
    await this.librosRepository.save(libro);
  }

  async aumentarCopias(id: number): Promise<void> {
    const libro = await this.encontrarPorId(id);
    libro.copias += 1;
    libro.disponible = true;
    await this.librosRepository.save(libro);
  }
}