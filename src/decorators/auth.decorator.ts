import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ROLES } from 'src/common/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

export function Auth(...roles: ROLES[]) {
  return applyDecorators(UseGuards(RolesGuard), ApiBearerAuth());
}
