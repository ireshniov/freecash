import { IsEnum } from 'class-validator';
import { OfferProviderEnum } from '../interface/OfferProviderEnum';

export class CreateOfferDto {
  @IsEnum(OfferProviderEnum)
  provider: OfferProviderEnum;
}
