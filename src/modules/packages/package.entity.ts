import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PackageStates } from 'src/enums/package-states.enum';

@Entity()
export class Package {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Index({ unique: true })
  @Column('varchar', {
    length: 255,
    comment: 'The unique package reference',
  })
  reference: string;

  @Column('varchar')
  status: PackageStates;

  @Column('varchar', {
    nullable: true,
  })
  dimensions: string;

  @Column('jsonb', {
    nullable: true,
    comment: 'The data object from the bank provider',
  })
  meta: any;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
