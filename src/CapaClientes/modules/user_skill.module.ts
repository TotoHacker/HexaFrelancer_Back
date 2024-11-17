import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkillEntity } from '../entities/user_skill.entity';
import { UserEntity } from '../entities/user.entity';
import { SkillEntity } from '../entities/skill.entity';
import { UserSkillService } from '../services/user_skill.service';
import { UserSkillController } from '../controllers/user_skill.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkillEntity, UserEntity, SkillEntity])],
  providers: [UserSkillService],
  controllers: [UserSkillController]
})
export class UserSkillModule {}
