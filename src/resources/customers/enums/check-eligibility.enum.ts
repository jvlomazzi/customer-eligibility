export enum TiposDeConexao {
  MONOFASICO = 'monofasico',
  BIFASICO = 'bifasico',
  TRIFASICO = 'trifasico',
}

export enum ClassesDeConsumo {
  RESIDENCIAL = 'residencial',
  INDUSTRIAL = 'industrial',
  COMERCIAL = 'comercial',
  RURAL = 'rural',
  PODER_PUBLICO = 'poderPublico',
}

export enum ModalidadesTarifarias {
  AZUL = 'azul',
  BRANCA = 'branca',
  VERDE = 'verde',
  CONVENCIONAL = 'convencional',
}

export type EligibilityReponse =
  | {
      elegivel: boolean;
      economiaAnualDeCO2: number;
    }
  | {
      elegivel: boolean;
      razoesDeInelegibilidade: string[];
    };
