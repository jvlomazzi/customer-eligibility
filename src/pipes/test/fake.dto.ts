import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum FakeEnum {
  TEST_1 = 'testValue1',
  TEST_2 = 'testValue2',
}

export class FakeDto {
  @IsString()
  name: string;

  @IsEnum(FakeEnum)
  enum: FakeEnum;

  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(9999, { each: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(12)
  numberArray: number[];
}
