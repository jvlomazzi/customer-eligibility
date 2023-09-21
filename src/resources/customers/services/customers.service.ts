import { Injectable } from '@nestjs/common';
import { CheckEligibilityDto } from '../dtos/check-eligibility.request.dto';
import { TiposDeConexao } from '../enums/check-eligibility.enum';
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
  private totalComsuption: number;
  private monthQuantity: number;
  private averageConsumption: number;

  checkEligibility(dto: CheckEligibilityDto) {
    this.setConsumptionValues(dto.historicoDeConsumo);

    this.isMinimumConsumptionReached(dto.tipoDeConexao);
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

    if (this.ineligibilityReasons.length)
      return {
        elegivel: false,
        razoesDeInelegibilidade: this.ineligibilityReasons,
      };

    return {
      elegivel: true,
      economiaAnualDeCO2: this.getAnualCO2Economy(),
    };
  }

  private setConsumptionValues(historicoDeConsumo: number[]): void {
    this.totalComsuption = historicoDeConsumo.reduce(
      (total, value) => total + value,
      0,
    );
    this.monthQuantity = historicoDeConsumo.length;
    this.averageConsumption = this.totalComsuption / this.monthQuantity;
  }

  private isMinimumConsumptionReached(tipoDeConexao: TiposDeConexao): boolean {
    if (this.averageConsumption >= getMinimumConsumptions[tipoDeConexao])
      return true;

    this.ineligibilityReasons.push(
      getIneligibilityReasons[EligibilityCriteria.MINIMUM_CONSUMPTION],
    );
    return false;
  }

  private checkEligibilityForCriteria<T, K>(
    criteria: EligibilityCriteria,
    value: T,
    eligibleEnum: K,
  ): boolean {
    if (Object.values(eligibleEnum).includes(value as any)) return true;

    this.ineligibilityReasons.push(getIneligibilityReasons[criteria] as string);
  }

  private getAnualCO2Economy(): number {
    return (84 * this.totalComsuption) / 1000;
  }
}
