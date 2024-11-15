import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/capaClientes/modules/user.module';
// import { ProjectApplicationsModule } from '../capaClientes/modules/project-applications.module';
import { ProjectsModule } from '../capaClientes/modules/projects.module';
// import {UserEntity} from '../capaClientes/Entities/user.entity' 
import {Project} from '../capaClientes/Entities/project.entity' 

// import {ProjectsController} from '../CapaClientes/controllers/projects.controller'
// import {UserController} from '../CapaClientes/controllers/user.controller'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../capaClientes/Entities/*.entity{.ts,.js}'],        
        synchronize: false, // Cambiado a true para desarrollo
      }),
      inject: [ConfigService],
    }),
    UserModule,
    // ProjectApplicationsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
