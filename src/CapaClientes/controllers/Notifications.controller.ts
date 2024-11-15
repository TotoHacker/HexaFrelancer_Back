import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { NotificationServices } from '../services/notification.services';

@ApiTags('Notifications')
@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationServices) {}

  @Get(':user_id') // Obtener notificaciones de un usuario
  @ApiOperation({ summary: 'Obtener las notificaciones de un usuario' })
  @ApiResponse({ status: 200, description: 'Lista de notificaciones.' })
  @ApiResponse({ status: 400, description: 'Lista vacía o error.' })
  getNotifications(@Param('user_id') userId: string) {
    return this.notificationService.findAll(userId);
  }

  @Put('mark-as-read/:notification_id') // Marcar notificación como leída
  @ApiOperation({ summary: 'Marcar notificación como leída' })
  @ApiResponse({ status: 200, description: 'Notificación marcada como leída.' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada.' })
  markAsRead(@Param('notification_id') notificationId: number) {
    return this.notificationService.markAsRead(notificationId);
  }
}
