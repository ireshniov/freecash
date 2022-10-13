import { IsArray, ValidateNested } from 'class-validator';
import { OfferDto } from './OfferDto';
import { Type } from 'class-transformer';

export class OffersHolderDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => OfferDto)
  offers: OfferDto[];
}
