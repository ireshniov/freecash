import { INestApplication } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { TestingApp } from '../../../src/module/common/testing/TestingApp';
import {
  OfferModule,
  offerModuleMetadata,
} from '../../../src/module/offer/OfferModule';
import { appBootstrap } from '../../../src/app';

export function createIntegrationTestingModuleBuilder(): TestingModuleBuilder {
  return new TestingApp(OfferModule.name, offerModuleMetadata).getBuilder();
}

export async function createUnitTestingModule(
  appModuleMetadata: ModuleMetadata,
): Promise<TestingModule> {
  const testingBuilder: TestingApp = new TestingApp(
    OfferModule.name,
    appModuleMetadata,
  );

  return testingBuilder.getBuilder().compile();
}

export async function createTestingApp(
  testingModuleBuilder: TestingModuleBuilder,
): Promise<INestApplication> {
  const moduleFixture: TestingModule = await testingModuleBuilder.compile();

  const app: INestApplication = moduleFixture.createNestApplication();

  await appBootstrap(app);

  return app.init();
}
