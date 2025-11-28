import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prestamo } from './prestamo.entity';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ default: true })
  disponible: boolean;

  @Column({ default: 0 })
  copias: number;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.libro)
  prestamos: Prestamo[];
}