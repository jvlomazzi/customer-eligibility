import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import {
  ClassesDeConsumo,
  ModalidadesTarifarias,
  TiposDeConexao,
} from '../enums/customer.enum';

export class CheckEligibilityDto {
  @IsString()
  @ApiProperty({
    description: 'property description',
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
  @Min(3)
  @Max(12)
  @ApiProperty({
    description: 'property description',
    isArray: true,
    type: Number,
    example: [1, 2, 3],
  })
  historicoDeConsumo: number[];
}
