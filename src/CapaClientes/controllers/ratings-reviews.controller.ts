import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RatingsReviewsService } from '../services/ratings-reviews.service';
import { CreateRatingReviewDto } from '../dto/create-rating-review.dto';
import { RatingReview } from '../entities/rating-review.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Ratings And Reviews')
@Controller('api/reviews')
export class RatingsReviewsController {
  constructor(private readonly ratingsReviewsService: RatingsReviewsService) {}

  @ApiOperation({ summary: 'Calificar a un freelancer o cliente' })
  @ApiResponse({ status: 201, description: 'La calificación ha sido creada.', type: RatingReview })
  @Post('rate')
  create(@Body() createRatingReviewDto: CreateRatingReviewDto): Promise<RatingReview> {
    return this.ratingsReviewsService.create(createRatingReviewDto);
  }

  @ApiOperation({ summary: 'Obtener calificaciones de un usuario' })
  @ApiResponse({ status: 200, description: 'Lista de calificaciones.', type: [RatingReview] })
  @Get(':user_id')
  findByUser(@Param('user_id') user_id: number): Promise<RatingReview[]> {
    return this.ratingsReviewsService.findByUser(user_id);
  }
}
