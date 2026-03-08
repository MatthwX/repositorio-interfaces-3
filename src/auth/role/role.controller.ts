import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(+id);
    }

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(+id);
    }
}
