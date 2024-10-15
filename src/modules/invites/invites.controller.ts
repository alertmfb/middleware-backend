import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '../auth/metadata';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { acceptInvitationSchema, Iniviter, inviteUserSchema } from './schema';
import { InvitesService } from './invites.servce';

@Controller('invites')
export class InvitesController {
  constructor(private invitesService: InvitesService) {}

  @Post('/inviteUser')
  async inviteUser(@Req() req: Request, @Res() res: Response) {
    new ZodValidationPipe(inviteUserSchema).transform(req.body, {
      type: 'body',
    });

    const inviter = req.user as Iniviter;

    const token = await this.invitesService.inviteUser(req.body, inviter);

    if (!token) {
      res.json({ message: 'invalid' }).status(400);
    }

    res.json({ inviteToken: token });
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
