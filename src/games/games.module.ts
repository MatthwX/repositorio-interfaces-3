import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../auth/user/user.module';

import { Game } from './entities/game.entity';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Game]), UserModule],
    providers: [GamesService],
    controllers: [GamesController],
    exports: [GamesService],
})
export class GamesModule {}
