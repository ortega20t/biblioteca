import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LibrosService } from './libros/libros.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const librosService = app.get(LibrosService);

  const libros = [
    {
      titulo: 'Cien Años de Soledad',
      autor: 'Gabriel García Márquez',
      descripcion: 'Una obra maestra del realismo mágico',
      copias: 3,
    },
    {
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes',
      descripcion: 'La novela más importante de la literatura española',
      copias: 5,
    },
    {
      titulo: '1984',
      autor: 'George Orwell',
      descripcion: 'Una distopía sobre el totalitarismo',
      copias: 4,
    },
    {
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      descripcion: 'Un cuento filosófico para todas las edades',
      copias: 2,
    },
    {
      titulo: 'Crónica de una Muerte Anunciada',
      autor: 'Gabriel García Márquez',
      descripcion: 'Una historia de honor y destino',
      copias: 3,
    },
  ];

  try {
    for (const libro of libros) {
      await librosService.crear(libro);
      console.log(`✅ Libro agregado: ${libro.titulo}`);
    }
    console.log('\n🎉 ¡Todos los libros fueron agregados exitosamente!');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  await app.close();
}

bootstrap();