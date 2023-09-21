import { validate } from 'class-validator';
import { CheckEligibilityDto } from '../dtos/check-eligibility.request.dto';
import {
  ClassesDeConsumo,
  ModalidadesTarifarias,
  TiposDeConexao,
} from '../enums/check-eligibility.enum';

describe('CheckEligibilityDto', () => {
  it('should pass validation with valid data', async () => {
    const validData = {
      numeroDoDocumento: '680.876.290-27',
      tipoDeConexao: TiposDeConexao.BIFASICO,
      classeDeConsumo: ClassesDeConsumo.COMERCIAL,
      modalidadeTarifaria: ModalidadesTarifarias.AZUL,
      historicoDeConsumo: [5, 10, 15],
    };

    const dto = new CheckEligibilityDto();
    Object.assign(dto, validData);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation with invalid data', async () => {
    const invalidData = {
      numeroDoDocumento: null,
      tipoDeConexao: null,
      classeDeConsumo: null,
      modalidadeTarifaria: null,
      historicoDeConsumo: null,
    };

    const dto = new CheckEligibilityDto();
    Object.assign(dto, invalidData);

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });
});
