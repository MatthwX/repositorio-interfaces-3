import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { RolesModule } from './role/role.module';

@Module({
    imports: [UserModule, PermissionModule, RolePermissionModule, RolesModule],
})
export class AuthModule {}
