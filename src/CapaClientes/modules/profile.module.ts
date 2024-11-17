import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';
import { ProfileController } from '../controllers/profile.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity])],
    providers: [ProfileService],
    controllers: [ProfileController]
})
export class ProfileModule {}
