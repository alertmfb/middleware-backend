import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { Public } from '../auth/metadata';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLES } from 'src/common/roles.enum';
import { userByIdResponse, usersApiResponse } from './dto/users.dto';
@Controller('users')
// @ApiExcludeController()
@ApiBearerAuth()
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  @UseGuards(RolesGuard)
  @Roles([ROLES.SUPER_ADMIN, ROLES.SENIOR])
  @ApiResponse({ example: usersApiResponse })
  async usersList() {
    return this.userService.getUsers();
  }

  @Public()
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles([ROLES.SUPER_ADMIN, ROLES.SENIOR, ROLES.JUNIOR])
  @ApiResponse({ example: userByIdResponse })
  async userById(@Param() params: { id: string }) {
    return await this.userService.getUserById(params.id);
    // return params;
  }

  @Post('create')
  @Public()
  @ApiExcludeEndpoint()
  async createUser(@Req() req: Request, @Res() res: Response) {
    const token = req.query && (req.query['token'] as string);
    const user = await this.userService.createUser(
      req.body['email'],
      'password',
      token,
    );
    res.json(user);
  }

  @Post('backend/create')
  @Public()
  @ApiExcludeEndpoint()
  async createUserFromBackend(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.createUserFromBackend(
      req.body['email'],
      'password',
      req.body['role'],
    );
    res.json(user);
  }

  @Public()
  @ApiExcludeEndpoint()
  @Post('tamper')
  async tamperUser(@Req() req: Request, @Res() res: Response) {
    res.json(await this.userService.tamper());
  }
}
