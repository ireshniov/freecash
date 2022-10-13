import { Injectable } from '@nestjs/common';
import { OfferRepository } from '../repository/OfferRepository';
import { plainToInstance } from 'class-transformer';
import { Offer } from '../entity/Offer';
import { OfferDto } from '../dto/OfferDto';

@Injectable()
export class OfferService {
  constructor(private readonly offerRepository: OfferRepository) {}

  async saveMany(offers: OfferDto[]): Promise<Offer[]> {
    const offerToCreate: Offer[] = plainToInstance(Offer, offers);

    return this.offerRepository.save(offerToCreate);
  }
}
