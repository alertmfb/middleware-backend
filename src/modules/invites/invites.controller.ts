import {
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '../auth/metadata';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import {
  createPasswordSchema,
  Iniviter,
  inviteUserSchema,
  tokenQuerySchema,
} from './schema';
import { InvitesService } from './invites.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
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
    new ZodValidationPipe(inviteUserSchema).transform(req.body, {
      type: 'body',
    });

    const inviter = req.user as Iniviter;

    const data = await this.invitesService.inviteUser(req.body, inviter);
    res.json(data);
  }

  @Post('/createPassword')
  @Public()
  @ApiBody({ type: CreateProfile })
  @ApiParam({ name: 'token' })
  @ApiResponse({ example: createPasswordExample })
  async createProfile(@Req() req: Request, @Res() res: Response) {
    new ZodValidationPipe(tokenQuerySchema).transform(req.query, {
      type: 'query',
    });

    const user = await this.invitesService.createProfile(
      req.body,
      req.query['token'] as string,
    );

    res.json(user);
  }

  @Get('/otpauth')
  @Public()
  @ApiParam({ name: 'token' })
  @ApiResponse({ example: otpauthExample })
  async getOTPString(@Req() req: Request, @Res() res: Response) {
    new ZodValidationPipe(tokenQuerySchema).transform(req.query, {
      type: 'query',
    });

    const otpauth = await this.invitesService.generateQRCodeString(
      req.query['token'] as string,
    );

    res.json(otpauth);
  }
}
