import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModuleBuilder } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import request from 'supertest';
import {
  createIntegrationTestingModuleBuilder,
  createTestingApp,
} from '../OfferModule.stub';
import { OfferRepository } from '../../../../src/module/offer/repository/OfferRepository';
import { CreateOfferDto } from '../../../../src/module/offer/dto/CreateOfferDto';
import { OfferProviderEnum } from '../../../../src/module/offer/interface/OfferProviderEnum';
import { Offer } from '../../../../src/module/offer/entity/Offer';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

//todo review and improve
describe.skip('OfferController', () => {
  let module: TestingModuleBuilder;
  let app: INestApplication;

  let offerRepository: OfferRepository;

  const baseApiUri = `api/offers`;

  beforeEach(async () => {
    module = createIntegrationTestingModuleBuilder();
    app = await createTestingApp(module);

    offerRepository = app.get(OfferRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();

    await app.close();
  });

  describe('create', () => {
    afterEach(async () => {
      await offerRepository.clear();
    });

    it('Should create new offer with provider offer1', async (): Promise<any> => {
      uuidv4.mockImplementation(() => 'testid');

      const body: CreateOfferDto = {
        provider: OfferProviderEnum.PROVIDER1,
      };

      await request(app.getHttpServer())
        .post(baseApiUri)
        .send(body)
        .expect(HttpStatus.OK)
        .expect([
          {
            boxSize: 'large',
            description: 'Play and reach level 23 within 14 days.',
            externalOfferId: '19524555',
            isAndroid: 0,
            isDesktop: 0,
            isIos: 1,
            name: 'MyGym - iOS',
            offerUrlTemplate: 'https://some.url',
            providerName: 'offer1',
            requirements: 'Play and reach level 23 within 14 days.',
            slug: 'testid',
            thumbnail: 'https://some.url',
          },
        ]);

      const offer: Offer[] = await offerRepository.find({
        providerName: OfferProviderEnum.PROVIDER1,
      });

      expect(offer.length).toEqual(1);

      expect(offer[0]).toBeInstanceOf(Offer);
      expect(offer[0].providerName).toEqual(OfferProviderEnum.PROVIDER1);
      expect(offer[0].slug).toEqual('testid');
    });

    it('Should return 400 when data is invalid', async (): Promise<any> => {
      const body: CreateOfferDto = plainToInstance<CreateOfferDto, any>(
        CreateOfferDto,
        {
          unknown: 'any value',
        },
        {
          excludeExtraneousValues: false,
        },
      );

      return request(app.getHttpServer())
        .post(baseApiUri)
        .send(body)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: [
            {
              property: 'unknown',
              constraints: {
                whitelistValidation: 'property unknown should not exist',
              },
            },
            {
              property: 'provider',
              children: [],
              constraints: {
                isEnum: 'provider must be a valid enum value',
              },
            },
          ],
          error: 'Bad Request',
        });
    });
  });
});
