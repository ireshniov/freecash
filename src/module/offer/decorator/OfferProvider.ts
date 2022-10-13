import { SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import type { InjectableOptions } from '@nestjs/common/decorators/core/injectable.decorator';
import { AbstractOfferProvider } from '../provider/AbstractOfferProvider';

export const OFFER_PROVIDER_METADATA = 'OFFER_PROVIDER_METADATA';

export function OfferProvider<TAction extends typeof AbstractOfferProvider>(
  options?: InjectableOptions,
): any {
  return (target: TAction): void => {
    Reflect.defineMetadata(OFFER_PROVIDER_METADATA, {}, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, options, target);
  };
}
