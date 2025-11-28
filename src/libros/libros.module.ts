import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Libro } from '../entities/libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  providers: [LibrosService],
  controllers: [LibrosController],
  exports: [LibrosService],
})
export class LibrosModule {}