import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/capaClientes/modules/user.module';
import { ProjectApplicationsModule } from '../CapaClientes/modules/project-applications.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log('Dirname:', __dirname);
    
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/../capaClientes/Entities/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    

    UserModule,ProjectApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
