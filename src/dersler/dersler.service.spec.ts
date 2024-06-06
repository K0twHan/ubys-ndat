import { Test, TestingModule } from '@nestjs/testing';
import { DerslerService } from './dersler.service';

describe('DerslerService', () => {
  let service: DerslerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DerslerService],
    }).compile();

    service = module.get<DerslerService>(DerslerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
