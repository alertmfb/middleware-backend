import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '../auth/metadata';
import { Iniviter, tokenQuerySchema } from './schema';
import { InvitesService } from './invites.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProfile,
  createPasswordExample,
  InviteUser,
  inviteUserExample,
  otpauthExample,
} from './dto/invites.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/common/roles.enum';

@Controller('invites')
@ApiTags('invites')
export class InvitesController {
  constructor(private invitesService: InvitesService) {}

  @UseGuards(RolesGuard)
  @Roles([ROLES.SUPER_ADMIN])
  @Post('/inviteUser')
  @ApiBearerAuth()
  @ApiBody({ type: InviteUser })
  @ApiResponse({ example: inviteUserExample })
  async inviteUser(@Req() req: Request, @Res() res: Response) {
    const inviter = req.user as Iniviter;
    const data = await this.invitesService.inviteUser(req.body, inviter);
    res.json(data);
  }

  @Post('/createPassword')
  @Public()
  @ApiBody({ type: CreateProfile })
  @ApiQuery({ name: 'token' })
  @ApiResponse({ example: createPasswordExample })
  async createProfile(
    @Body() payload: CreateProfile,
    @Query('token') token: string,
  ) {
    return await this.invitesService.createProfile(payload, token);
  }

  @Get('/otpauth')
  @Public()
  @ApiResponse({ example: otpauthExample })
  async getOTPString(@Query('token') token: string) {
    return await this.invitesService.generateQRCodeString(token);
  }
}
