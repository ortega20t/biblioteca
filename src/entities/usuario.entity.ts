import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prestamo } from './prestamo.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column({ default: false })
  esAdmin: boolean;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.usuario)
  prestamos: Prestamo[];
}