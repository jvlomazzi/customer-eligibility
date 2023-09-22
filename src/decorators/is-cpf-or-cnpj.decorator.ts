import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsCpfOrCnpj(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;
          return isValidCpf(value) || isValidCnpj(value);
        },
      },
    });
  };
}
function isValidCpf(cpf: string): boolean {
  const pattern = /^\d{11}$/;
  return pattern.test(cpf);
}

function isValidCnpj(cnpj: string): boolean {
  const pattern = /^\d{14}$/;
  return pattern.test(cnpj);
}
