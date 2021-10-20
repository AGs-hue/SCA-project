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
import { PACKAGE_TRANSITION_STATES } from 'src/utils/constants/states.constants';
import { StatusTransitionException } from 'src/utils/exceptions/StatusTransitionException.exception';

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

  async update(
    id: string,
    updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    const pkg = await this.packageRepo.findOne(id);

    if (
      updatePackageDto.status &&
      pkg.status !== updatePackageDto.status &&
      !this.validateTransition(pkg, updatePackageDto.status)
    ) {
      // Cannot transition
      throw new StatusTransitionException(
        `Cannot update status from ${pkg.status} to ${updatePackageDto.status} `,
      );
    }

    const updatedPkg = await this.packageRepo.save({
      ...pkg,
      ...updatePackageDto,
    });

    return updatedPkg;
  }

  remove(id: string) {
    return `This action removes a #${id} package`;
  }

  validateTransition(pkg: Package, newStatus: PackageStates): boolean {
    const possibleStates = PACKAGE_TRANSITION_STATES[pkg.status];

    return possibleStates.includes(newStatus);
  }
}
