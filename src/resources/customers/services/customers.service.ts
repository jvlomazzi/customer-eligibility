import { Injectable } from '@nestjs/common';
import { CheckEligibilityDto } from '../dtos/check-eligibility.request.dto';
import {
  EligibilityReponse,
  TiposDeConexao,
} from '../enums/check-eligibility.enum';
import {
  ClassesDeConsumoElegiveis,
  EligibilityCriteria,
  ModalidadesTarifariasElegiveis,
  getIneligibilityReasons,
  getMinimumConsumptions,
} from '../enums/eligibility-criteria.enum';

@Injectable()
export class CustomersService {
  private ineligibilityReasons: string[] = [];
  private totalConsumption: number;
  private monthQuantity: number;
  private averageConsumption: number;

  checkEligibility(dto: CheckEligibilityDto): EligibilityReponse {
    this.setConsumptionValues(dto.historicoDeConsumo);

    this.checkMinimumConsumption(dto.tipoDeConexao);

    this.checkEligibilityForCriteria(
      EligibilityCriteria.CLASSE_CONSUMO,
      dto.classeDeConsumo,
      ClassesDeConsumoElegiveis,
    );

    this.checkEligibilityForCriteria(
      EligibilityCriteria.MODALIDADES_TARIFARIAS,
      dto.modalidadeTarifaria,
      ModalidadesTarifariasElegiveis,
    );

    if (this.ineligibilityReasons.length > 0) {
      return {
        elegivel: false,
        razoesDeInelegibilidade: this.ineligibilityReasons,
      };
    }

    return {
      elegivel: true,
      economiaAnualDeCO2: this.calculateAnnualCO2Economy(),
    };
  }

  private setConsumptionValues(historicoDeConsumo: number[]): void {
    this.totalConsumption = historicoDeConsumo.reduce(
      (total, value) => total + value,
      0,
    );
    this.monthQuantity = historicoDeConsumo.length;
    this.averageConsumption = this.totalConsumption / this.monthQuantity;
  }

  private checkMinimumConsumption(tipoDeConexao: TiposDeConexao): void {
    if (this.averageConsumption < getMinimumConsumptions[tipoDeConexao]) {
      this.ineligibilityReasons.push(
        getIneligibilityReasons[EligibilityCriteria.MINIMUM_CONSUMPTION],
      );
    }
  }

  private checkEligibilityForCriteria<T, K>(
    criteria: EligibilityCriteria,
    value: T,
    eligibleEnum: K,
  ) {
    if (!Object.values(eligibleEnum).includes(value as any)) {
      this.ineligibilityReasons.push(
        getIneligibilityReasons[criteria] as string,
      );
    }
  }

  private calculateAnnualCO2Economy(): number {
    return (84 * this.totalConsumption) / 1000;
  }
}
