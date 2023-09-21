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
    instance.cpfOrCnpj = '680.876.290-27';

    const errors = validateSync(instance);

    expect(errors.length).toBe(0);
  });

  it('should succeed without error when cnpj is valid', () => {
    instance.cpfOrCnpj = '90.175.372/0001-41';

    const errors = validateSync(instance);

    expect(errors.length).toBe(0);
  });

  it('should not validate an invalid CPF', () => {
    instance.cpfOrCnpj = '000.000.000-00';

    const errors = validateSync(instance);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not validate an invalid CNPJ', () => {
    instance.cpfOrCnpj = '00.000.000/0000-00';

    const errors = validateSync(instance);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be able to validate cpf or cnpj with already clean value', () => {
    const instance = new Test();
    instance.cpfOrCnpj = '68087629027';

    const errors = validateSync(instance);

    expect(errors.length).toBe(0);
  });
});
