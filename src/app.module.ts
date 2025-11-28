import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LibrosModule } from './libros/libros.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { Usuario } from './entities/usuario.entity';
import { Libro } from './entities/libro.entity';
import { Prestamo } from './entities/prestamo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'biblioteca.db',
      entities: [Usuario, Libro, Prestamo],
      synchronize: true, // Solo para desarrollo
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AutenticacionModule,
    UsuariosModule,
    LibrosModule,
    PrestamosModule,
  ],
})
export class AppModule {}