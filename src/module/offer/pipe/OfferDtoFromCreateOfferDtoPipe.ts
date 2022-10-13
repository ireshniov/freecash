import { Injectable, PipeTransform } from '@nestjs/common';
import { OfferProviderContext } from '../service/OfferProviderContext';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { OfferDto } from '../dto/OfferDto';
import { CreateOfferDto } from '../dto/CreateOfferDto';
import { OffersHolderDto } from '../dto/OffersHolderDto';
import { IOffersHolder } from '../interface/IOffersHolder';

@Injectable()
export class OfferDtoFromCreateOfferDtoPipe
  implements PipeTransform<CreateOfferDto, Promise<OfferDto[]>>
{
  constructor(private readonly offerProviderContext: OfferProviderContext) {}

  async transform(dto: CreateOfferDto): Promise<OfferDto[]> {
    const offersHolderPayload: IOffersHolder =
      await this.offerProviderContext.fetch(dto.provider);

    const offersHolder: OffersHolderDto = plainToInstance(
      OffersHolderDto,
      offersHolderPayload,
    );

    const errors = await validate(offersHolder, {
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: { target: false, value: false },
    });

    if (errors.length) {
      // @todo custom exception
      throw new Error('Validation error');
    }

    return offersHolder.offers;
  }
}
