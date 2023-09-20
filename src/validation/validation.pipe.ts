import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const validationErrors = this.formatValidationErrors(errors);
      throw new BadRequestException({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatValidationErrors(errors: ValidationError[]) {
    const validationErrors = [];
    for (const error of errors) {
      for (const constraint in error.constraints) {
        if (error.constraints.hasOwnProperty(constraint)) {
          validationErrors.push({
            property: error.property,
            message: error.constraints[constraint],
          });
        }
      }
    }
    return validationErrors;
  }
}
