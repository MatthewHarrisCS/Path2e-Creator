import { Test, TestingModule } from '@nestjs/testing';
import { RacketService } from './racket.service';

describe('RacketService', () => {
  let service: RacketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacketService],
    }).compile();

    service = module.get<RacketService>(RacketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
