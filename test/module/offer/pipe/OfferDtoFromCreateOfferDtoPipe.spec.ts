import { TestingModule } from '@nestjs/testing';

import { OfferProviderContext } from '../../../../src/module/offer/service/OfferProviderContext';
import { OfferDtoFromCreateOfferDtoPipe } from '../../../../src/module/offer/pipe/OfferDtoFromCreateOfferDtoPipe';
import { createUnitTestingModule } from '../OfferModule.stub';
import { CreateOfferDto } from '../../../../src/module/offer/dto/CreateOfferDto';
import { OfferProviderEnum } from '../../../../src/module/offer/interface/OfferProviderEnum';
import { IOffer } from '../../../../src/module/offer/interface/IOffer';
import { OfferBoxSizeEnum } from '../../../../src/module/offer/interface/OfferBoxSizeEnum';
import { OfferDto } from '../../../../src/module/offer/dto/OfferDto';
import { plainToInstance } from 'class-transformer';

describe('OfferDtoFromCreateOfferDtoPipe', () => {
  let module: TestingModule;

  let offerDtoFromCreateOfferDtoPipe: OfferDtoFromCreateOfferDtoPipe;
  let offerProviderContext: OfferProviderContext;

  beforeEach(async () => {
    module = await createUnitTestingModule({
      providers: [OfferDtoFromCreateOfferDtoPipe, OfferProviderContext],
    });

    offerDtoFromCreateOfferDtoPipe = module.get(OfferDtoFromCreateOfferDtoPipe);
    offerProviderContext = module.get(OfferProviderContext);
  });

  afterEach(async () => {
    jest.clearAllMocks();

    await module.close();
  });

  describe('transform', () => {
    let offerProviderContextFetch: jest.SpyInstance;

    beforeEach(() => {
      offerProviderContextFetch = jest.spyOn(offerProviderContext, 'fetch');
    });

    it('Should fail on fetch offers from provider', async (): Promise<void> => {
      offerProviderContextFetch.mockImplementationOnce(() => {
        return new Promise((_resolve, reject) => {
          reject(new Error('Any exception'));
        });
      });

      const dto: CreateOfferDto = {
        provider: OfferProviderEnum.PROVIDER1,
      };

      await expect(
        offerDtoFromCreateOfferDtoPipe.transform(dto),
      ).rejects.toThrowError(new Error('Any exception'));
    });

    it('Should fail on validation', async (): Promise<void> => {
      const dto: CreateOfferDto = {
        provider: OfferProviderEnum.PROVIDER1,
      };

      const offer1: Partial<IOffer> = {
        boxSize: OfferBoxSizeEnum.SMALL,
        description: 'test1',
        externalOfferId: 'test1',
        isAndroid: 0,
        isDesktop: 0,
        isIos: 1,
        name: 'test1',
        offerUrlTemplate: 'test1',
        providerName: OfferProviderEnum.PROVIDER1,
        requirements: 'test1',
        thumbnail: 'test1',
      };

      offerProviderContextFetch.mockResolvedValue({ offers: [offer1] });

      await expect(
        offerDtoFromCreateOfferDtoPipe.transform(dto),
      ).rejects.toThrowError(new Error('Validation error'));
    });

    it('Should pass validation and return offerDtos', async (): Promise<void> => {
      const dto: CreateOfferDto = {
        provider: OfferProviderEnum.PROVIDER1,
      };

      const offer1: IOffer = {
        boxSize: OfferBoxSizeEnum.SMALL,
        description: 'test1',
        externalOfferId: 'test1',
        isAndroid: 0,
        isDesktop: 0,
        isIos: 1,
        name: 'test1',
        offerUrlTemplate: 'https://some.url',
        providerName: OfferProviderEnum.PROVIDER1,
        requirements: 'test1',
        thumbnail: 'https://some.url',
        slug: 'test1',
      };

      offerProviderContextFetch.mockResolvedValue({ offers: [offer1] });

      const result: OfferDto[] = await offerDtoFromCreateOfferDtoPipe.transform(
        dto,
      );

      expect(result.length).toEqual(1);
      expect(result[0]).toBeInstanceOf(OfferDto);
      expect(result).toEqual(plainToInstance(OfferDto, [offer1]));
    });
  });
});
