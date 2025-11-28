import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsuariosService } from './usuarios/usuarios.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usuariosService = app.get(UsuariosService);

  try {
    const admin = await usuariosService.crear({
      email: 'admin@biblioteca.com',
      nombre: 'Administrador',
      password: 'admin123',
    });

    // Actualizar manualmente para hacerlo admin
    await app.get('DataSource').query(
      `UPDATE usuarios SET esAdmin = 1 WHERE id = ${admin.id}`
    );

    console.log('✅ Usuario administrador creado:');
    console.log('Email: admin@biblioteca.com');
    console.log('Password: admin123');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  await app.close();
}

bootstrap();