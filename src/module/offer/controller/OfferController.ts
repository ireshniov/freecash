import { Body, Controller, Post } from '@nestjs/common';
import { Offer } from '../entity/Offer';
import { OfferService } from '../service/OfferService';
import { OfferDto } from '../dto/OfferDto';
import { getValidationPipeOf } from '../../common/pipe/ValidationPipe';
import { CreateOfferDto } from '../dto/CreateOfferDto';
import { OfferDtoFromCreateOfferDtoPipe } from '../pipe/OfferDtoFromCreateOfferDtoPipe';
import { TransformInstanceToPlain } from 'class-transformer';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @TransformInstanceToPlain()
  async create(
    @Body(getValidationPipeOf(CreateOfferDto), OfferDtoFromCreateOfferDtoPipe)
    dto: OfferDto[],
  ): Promise<Offer[]> {
    return this.offerService.saveMany(dto);
  }
}
