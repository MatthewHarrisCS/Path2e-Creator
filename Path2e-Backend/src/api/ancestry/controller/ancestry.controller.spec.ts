import { Test, TestingModule } from '@nestjs/testing';
import { AncestryController } from './ancestry.controller';

describe('AncestryController', () => {
  let controller: AncestryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AncestryController],
    }).compile();

    controller = module.get<AncestryController>(AncestryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
