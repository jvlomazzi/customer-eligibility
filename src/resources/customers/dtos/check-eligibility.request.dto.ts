import { ApiProperty } from '@nestjs/swagger';
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
import { IsCpfOrCnpj } from '../../../decorators/is-cpf-or-cnpj.decorator';
import {
  ClassesDeConsumo,
  ModalidadesTarifarias,
  TiposDeConexao,
} from '../enums/check-eligibility.enum';

export class CheckEligibilityDto {
  @IsString()
  @ApiProperty({
    description: 'property description',
  })
  @IsCpfOrCnpj('numeroDoDocumento', {
    message: 'O CPF ou CNPJ inserido é inválido.',
  })
  numeroDoDocumento: string;

  @IsEnum(TiposDeConexao)
  @ApiProperty({
    description: 'property description',
    enum: TiposDeConexao,
  })
  tipoDeConexao: TiposDeConexao;

  @IsEnum(ClassesDeConsumo)
  @ApiProperty({
    description: 'property description',
    enum: ClassesDeConsumo,
  })
  classeDeConsumo: ClassesDeConsumo;

  @IsEnum(ModalidadesTarifarias)
  @ApiProperty({
    description: 'property description',
    enum: ModalidadesTarifarias,
  })
  modalidadeTarifaria: ModalidadesTarifarias;

  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(9999, { each: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(12)
  @ApiProperty({
    description: 'property description',
    isArray: true,
    type: Number,
    minimum: 0,
    maximum: 9999,
    minItems: 3,
    maxItems: 12,
    example: [5, 10, 15],
  })
  historicoDeConsumo: number[];
}
