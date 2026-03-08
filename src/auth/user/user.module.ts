import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { RolesModule } from '../role/role.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
