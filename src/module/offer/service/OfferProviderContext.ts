import { Injectable } from '@nestjs/common';
import { IOfferProvider } from '../interface/IOfferProvider';
import { IOffersHolder } from '../interface/IOffersHolder';

@Injectable()
export class OfferProviderContext {
  private offerProviders: Map<string, IOfferProvider> = new Map();

  registerOfferProvider(provider: IOfferProvider): void {
    this.offerProviders.set(provider.getName(), provider);
  }

  async fetch(providerName: string): Promise<IOffersHolder> {
    const offerProvider: IOfferProvider | undefined =
      this.offerProviders.get(providerName);

    if (!offerProvider) {
      // @todo custom exception
      throw new Error(
        `Offer provider with name ${providerName} not registered`,
      );
    }

    return offerProvider.fetch();
  }
}
