import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { FakeDto, FakeEnum } from './fake.dto';

describe('ValidationPipe', () => {
  let validationPipe: ValidationPipe;

  beforeEach(() => {
    validationPipe = new ValidationPipe();
  });

  it('should return the value if metatype is not provided', async () => {
    const value = 'test';
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: undefined,
    };

    const result = await validationPipe.transform(value, metadata);

    expect(result).toEqual(value);
  });

  it('should pass if validation succeeds', async () => {
    const value: FakeDto = {
      name: 'test',
      enum: FakeEnum.TEST_1,
      numberArray: [1, 2, 3],
    };
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: FakeDto,
    };

    const result = await validationPipe.transform(value, metadata);

    expect(result).toEqual(value);
  });

  it('should throw BadRequestException if validation fails', async () => {
    const value: FakeDto = null;
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: FakeDto,
    };

    try {
      await validationPipe.transform(value, metadata);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
