import {
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '../auth/metadata';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import {
  acceptInvitationSchema,
  createPasswordSchema,
  Iniviter,
  inviteUserSchema,
  tokenQuerySchema,
} from './schema';
import { InvitesService } from './invites.servce';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('invites')
@ApiExcludeController()
export class InvitesController {
  constructor(private invitesService: InvitesService) {}

  @Post('/inviteUser')
  async inviteUser(@Req() req: Request, @Res() res: Response) {
    new ZodValidationPipe(inviteUserSchema).transform(req.body, {
      type: 'body',
    });

    const inviter = req.user as Iniviter;

    if (inviter.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('You cannot perform this action');
    }
    const data = await this.invitesService.inviteUser(req.body, inviter);
    res.json(data);
  }

  @Post('/createPassword')
  @Public()
  async createPassword(@Req() req: Request, @Res() res: Response) {
    new ZodValidationPipe(createPasswordSchema).transform(req.body, {
      type: 'body',
    });

    new ZodValidationPipe(tokenQuerySchema).transform(req.query, {
      type: 'query',
    });

    const user = await this.invitesService.createPassword(
      req.body,
      req.query['token'] as string,
    );

    res.json(user);
  }

  @Get('/otpauth')
  @Public()
  async getOTPString(@Req() req: Request, @Res() res: Response) {
    new ZodValidationPipe(tokenQuerySchema).transform(req.query, {
      type: 'query',
    });

    const otpauth = await this.invitesService.generateQRCodeString(
      req.query['token'] as string,
    );

    res.json({ otpauth: otpauth });
  }

  @Public()
  @Get('/acceptInvitation')
  async acceptInvitation(@Req() req: Request, @Res() res: Response) {
    new ZodValidationPipe(acceptInvitationSchema).transform(req.query, {
      type: 'query',
    });
    const token = req.query && (req.query['token'] as string);
    const decoded = await this.invitesService.acceptInvitation(token);
    res.json(decoded);
  }
}
