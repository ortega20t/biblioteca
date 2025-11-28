import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CrearLibroDto {
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  autor: string;

  @IsOptional()
  descripcion?: string;

  @IsNumber()
  copias: number;
}