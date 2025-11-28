import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from '../entities/prestamo.entity';
import { LibrosModule } from '../libros/libros.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prestamo]),
    LibrosModule,
    UsuariosModule,
  ],
  providers: [PrestamosService],
  controllers: [PrestamosController],
})
export class PrestamosModule {}