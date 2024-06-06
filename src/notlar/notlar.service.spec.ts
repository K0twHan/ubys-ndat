import { Test, TestingModule } from '@nestjs/testing';
import { NotlarService } from './notlar.service';

describe('NotlarService', () => {
  let service: NotlarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotlarService],
    }).compile();

    service = module.get<NotlarService>(NotlarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
