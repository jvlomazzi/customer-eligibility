import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../controllers/customers.controller';
import { CheckEligibilityDto } from '../dtos/check-eligibility.request.dto';
import {
  ClassesDeConsumo,
  EligibilityReponse,
  ModalidadesTarifarias,
  TiposDeConexao,
} from '../enums/check-eligibility.enum';
import { CustomersService } from '../services/customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkEligibility', () => {
    it('should return customer eligibility with CO2 economy', async () => {
      const validDto: CheckEligibilityDto = {
        numeroDoDocumento: '12345678909',
        tipoDeConexao: TiposDeConexao.BIFASICO,
        classeDeConsumo: ClassesDeConsumo.COMERCIAL,
        modalidadeTarifaria: ModalidadesTarifarias.AZUL,
        historicoDeConsumo: [5, 10, 15],
      };

      const expectedResult: EligibilityReponse = {
        elegivel: true,
        economiaAnualDeCO2: 1000,
      } as EligibilityReponse;
      jest
        .spyOn(service, 'checkEligibility')
        .mockReturnValueOnce(expectedResult);

      const result: EligibilityReponse = controller.checkEligibility(validDto);

      expect(result).toEqual(expectedResult);
    });

    it('should return customer eligibility with ineligibility reasons', () => {
      const validDto: CheckEligibilityDto = {
        numeroDoDocumento: '12345678909',
        tipoDeConexao: TiposDeConexao.BIFASICO,
        classeDeConsumo: ClassesDeConsumo.COMERCIAL,
        modalidadeTarifaria: ModalidadesTarifarias.AZUL,
        historicoDeConsumo: [5, 10, 15],
      };

      const expectedResult = {
        elegivel: false,
        razoesDeInelegibilidade: ['Razão 1', 'Razão 2'],
      } as EligibilityReponse;

      jest
        .spyOn(service, 'checkEligibility')
        .mockReturnValueOnce(expectedResult);

      const result = controller.checkEligibility(validDto);

      expect(result).toEqual(expectedResult);
    });
  });
});
