import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';

import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    findAll() {
        return this.permissionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.permissionService.findOne(+id);
    }

    @Post()
    create(@Body() CreatePermissionDto: CreatePermissionDto) {
        return this.permissionService.create(CreatePermissionDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionService.update(+id, updatePermissionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.permissionService.remove(+id);
    }
}
