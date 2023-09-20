import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CheckEligibilityDto } from '../dtos/check-eligibility.request.dto';
import { CustomersService } from '../services/customers.service';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Check customer eligibity' })
  @ApiOkResponse({
    type: CheckEligibilityDto,
    description: 'Return the customer eligibility',
    isArray: false,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  checkEligibility(@Body() dto: CheckEligibilityDto) {
    return this.customersService.checkEligibility(dto);
  }
}
