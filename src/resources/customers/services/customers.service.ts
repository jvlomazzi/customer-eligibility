import { Injectable } from '@nestjs/common';
import { CheckEligibilityDto } from '../dtos/check-eligibility.request.dto';

@Injectable()
export class CustomersService {
  checkEligibility(dto: CheckEligibilityDto) {
    return dto;
  }
}
