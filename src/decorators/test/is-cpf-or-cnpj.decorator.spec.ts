import { validateSync } from 'class-validator';
import { IsCpfOrCnpj } from '../is-cpf-or-cnpj.decorator';
class Test {
  @IsCpfOrCnpj('value', {
    message: 'Invalid cpf or cnpj',
  })
  cpfOrCnpj: string;
}

describe('IsCpfOrCnpj Decorator', () => {
  let instance: Test;

  beforeAll(() => (instance = new Test()));

  it('should succeed without error when cpf is valid', () => {
    instance.cpfOrCnpj = '21554495008';

    const errors = validateSync(instance);

    expect(errors.length).toBe(0);
  });

  it('should succeed without error when cnpj is valid', () => {
    instance.cpfOrCnpj = '33400689000109';

    const errors = validateSync(instance);

    expect(errors.length).toBe(0);
  });

  it('should not validate an invalid CPF', () => {
    instance.cpfOrCnpj = '1111111111111';

    const errors = validateSync(instance);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not validate an invalid CNPJ', () => {
    instance.cpfOrCnpj = '111111111111111';

    const errors = validateSync(instance);

    expect(errors.length).toBeGreaterThan(0);
  });
});
