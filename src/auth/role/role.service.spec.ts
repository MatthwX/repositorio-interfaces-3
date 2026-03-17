import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';

import { RoleService } from './role.service';

describe('RoleService', () => {
    let roleService: RoleService;

    const mockRepository = {
        findOneBy: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleService, { provide: getRepositoryToken(Role), useValue: mockRepository }],
        }).compile();

        roleService = module.get<RoleService>(RoleService);
    });

    it('should be defined', () => {
        expect(roleService).toBeDefined();
    });
});
