import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';

import { CreatePackageDto } from './create-package.dto';

import { PackageStates } from 'src/enums/package-states.enum';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
  @IsEnum(PackageStates)
  @IsOptional()
  status?: PackageStates;
}
