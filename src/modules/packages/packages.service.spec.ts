import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './package.entity';
import { PackagesService } from './packages.service';

import { PackageStates } from 'src/enums/package-states.enum';
import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';
import { StatusTransitionException } from 'src/utils/exceptions/StatusTransitionException.exception';
import { ConfigServiceMock } from 'src/utils/mocks/config.mocks';
import {
  PackagesRepoMock,
  SampleCreatedPackage,
  SampleDeliveredPackage,
} from 'src/utils/mocks/packages.mock';
import { ShortCodeServiceMock } from 'src/utils/mocks/shared.mocks';

describe('PackagesService', () => {
  let service: PackagesService;
  let shortCodeService: ShortCodeService;
  let packagesRepo: Repository<Package>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        ConfigServiceMock,
        ShortCodeServiceMock,
        PackagesRepoMock,
      ],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
    shortCodeService = module.get<ShortCodeService>(ShortCodeService);
    packagesRepo = module.get<Repository<Package>>('PackageRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a package', async () => {
    const input: CreatePackageDto = {
      dimensions: '4m x 5m',
    };

    jest
      .spyOn(shortCodeService, 'generateUid')
      .mockReturnValue(SampleCreatedPackage.reference);
    const save = jest.spyOn(packagesRepo, 'save').mockReturnValue(
      new Promise<Package>((resolve) => resolve(SampleCreatedPackage)),
    );

    const testResult = await service.create(input);

    // the svae method call should be made with the right arguments
    expect(save.mock.calls[0][0]).toEqual(expect.objectContaining(input));
    expect(testResult).toBe(SampleCreatedPackage);
  });

  describe('Update a package', () => {
    it('should transition from PICKED_UP to IN_TRANSIT', async () => {
      const input: UpdatePackageDto = {
        dimensions: '40m x 50m',
        status: PackageStates.IN_TRANSIT,
      };
      const updatedPkg = plainToClass(Package, {
        ...SampleCreatedPackage,
        ...input,
      });

      jest
        .spyOn(shortCodeService, 'generateUid')
        .mockReturnValue(SampleCreatedPackage.reference);
      jest.spyOn(packagesRepo, 'findOne').mockReturnValue(
        new Promise<Package>((resolve) => resolve(SampleCreatedPackage)),
      );
      jest.spyOn(packagesRepo, 'save').mockReturnValue(
        new Promise<Package>((resolve) => resolve(updatedPkg)),
      );

      const testResult = await service.update(SampleCreatedPackage.id, input);

      expect(testResult).toBe(updatedPkg);
    });

    it('should not transition from DELIVERED to IN_TRANSIT', async () => {
      const input: UpdatePackageDto = {
        dimensions: '4m x 5m',
        status: PackageStates.IN_TRANSIT,
      };

      jest.spyOn(packagesRepo, 'findOne').mockReturnValue(
        new Promise<Package>((resolve) => resolve(SampleDeliveredPackage)),
      );

      await expect(async () => {
        await service.update(SampleDeliveredPackage.id, input);
      }).rejects.toThrow(StatusTransitionException);
    });
  });
});
