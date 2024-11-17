import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from '../dto/profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private profileRepository: Repository<ProfileEntity>
    ){}

    async findById(user_id:number): Promise<ProfileEntity>
    {
        const profile = await this.profileRepository.findOne({
            where: { user: { user_id: user_id } },
            relations: ['user'],
        });
        if(!profile){
            throw new NotFoundException({message: 'No existe el perfil'});
        }
        return profile;
    }

    async update(user_id: number, dto: ProfileDto): Promise<any>{
        const profile = await this.profileRepository.findOne({
            where: { user: { user_id: user_id } },
            relations: ['user'],
        });
        dto.bio? profile.bio = dto.bio : profile.bio = profile.bio;
        dto.skills? profile.skills = dto.skills : profile.skills = profile.skills;
        dto.experience? profile.experience = dto.experience : profile.experience = profile.experience;
        dto.photo_url? profile.photo_url = dto.photo_url : profile.photo_url = profile.photo_url;
        dto.location? profile.location = dto.location : profile.location = profile.location;
        await this.profileRepository.save(profile);
        return {message: `Perfil actualizado`}
    }
}
