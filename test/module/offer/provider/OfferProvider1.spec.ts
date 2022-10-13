import { TestingModule } from '@nestjs/testing';
import { createUnitTestingModule } from '../OfferModule.stub';
import { OfferProviderEnum } from '../../../../src/module/offer/interface/OfferProviderEnum';
import { OfferProvider1 } from '../../../../src/module/offer/provider/OfferProvider1';
import { IOffersHolder } from '../../../../src/module/offer/interface/IOffersHolder';
import { OfferBoxSizeEnum } from '../../../../src/module/offer/interface/OfferBoxSizeEnum';

jest.mock('uuid', () => ({ v4: () => 'test123' }));

describe('OfferProvider1', () => {
  let module: TestingModule;

  let offerProvider1: OfferProvider1;

  beforeEach(async () => {
    module = await createUnitTestingModule({
      providers: [OfferProvider1],
    });

    offerProvider1 = module.get(OfferProvider1);
  });

  afterEach(async () => {
    jest.clearAllMocks();

    await module.close();
  });

  describe('fetch', () => {
    let offerProvider1fakeOfferPayload: jest.SpyInstance;

    beforeEach(() => {
      offerProvider1fakeOfferPayload = jest
        .spyOn(offerProvider1, 'fakeOfferPayload')
        .mockReturnValue({
          query: {
            pubid: '1',
            appid: 1,
            country: '',
            platform: 'all',
          },
          response: {
            currency_name: 'Coins',
            offers_count: 2729,
            offers: [
              {
                offer_id: '19524555',
                offer_name: 'MyGym - iOS',
                offer_desc: 'Play and reach level 23 within 14 days.',
                call_to_action: 'Play and reach level 23 within 14 days.',
                disclaimer:
                  'This offer rewards within 24 hours. New users only.',
                offer_url: 'https://some.url',
                offer_url_easy: 'https://some.url',
                payout: 10.675,
                payout_type: 'cpe',
                amount: 8873,
                image_url: 'https://some.url',
                image_url_220x124: 'https://some.url',
                countries: ['NZ'],
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
        });
    });

    it('Should return IOffersHolder', async (): Promise<void> => {
      const result: IOffersHolder = offerProvider1.fetch();

      expect(offerProvider1fakeOfferPayload).toBeCalled();

      expect(result).toEqual({
        offers: [
          {
            boxSize: OfferBoxSizeEnum.LARGE,
            description: 'Play and reach level 23 within 14 days.',
            externalOfferId: '19524555',
            isAndroid: 0,
            isDesktop: 0,
            isIos: 1,
            name: 'MyGym - iOS',
            offerUrlTemplate: 'https://some.url',
            providerName: OfferProviderEnum.PROVIDER1,
            requirements: 'Play and reach level 23 within 14 days.',
            slug: 'test123',
            thumbnail: 'https://some.url',
          },
        ],
      });
    });
  });
});
