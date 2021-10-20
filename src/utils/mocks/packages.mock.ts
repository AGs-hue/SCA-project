/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { plainToClass } from 'class-transformer';

import { GenericQueryBuilder } from './shared.mocks';

import { PackageStates } from 'src/enums/package-states.enum';
import { Package } from 'src/modules/packages/package.entity';
import { PackagesService } from 'src/modules/packages/packages.service';

const packagesServiceMockValue = {
  findAll: () => jest.fn(),
  findOne: () => jest.fn(),
  create: () => jest.fn(),
};
export const PackagesServiceMock = {
  provide: PackagesService,
  useValue: packagesServiceMockValue,
};

export const SampleCreatedPackage = plainToClass(Package, {
  id: '4dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
  reference: '4dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
  status: PackageStates.PICKED_UP,
});

export const SampleDeliveredPackage = plainToClass(Package, {
  id: '4dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
  reference: '4dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
  status: PackageStates.DELIVERED,
});
export const PackagesRepoMockValue = {
  save: () => jest.fn(),
  findOne: () => jest.fn(),
  createQueryBuilder: jest.fn(() =>
    Object.assign(GenericQueryBuilder, {
      getOne: () => SampleDeliveredPackage,
    }),
  ),
};

export const PackageQueryBuilder = Object.assign(GenericQueryBuilder, {
  getOne: () => SampleDeliveredPackage,
});

export const PackagesRepoMock = {
  provide: 'PackageRepository',
  useValue: PackagesRepoMockValue,
};
