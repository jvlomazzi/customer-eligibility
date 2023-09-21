import { TiposDeConexao } from './check-eligibility.enum';

export enum EligibilityCriteria {
  CLASSE_CONSUMO = 'classeDeConsumo',
  MODALIDADES_TARIFARIAS = 'modalidatesTarifarias',
  MINIMUM_CONSUMPTION = 'consumoMinimo',
}

export enum ClassesDeConsumoElegiveis {
  RESIDENCIAL = 'residencial',
  INDUSTRIAL = 'industrial',
  COMERCIAL = 'comercial',
}

export enum ModalidadesTarifariasElegiveis {
  BRANCA = 'branca',
  CONVENCIONAL = 'convencional',
}

export const getMinimumConsumptions: Record<TiposDeConexao, number> = {
  [TiposDeConexao.MONOFASICO]: 400,
  [TiposDeConexao.BIFASICO]: 500,
  [TiposDeConexao.TRIFASICO]: 750,
};

export const getIneligibilityReasons: Record<EligibilityCriteria, string> = {
  [EligibilityCriteria.CLASSE_CONSUMO]: 'Classe de consumo não aceita',
  [EligibilityCriteria.MODALIDADES_TARIFARIAS]:
    'Modalidade tarifária não aceita',
  [EligibilityCriteria.MINIMUM_CONSUMPTION]:
    'Consumo muito baixo para tipo de conexão',
};
