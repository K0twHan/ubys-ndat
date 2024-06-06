import { Test, TestingModule } from '@nestjs/testing';
import { NotlarController } from './notlar.controller';
import { NotlarService } from './notlar.service';

describe('NotlarController', () => {
  let controller: NotlarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotlarController],
      providers: [NotlarService],
    }).compile();

    controller = module.get<NotlarController>(NotlarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
