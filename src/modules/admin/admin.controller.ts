import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DisableUserMFA } from './dto/admin.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/common/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@UseGuards(RolesGuard)
@Roles([ROLES.SUPER_ADMIN])
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/mfa/disable')
  async disableUserMFA(@Body() payload: DisableUserMFA) {
    return this.adminService.disableUserMFA(payload.id);
  }
}
