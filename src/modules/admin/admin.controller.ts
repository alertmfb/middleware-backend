import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  CreateDesignation,
  createDesignationResponse,
  designationsResponse,
  DisableUserMFA,
  ModifyUserRole,
  modifyUserRoleResponse,
  SuspendUser,
  suspendUserResponse,
} from './dto/admin.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/common/roles.enum';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/metadata';

@ApiTags('admin')
@UseGuards(RolesGuard)
@Roles([ROLES.SUPER_ADMIN])
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/mfa/disable')
  @ApiBody({ type: DisableUserMFA })
  async disableUserMFA(@Body() payload: DisableUserMFA) {
    return this.adminService.disableUserMFA(payload.id);
  }

  @Post('/suspendUser')
  @ApiBody({ type: SuspendUser })
  @ApiResponse({ example: suspendUserResponse })
  async suspendUserById(@Body() payload: SuspendUser) {
    return await this.adminService.suspendUserById(payload.id);
  }

  @Post('/modifyRole')
  @ApiBody({ type: ModifyUserRole })
  @ApiResponse({ example: modifyUserRoleResponse })
  async modifyUserRole(@Body() payload: ModifyUserRole) {
    return await this.adminService.modifyUserRole(payload);
  }

  @Public()
  @Get('/designations')
  @ApiResponse({ example: designationsResponse })
  async getDesignations() {
    return await this.adminService.getDesignations();
  }

  @Public()
  @Post('/designations/create')
  @ApiBody({ type: CreateDesignation })
  @ApiResponse({ example: createDesignationResponse })
  async createDesignation(@Body() payload: CreateDesignation) {
    return await this.adminService.createDesignation(payload.name);
  }
}
