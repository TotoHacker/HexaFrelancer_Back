import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingReview } from '../entities/rating-review.entity';
import { CreateRatingReviewDto } from '../dto/create-rating-review.dto';

@Injectable()
export class RatingsReviewsService {
  constructor(
    @InjectRepository(RatingReview)
    private ratingsReviewsRepository: Repository<RatingReview>,
  ) {}

  create(createRatingReviewDto: CreateRatingReviewDto): Promise<RatingReview> {
    const ratingReview = this.ratingsReviewsRepository.create(createRatingReviewDto);
    return this.ratingsReviewsRepository.save(ratingReview);
  }

  findByUser(user_id: number): Promise<RatingReview[]> {
    return this.ratingsReviewsRepository.find({ where: { reviewee_id: user_id } });
  }
}
