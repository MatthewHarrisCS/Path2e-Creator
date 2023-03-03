import { Test, TestingModule } from '@nestjs/testing';
import { AncestryService } from './ancestry.service';

describe('AncestryService', () => {
  let service: AncestryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AncestryService],
    }).compile();

    service = module.get<AncestryService>(AncestryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
