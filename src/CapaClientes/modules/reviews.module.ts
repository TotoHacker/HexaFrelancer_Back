import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingReview } from '../entities/rating-review.entity';
import { RatingsReviewsService } from '../services/ratings-reviews.service';
import { RatingsReviewsController } from '../controllers/ratings-reviews.controller';
import { Project } from '../entities/project.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingReview, Project, UserEntity])],
  providers: [RatingsReviewsService],
  controllers: [RatingsReviewsController],
})
export class RatingsReviewsModule {}
