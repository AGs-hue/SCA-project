import { IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsOptional()
  readonly dimensions?: string;
}
