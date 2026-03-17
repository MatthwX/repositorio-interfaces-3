import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
} from '@nestjs/common';
import { type Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    findAll(@Query('username') username?: string, @Query('email') email?: string) {
        return this.userService.findAll(username, email);
    }

    @Get(':id')
    findbyId(@Param('id') id: string) {
        return this.userService.findbyId(+id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const result = await this.userService.create(createUserDto);
            return result;
        } catch (e) {
            console.error(e);
            return new BadRequestException('User already exists or role not found');
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        const result = await this.userService.remove(+id);
        if (result) {
            return res.status(HttpStatus.NO_CONTENT).json('User has been removed');
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
}
