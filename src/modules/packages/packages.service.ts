/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './package.entity';

import { PackageStates } from 'src/enums/package-states.enum';
import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepo: Repository<Package>,
    private readonly shortCodeService: ShortCodeService,
  ) {}

  create(createPackageDto: CreatePackageDto): Promise<Package> {
    const reference = this.shortCodeService.generateUid();

    return this.packageRepo.save({
      ...createPackageDto,
      status: PackageStates.PICKED_UP, // Default state
      reference,
    });
  }

  async findAll(options?: FindManyOptions<Package>): Promise<Package[]> {
    return this.packageRepo.find({
      ...options,
    });
  }

  async findOne(
    where: FindConditions<Package>,
    opts?: FindOneOptions<Package>,
  ): Promise<Package> {
    return this.packageRepo.findOne({
      ...opts,
      where,
    });
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: string) {
    return `This action removes a #${id} package`;
  }
}
