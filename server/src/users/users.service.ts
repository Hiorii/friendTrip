import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersType } from './users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModule: Model<UsersType>,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<UsersType[]> {
    return this.usersModule.find().exec();
  }

  async getUser(condition: any): Promise<UsersType> {
    return this.usersModule.findOne({ email: condition });
  }

  async getUserById(id: any): Promise<UsersType> {
    return this.usersModule.findOne({ id: id });
  }

  async addNewUser(userData: UsersType): Promise<UsersType> {
    const { email } = userData;
    const existingUser = await this.usersModule.findOne({ email });

    if (!existingUser) {
      const newUser = new this.usersModule({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        password: userData.password,
        photo: userData.photo,
        creationDate: userData.creationDate,
        isActive: userData.isActive,
      });

      await newUser.save();

      return newUser;
    } else {
      return existingUser;
    }
  }

  async userLogin(userData: UsersType, response: Response) {
    const { email, password } = userData;
    const user = await this.getUser(email);

    if (!user) {
      throw new BadRequestException('Invalid login data');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password data');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  async user(request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.getUserById({ id: data['id'] });

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async userLogout(response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Logout success',
    };
  }
}
