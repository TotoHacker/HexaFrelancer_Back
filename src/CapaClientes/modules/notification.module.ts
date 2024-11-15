import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationServices } from '../services/notification.services';
import { NotificationController } from '../controllers/Notifications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [NotificationServices],
  controllers: [NotificationController],
})
export class NotificationModule {}
