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
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== 11) {
    return false;
  }

  if (/(\d)\1{10}/.test(cleanCpf)) {
    return false;
  }

  const firstDigit = calculateDigit(cleanCpf.substring(0, 9));
  const secondDigit = calculateDigit(cleanCpf.substring(0, 10));

  return cleanCpf.substring(9, 11) === firstDigit + secondDigit;
}

function isValidCnpj(cnpj: string): boolean {
  const cleanedCnpj = cnpj.replace(/\D/g, '');

  if (cleanedCnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleanedCnpj)) {
    return false;
  }

  let sum = 0;
  let factor = 5;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanedCnpj.charAt(i), 10) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }

  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  sum = 0;
  factor = 6;

  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanedCnpj.charAt(i), 10) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }

  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  return (
    cleanedCnpj.substring(12, 14) ===
    firstDigit.toString() + secondDigit.toString()
  );
}

function calculateDigit(value: string): string {
  let sum = 0;
  let multiplier = value.length + 1;

  for (const digit of value) {
    sum += parseInt(digit, 10) * multiplier;
    multiplier--;
  }

  const remainder = sum % 11;

  if (remainder < 2) {
    return '0';
  } else {
    return (11 - remainder).toString();
  }
}
