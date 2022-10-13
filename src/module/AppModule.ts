import { Module, ModuleMetadata } from '@nestjs/common';
import { OfferModule } from './offer/OfferModule';

export const appModuleMetadata: ModuleMetadata = {
  imports: [OfferModule],
};

@Module(appModuleMetadata)
export class AppModule {}
