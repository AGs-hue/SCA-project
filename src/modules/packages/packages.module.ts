import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Package } from './package.entity';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

import { ConfigModule } from 'src/config/config.module';
import { AuthOptionsService } from 'src/modules/auth/auth-options.service';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([Package]),
    SharedModule,
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
