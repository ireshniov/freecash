import { TestingModule } from '@nestjs/testing';
import { createUnitTestingModule } from '../OfferModule.stub';
import { OfferProviderEnum } from '../../../../src/module/offer/interface/OfferProviderEnum';
import { IOffersHolder } from '../../../../src/module/offer/interface/IOffersHolder';
import { OfferBoxSizeEnum } from '../../../../src/module/offer/interface/OfferBoxSizeEnum';
import { OfferProvider2 } from '../../../../src/module/offer/provider/OfferProvider2';

jest.mock('uuid', () => ({ v4: () => 'test123' }));

describe('OfferProvider2', () => {
  let module: TestingModule;

  let offerProvider2: OfferProvider2;

  beforeEach(async () => {
    module = await createUnitTestingModule({
      providers: [OfferProvider2],
    });

    offerProvider2 = module.get(OfferProvider2);
  });

  afterEach(async () => {
    jest.clearAllMocks();

    await module.close();
  });

  describe('fetch', () => {
    let offerProvider2fakeOfferPayload: jest.SpyInstance;

    beforeEach(() => {
      offerProvider2fakeOfferPayload = jest
        .spyOn(offerProvider2, 'fakeOfferPayload')
        .mockReturnValue({
          status: 'success',
          data: {
            '15828': {
              Offer: {
                campaign_id: 15828,
                store_id: null,
                tracking_type: 'CPA',
                campaign_vertical: 'professional_finance',
                currency_name_singular: 'coin',
                currency_name_plural: 'coins',
                network_epc: '4.8359',
                icon: 'https://some.url',
                name: 'Sofi',
                tracking_url: 'https://some.url',
                instructions:
                  'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
                disclaimer: null,
                description:
                  'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
                short_description: 'Make a Deposit to Earn!',
                offer_sticker_text_1: 'RECOMMENDED',
                offer_sticker_text_2: null,
                offer_sticker_text_3: null,
                offer_sticker_color_1: 'D100BC',
                offer_sticker_color_2: 'FFFFFF',
                offer_sticker_color_3: 'FFFFFF',
                sort_order_setting: null,
                category_1: 'free',
                category_2: null,
                amount: 53550,
                payout_usd: 69.25,
                start_datetime: '2022-04-19 11:58:30',
                end_datetime: '2042-04-19 04:59:00',
                is_multi_reward: false,
              },
              Country: {
                include: {
                  US: {
                    id: 243,
                    code: 'US',
                    name: 'United States',
                  },
                },
                exclude: [],
              },
              State: {
                include: [],
                exclude: [],
              },
              City: {
                include: [],
                exclude: [],
              },
              Connection_Type: {
                cellular: true,
                wifi: true,
              },
              Device: {
                include: [],
                exclude: [],
              },
              OS: {
                android: false,
                ios: true,
                web: true,
                min_ios: null,
                max_ios: null,
                min_android: null,
                max_android: null,
              },
            },
          },
        });
    });

    it('Should return IOffersHolder', async (): Promise<void> => {
      const result: IOffersHolder = offerProvider2.fetch();

      expect(offerProvider2fakeOfferPayload).toBeCalled();

      expect(result).toEqual({
        offers: [
          {
            boxSize: OfferBoxSizeEnum.SMALL,
            description:
              'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
            externalOfferId: '15828',
            isAndroid: 0,
            isDesktop: 1,
            isIos: 1,
            name: 'Sofi',
            offerUrlTemplate: 'https://some.url',
            providerName: OfferProviderEnum.PROVIDER2,
            requirements:
              'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
            slug: 'test123',
            thumbnail: 'https://some.url',
          },
        ],
      });
    });
  });
});
