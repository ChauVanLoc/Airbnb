import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from 'src/types/ApiResponse.type';
import { omit } from 'lodash';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheConstant } from '../constants/Cache.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async hashPassword(plainText: string, saltOrRound = 10): Promise<string> {
    try {
      const encodeText = await bcrypt.hash(plainText, saltOrRound);
      return encodeText;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  comparePassword(plainPassword: string, encodePassword: string): boolean {
    try {
      const isMatch = bcrypt.compareSync(plainPassword, encodePassword);
      return isMatch;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser({ email, password }): Promise<string | user> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return 'Email does not exist!';
    }
    if (!this.comparePassword(password, user.password)) {
      return 'Password incorrect!';
    }
    return user;
  }

  async createJWT(
    data: Omit<user, 'password'>,
  ): Promise<ApiResponse<{ access_token: string }>> {
    const isTokenExist = await this.cache.get(String(data.user_id));
    if (isTokenExist) {
      throw new HttpException(
        'You can not login two device at time!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const access_token = await this.jwt.sign(data, {
      expiresIn: process.env.EXPIRED_ACCESSTOKEN || '8h',
    });
    await this.cache.set(
      String(data.user_id),
      'Bearer ' + access_token,
      3600 * 8,
    );
    return {
      message: 'Login successfull!',
      data: {
        access_token: 'Bearer ' + access_token,
      },
    };
  }

  async createUser(
    data: Pick<user, 'email' | 'password' | 'full_name' | 'gender' | 'phone'>,
  ): Promise<ApiResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw new HttpException('User exist!', HttpStatus.CONFLICT);
    }
    const hash_password = await this.hashPassword(data.password);
    const new_user = await this.prisma.user.create({
      data: {
        ...data,
        role: Number(process.env.USER_ROLE),
        password: hash_password,
      },
    });
    return {
      message: 'Create user succesfull',
      data: omit(new_user, ['password']),
    };
  }

  async changeProfile(
    user_id: number,
    data: Partial<Pick<user, 'full_name' | 'birthday' | 'phone' | 'gender'>>,
  ): Promise<ApiResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    const new_profile = await this.prisma.user.update({
      where: {
        user_id,
      },
      data,
    });
    return {
      message: 'Update user successfull!',
      data: omit(new_profile, ['password']),
    };
  }

  async changePassword(
    user_id: number,
    current_password: string,
    new_password: string,
  ): Promise<ApiResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (!this.comparePassword(current_password, user.password)) {
      throw new HttpException(
        'Current password incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await this.hashPassword(new_password);
    const update_user = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        password,
      },
    });
    return {
      message: 'Update password successfull!',
      data: omit(update_user, ['password']),
    };
  }

  async logout(): Promise<ApiResponse<{}>> {
    await this.cache.del(CacheConstant.access_token);
    return {
      message: 'Logout successfull!',
      data: {},
    };
  }
}
