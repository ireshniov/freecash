import { OfferBoxSizeEnum } from '../interface/OfferBoxSizeEnum';
import { NumericBooleanType } from '../interface/NumericBooleanType';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

/**
 * @todo improve validation, now for simplicity
 */
export class OfferDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  requirements: string;

  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @IsEnum(OfferBoxSizeEnum)
  boxSize: OfferBoxSizeEnum;

  @IsNotEmpty()
  @IsNumber()
  isDesktop: NumericBooleanType;

  @IsNotEmpty()
  @IsNumber()
  isAndroid: NumericBooleanType;

  @IsNotEmpty()
  @IsNumber()
  isIos: NumericBooleanType;

  @IsNotEmpty()
  @IsUrl()
  offerUrlTemplate: string;

  @IsNotEmpty()
  @IsString()
  providerName: string;

  @IsNotEmpty()
  @IsString()
  externalOfferId: string;
}
