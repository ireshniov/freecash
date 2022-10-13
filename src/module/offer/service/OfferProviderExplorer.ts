import { Injectable as InjectableClass } from '@nestjs/common';
import type { Injectable } from '@nestjs/common/interfaces';
import { ModulesContainer } from '@nestjs/core';
import type { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import type { Module } from '@nestjs/core/injector/module';
import { AbstractOfferProvider } from '../provider/AbstractOfferProvider';

@InjectableClass()
export class OfferProviderExplorer {
  constructor(private readonly modulesContainer: ModulesContainer) {}

  explore(): AbstractOfferProvider[] {
    // find all the providers
    const modules: Module[] = [...this.modulesContainer.values()];
    const providersMap: Map<any, InstanceWrapper<Injectable>>[] = modules
      .filter(({ providers }: Module): any => providers.size > 0)
      .map(({ providers }: Module): any => providers);

    const instanceWrappers: InstanceWrapper<Injectable>[] = [];
    providersMap.forEach(
      (map: Map<string, InstanceWrapper<Injectable>>): void => {
        const mapKeys: string[] = [...map.keys()];
        instanceWrappers.push(
          ...mapKeys.map((key: string): InstanceWrapper<Injectable> => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return map.get(key)!;
          }),
        );
      },
    );

    return instanceWrappers
      .filter(({ instance }: InstanceWrapper<Injectable>): any => {
        if (!instance) {
          return false;
        }

        const instancePrototype: unknown = Object.getPrototypeOf(instance);

        return instancePrototype instanceof AbstractOfferProvider;
      })
      .map(
        ({ instance }: InstanceWrapper<Injectable>): AbstractOfferProvider => {
          return instance as AbstractOfferProvider;
        },
      );
  }
}
