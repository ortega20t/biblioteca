import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CrearUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}