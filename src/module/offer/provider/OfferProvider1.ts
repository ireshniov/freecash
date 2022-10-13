import { IOffer } from '../interface/IOffer';
import { AbstractOfferProvider } from './AbstractOfferProvider';
import { OfferProvider } from '../decorator/OfferProvider';
import { OfferProviderEnum } from '../interface/OfferProviderEnum';
import { IPayload1, IPayload1Offer } from '../interface/IPayload1';
import { NumericBooleanType } from '../interface/NumericBooleanType';
import { v4 as uuidv4 } from 'uuid';
import { OfferBoxSizeEnum } from '../interface/OfferBoxSizeEnum';
import { IOffersHolder } from '../interface/IOffersHolder';

@OfferProvider()
export class OfferProvider1 extends AbstractOfferProvider {
  getName(): OfferProviderEnum {
    return OfferProviderEnum.PROVIDER1;
  }

  fetch(): IOffersHolder {
    const offers: IOffer[] = [];

    const payload: IPayload1 = this.fakeOfferPayload();
    const payloadOffers: IPayload1Offer[] = payload.response.offers;

    if (payloadOffers.length)
      for (const payloadOffer of payloadOffers) {
        offers.push({
          // @todo I am not sure about it, set large
          boxSize: OfferBoxSizeEnum.LARGE,
          description: payloadOffer.offer_desc,
          externalOfferId: payloadOffer.offer_id,
          isAndroid: this.isAndroid(payloadOffer),
          isDesktop: this.isDesktop(payloadOffer),
          isIos: this.isIos(payloadOffer),
          name: payloadOffer.offer_name,
          offerUrlTemplate: payloadOffer.offer_url,
          providerName: OfferProviderEnum.PROVIDER1,
          requirements: payloadOffer.call_to_action,
          // @todo I am not sure about it, fast solution for unique string
          slug: uuidv4(),
          thumbnail: payloadOffer.image_url,
        });
      }

    return {
      offers,
    };
  }

  fakeOfferPayload(): IPayload1 {
    return {
      query: {
        pubid: '1',
        appid: 1,
        country: '',
        platform: 'all',
      },
      response: {
        currency_name: 'Coins',
        offers_count: 2729,
        // this will be array of offers
        // this can be multiple, so please consider this
        offers: [
          {
            // should be mapped to `externalOfferId`
            offer_id: '19524555',
            // should be mapped to `name`
            offer_name: 'MyGym - iOS',
            // should be mapped to `description`
            offer_desc: 'Play and reach level 23 within 14 days.',
            // should be mapped to `requirements`
            call_to_action: 'Play and reach level 23 within 14 days.',
            disclaimer: 'This offer rewards within 24 hours. New users only.',
            // should be mapped to offerUrlTemplate
            offer_url: 'https://some.url',
            offer_url_easy: 'https://some.url',
            payout: 10.675,
            payout_type: 'cpe',
            amount: 8873,
            // should be mapped to `thumbnail`
            image_url: 'https://some.url',
            image_url_220x124: 'https://some.url',
            countries: ['NZ'],
            // combine platform and device to map to `isDesktop`, `isAndroid`, `isIos`
            platform: 'mobile',
            device: 'iphone_ipad',
            category: {
              '9': 'Mobile Apps',
            },
            last_modified: 1645095666,
            preview_url: 'https://some.url',
            package_id: 'idnumbers',
            verticals: [
              {
                vertical_id: '4',
                vertical_name: 'Lifestyle',
              },
              {
                vertical_id: '11',
                vertical_name: 'Health',
              },
            ],
          },
        ],
      },
    };
  }

  private isAndroid(offer: IPayload1Offer): NumericBooleanType {
    return offer.platform == 'mobile' && offer.device !== 'iphone_ipad' ? 1 : 0;
  }

  private isDesktop(offer: IPayload1Offer): NumericBooleanType {
    return offer.platform !== 'mobile' ? 1 : 0;
  }

  private isIos(offer: IPayload1Offer): NumericBooleanType {
    return offer.device == 'iphone_ipad' ? 1 : 0;
  }
}
