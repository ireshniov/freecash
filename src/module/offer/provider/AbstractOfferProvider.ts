import { IOfferProvider } from '../interface/IOfferProvider';
import { OfferProviderEnum } from '../interface/OfferProviderEnum';
import { IOffersHolder } from '../interface/IOffersHolder';

export abstract class AbstractOfferProvider implements IOfferProvider {
  abstract getName(): OfferProviderEnum;

  abstract fetch(): IOffersHolder;
}
