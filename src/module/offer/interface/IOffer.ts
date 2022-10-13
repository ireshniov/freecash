import { OfferBoxSizeEnum } from './OfferBoxSizeEnum';
import { NumericBooleanType } from './NumericBooleanType';

export interface IOffer {
  name: string;
  slug: string;
  description: string;
  requirements: string;
  thumbnail: string;
  boxSize: OfferBoxSizeEnum;
  isDesktop: NumericBooleanType;
  isAndroid: NumericBooleanType;
  isIos: NumericBooleanType;
  offerUrlTemplate: string;
  providerName: string;
  externalOfferId: string;
}
