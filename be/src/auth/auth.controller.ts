import { Controller, Post, Body, Req, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { AuthRequest } from 'src/types/AuthRequest.type';
import { omit } from 'lodash';
import { RegisterDTO } from './dto/RegisterDTO';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '../metadata/public.metadata';
import { ProfileDTO } from './dto/ProfileDTO';
import { PasswordDTO } from './dto/PasswordDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: AuthRequest, @Body() body: LoginDTO) {
    return this.authService.createJWT(omit(req.user, ['password']));
  }

  @Public()
  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.createUser(body);
  }

  @Put('profile')
  changeProfile(@Req() req: AuthRequest, @Body() body: ProfileDTO) {
    return this.authService.changeProfile(req.user.user_id, body);
  }

  @Put('password')
  changePassword(
    @Req() req: AuthRequest,
    @Body() { current_password, new_password }: PasswordDTO,
  ) {
    return this.authService.changePassword(
      req.user.user_id,
      current_password,
      new_password,
    );
  }

  @Post('logout')
  logout(@Req() req: AuthRequest) {
    return this.authService.logout(req.user.user_id);
  }
}
