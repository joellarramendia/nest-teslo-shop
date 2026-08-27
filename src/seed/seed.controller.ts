import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.admin)
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Execute database seed',
    description: 'Populates the database with initial dummy data (users, products, and images). WARNING: This will truncate existing tables.'
  })
  @ApiResponse({
    status: 200,
    description: 'Seed executed successfully',
    schema: {
      type: 'string',
      example: 'SEED EXECUTED'
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin role required)' })
  executeSeed() {
    return this.seedService.runSeed()
  }
}
