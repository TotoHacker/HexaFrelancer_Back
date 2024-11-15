import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationServices {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>
  ) {}

  // Obtener todas las notificaciones de un usuario
  async findAll(userId: string): Promise<NotificationEntity[]> {
    const userIdNumber = parseInt(userId, 10); // Convertir el string a número

    // Validar si la conversión es válida
    if (isNaN(userIdNumber)) {
      throw new NotFoundException({ message: 'ID de usuario no válido' });
    }

    const notifications = await this.notificationRepository.find({
      where: { user_id: userIdNumber },
    });

    if (!notifications.length) {
      throw new NotFoundException({ message: 'No se encontraron notificaciones' });
    }

    return notifications;
  }

  // Marcar una notificación como leída
  async markAsRead(notificationId: number): Promise<any> {
    const notification = await this.notificationRepository.findOne({
      where: { notification_id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException({ message: 'Notificación no encontrada' });
    }

    notification.is_read = true;
    await this.notificationRepository.save(notification);
    return { message: `Notificación con ID: ${notificationId} marcada como leída` };
  }

  // Método adicional para eliminar una notificación
  async delete(notificationId: number): Promise<any> {
    const notification = await this.notificationRepository.findOne({
      where: { notification_id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException({ message: 'Notificación no encontrada' });
    }

    await this.notificationRepository.delete(notificationId);
    return { message: `Notificación con ID: ${notificationId} eliminada` };
  }
}
