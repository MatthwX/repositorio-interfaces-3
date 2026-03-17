import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RoleService } from '../role/role.service';
import { User } from '../entities/user.entity';

import { UserService } from './user.service';
import { create } from 'domain';

describe('UserService', () => {
    // TODO: Todas las pruebas de el servicio de los usuarios
    let userService: UserService;

    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
    };

    const mockRoleService = {
        findbyName: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService, // Provider a validar a traves de pruebas
                { provide: getRepositoryToken(User), useValue: mockRepository },
                { provide: RoleService, useValue: mockRoleService },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('Shoul be fined', () => {
        expect(userService).toBeDefined();
    });

    it('shoul return all user withouth filter', async () => {
        //Contexto para la prueba
        const mockUsers = [
            { id: 1, username: 'user1' },
            { id: 2, username: 'user2' },
        ];
        mockRepository.find.mockResolvedValue(mockUsers);
        // Ejecutar lo que se desea probar
        const result = await userService.findAll();

        // Validar el resultado
        expect(result).toEqual(mockUsers);
        expect(mockRepository.find).toHaveBeenCalledWith({
            where: {},
        });
    });
});
