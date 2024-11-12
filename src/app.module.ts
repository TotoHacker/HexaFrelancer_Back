import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),

    UserModule,
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => {
    //     console.log('Conectando a la base de datos con las siguientes configuraciones:');
    //     console.log({
    //       host: process.env.DB_HOST,
    //       port: +process.env.DB_PORT,
    //       username: process.env.DB_USERNAME,
    //       password: process.env.DB_PASSWORD,
    //       database: process.env.DB_NAME,
    //     });
    //     return {
    //       type: 'mysql',
    //       host: process.env.DB_HOST,
    //       port: +process.env.DB_PORT,
    //       username: process.env.DB_USERNAME,
    //       password: process.env.DB_PASSWORD,
    //       database: process.env.DB_NAME,
    //       synchronize: true,
    //     };
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
