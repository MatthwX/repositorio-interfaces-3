import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../auth/user/user.service';

import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        private readonly userService: UserService,
    ) {}

    findAll() {
        return this.gameRepository.find();
    }

    findOne(id: number) {
        return this.gameRepository.findOne({ where: { id } });
    }

    async create(createGameDto: CreateGameDto) {
        const user = await this.userService.findbyId(createGameDto.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const newGame = this.gameRepository.create({
            ...createGameDto,
            createdBy: user,
        });
        return this.gameRepository.save(newGame);
    }

    async update(id: number, updateGameDto: UpdateGameDto) {
        await this.gameRepository.update(id, updateGameDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.gameRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
}
