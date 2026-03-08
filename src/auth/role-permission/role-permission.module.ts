import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RolesModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';

import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RolePermission]), RolesModule, PermissionModule],
    providers: [RolePermissionService],
    exports: [RolePermissionService],
    controllers: [RolePermissionController],
})
export class RolePermissionModule {}
