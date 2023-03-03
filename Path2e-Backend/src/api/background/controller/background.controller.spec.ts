import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundController } from './background.controller';

describe('BackgroundController', () => {
  let controller: BackgroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackgroundController],
    }).compile();

    controller = module.get<BackgroundController>(BackgroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
