import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(crearUsuarioDto.password, 10);
    const usuario = this.usuariosRepository.create({
      ...crearUsuarioDto,
      password: hashedPassword,
    });
    return this.usuariosRepository.save(usuario);
  }

  async encontrarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  async encontrarPorId(id: number): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async encontrarTodos(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }
}