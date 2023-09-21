import { Test, TestingModule } from '@nestjs/testing';
import { TiposDeConexao } from '../enums/check-eligibility.enum';
import {
  EligibilityCriteria,
  getIneligibilityReasons,
  getMinimumConsumptions,
} from '../enums/eligibility-criteria.enum';
import { CustomersService } from '../services/customers.service';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setConsumptionValues', () => {
    it('should set consumption values correctly', () => {
      const historicoDeConsumo = [100, 200, 300];

      service['setConsumptionValues'](historicoDeConsumo);

      expect(service['totalConsumption']).toBe(600);
      expect(service['monthQuantity']).toBe(3);
      expect(service['averageConsumption']).toBe(200);
    });
  });

  describe('checkMinimumConsumption', () => {
    it('should add ineligibility reason when average consumption is below minimum', () => {
      const criteria = EligibilityCriteria.MINIMUM_CONSUMPTION;
      const tipoDeConexao = TiposDeConexao.BIFASICO;
      service['averageConsumption'] = getMinimumConsumptions[tipoDeConexao] - 1; //reduce value by one so it dont reach minimum consumption
      service['checkMinimumConsumption'](tipoDeConexao);

      expect(service['ineligibilityReasons']).toContain(
        getIneligibilityReasons[criteria],
      );
    });

    it('should not add ineligibility reason when average consumption meets minimum', () => {
      const tipoDeConexao = TiposDeConexao.BIFASICO;
      service['averageConsumption'] = getMinimumConsumptions[tipoDeConexao] + 1; //increase value by one so it dont reach minimum consumption

      service['checkMinimumConsumption'](tipoDeConexao);

      expect(service['ineligibilityReasons']).toEqual([]);
    });
  });

  describe('checkEligibilityForCriteria', () => {
    it('should add classeDeConsumo ineligibility reason when value is not in eligible enum', () => {
      const criteria = EligibilityCriteria.CLASSE_CONSUMO;
      const value = 'InvalidValue';
      const eligibleEnum = { ValidValue: 'ValidValue' };

      service['checkEligibilityForCriteria'](criteria, value, eligibleEnum);

      expect(service['ineligibilityReasons']).toContain(
        getIneligibilityReasons[criteria],
      );
    });

    it('should not add classeDeConsumo ineligibility reason when value is in eligible enum', () => {
      const criteria = EligibilityCriteria.CLASSE_CONSUMO;
      const value = 'ValidValue';
      const eligibleEnum = { ValidValue: 'ValidValue' };

      service['checkEligibilityForCriteria'](criteria, value, eligibleEnum);

      expect(service['ineligibilityReasons']).toEqual([]);
    });

    it('should add modalidadeTarifaria ineligibility reason when value is not in eligible enum', () => {
      const criteria = EligibilityCriteria.MODALIDADES_TARIFARIAS;
      const value = 'InvalidValue';
      const eligibleEnum = { ValidValue: 'ValidValue' };

      service['checkEligibilityForCriteria'](criteria, value, eligibleEnum);

      expect(service['ineligibilityReasons']).toContain(
        getIneligibilityReasons[criteria],
      );
    });

    it('should not add modalidadeTarifaria ineligibility reason when value is in eligible enum', () => {
      const criteria = EligibilityCriteria.MODALIDADES_TARIFARIAS;
      const value = 'ValidValue';
      const eligibleEnum = { ValidValue: 'ValidValue' };

      service['checkEligibilityForCriteria'](criteria, value, eligibleEnum);

      expect(service['ineligibilityReasons']).toEqual([]);
    });
  });

  describe('calculateAnnualCO2Economy', () => {
    it('should calculate annual CO2 economy correctly', () => {
      service['totalConsumption'] = 1000;
      const expectedEconomy = (84 * 1000) / 1000;

      const result = service['calculateAnnualCO2Economy']();

      expect(result).toBe(expectedEconomy);
    });
  });
});
