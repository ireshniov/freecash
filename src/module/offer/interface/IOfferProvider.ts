import { IOffersHolder } from './IOffersHolder';

export interface IOfferProvider {
  getName(): string;
  fetch(): IOffersHolder;
}
