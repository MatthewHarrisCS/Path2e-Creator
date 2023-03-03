import { Test, TestingModule } from '@nestjs/testing';
import { RacketController } from './racket.controller';

describe('RacketController', () => {
  let controller: RacketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacketController],
    }).compile();

    controller = module.get<RacketController>(RacketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
