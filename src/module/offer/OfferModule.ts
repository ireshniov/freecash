import { IOfferProvider } from './interface/IOfferProvider';
import { sqlite } from '../../config/sqlite.ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferProviderContext } from './service/OfferProviderContext';
import { Module, ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { OfferRepository } from './repository/OfferRepository';
import { OfferProviderExplorer } from './service/OfferProviderExplorer';
import { OfferProvider2 } from './provider/OfferProvider2';
import { OfferProvider1 } from './provider/OfferProvider1';
import { OfferService } from './service/OfferService';
import { mysql } from '../../config/mysql.ormconfig';
import { OfferController } from './controller/OfferController';
import { OfferDtoFromCreateOfferDtoPipe } from './pipe/OfferDtoFromCreateOfferDtoPipe';

export const offerModuleMetadata: ModuleMetadata = {
  imports: [
    TypeOrmModule.forFeature([OfferRepository]),
    TypeOrmModule.forRoot(process.env.NODE_ENV === 'testing' ? sqlite : mysql),
  ],
  controllers: [OfferController],
  providers: [
    OfferDtoFromCreateOfferDtoPipe,
    OfferProvider1,
    OfferProvider2,
    OfferProviderContext,
    OfferProviderExplorer,
    OfferService,
  ],
};

@Module(offerModuleMetadata)
export class OfferModule implements OnModuleInit {
  constructor(
    private readonly offerProviderExplorer: OfferProviderExplorer,
    private readonly offerProviderContext: OfferProviderContext,
  ) {}

  onModuleInit(): void {
    const offerProviders: IOfferProvider[] =
      this.offerProviderExplorer.explore();

    for (const offerProvider of offerProviders) {
      this.offerProviderContext.registerOfferProvider(offerProvider);
    }
  }
}
