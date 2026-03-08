import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService,
    ) {}

    findAll() {
        return this.rolePermissionRepository.find();
    }

    findOne(id: number) {
        return this.rolePermissionRepository.findOne({ where: { id } });
    }

    async create(createRolePermissionDto: CreateRolePermissionDto) {
        const role = await this.roleService.findOne(createRolePermissionDto.roleId);
        if (!role) {
            throw new Error('Role not found');
        }

        const permission = await this.permissionService.findOne(createRolePermissionDto.permissionId);
        if (!permission) {
            throw new Error('Permission not found');
        }

        const newRolePermission = this.rolePermissionRepository.create({ role, permission });
        return this.rolePermissionRepository.save(newRolePermission);
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
        const updateData: any = {};

        if (updateRolePermissionDto.roleId) {
            const role = await this.roleService.findOne(updateRolePermissionDto.roleId);
            if (!role) {
                throw new Error('Role not found');
            }
            updateData.role = role;
        }

        if (updateRolePermissionDto.permissionId) {
            const permission = await this.permissionService.findOne(updateRolePermissionDto.permissionId);
            if (!permission) {
                throw new Error('Permission not found');
            }
            updateData.permission = permission;
        }

        await this.rolePermissionRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.rolePermissionRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
}
