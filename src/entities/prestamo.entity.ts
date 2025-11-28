import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Libro } from './libro.entity';

@Entity('prestamos')
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.prestamos)
  usuario: Usuario;

  @ManyToOne(() => Libro, (libro) => libro.prestamos)
  libro: Libro;

  @CreateDateColumn()
  fechaPrestamo: Date;

  @Column({ nullable: true })
  fechaDevolucion: Date;

  @Column({ default: 'activo' })
  estado: string; // activo, devuelto
}