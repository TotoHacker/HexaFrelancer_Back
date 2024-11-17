import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/CapaClientes/modules/user.module';
import { ProjectApplicationsModule } from '../CapaClientes/modules/project-applications.module';
import { SkillModule } from 'src/CapaClientes/modules/skill.module';
import { ProjectsModule } from 'src/CapaClientes/modules/projects.module';
import {NotificationModule} from 'src/CapaClientes/modules/notification.module'
import { ProfileModule } from 'src/CapaClientes/modules/profile.module';
import { UserSkillModule } from 'src/CapaClientes/modules/user_skill.module';
import { RatingsReviewsModule } from 'src/CapaClientes/modules/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log('Dirname:', __dirname);
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    

    UserModule, ProjectApplicationsModule, SkillModule, ProjectsModule, NotificationModule, ProfileModule,
    UserSkillModule, RatingsReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
