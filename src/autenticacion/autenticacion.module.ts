import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: 'MI_SECRETO_SUPER_SEGURO_123',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AutenticacionService, JwtStrategy, JwtAuthGuard],
  controllers: [AutenticacionController],
  exports: [JwtAuthGuard],
})
export class AutenticacionModule {}