import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { Package } from './package.entity';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';
import { ConfigServiceMock } from 'src/utils/mocks/config.mocks';
import { PackagesRepoMock } from 'src/utils/mocks/packages.mock';

describe('PackagesController', () => {
  let controller: PackagesController;
  let service: PackagesService;
  let shortCodeService: ShortCodeService;
  let packagesRepo: Repository<Package>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'mock' })],
      controllers: [PackagesController],
      providers: [
        PackagesService,
        ConfigServiceMock,
        ShortCodeService,
        PackagesRepoMock,
      ],
    }).compile();

    controller = module.get<PackagesController>(PackagesController);
    service = module.get<PackagesService>(PackagesService);
    shortCodeService = module.get<ShortCodeService>(ShortCodeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
