import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from '../entities/skill.entity';
import { SkillService } from '../services/skill.service';
import { SkillController } from '../controllers/skill.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SkillEntity])],
    providers: [SkillService],
    controllers: [SkillController]
  })
export class SkillModule {}
