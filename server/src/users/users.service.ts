import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersType } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModule: Model<UsersType>,
  ) {}

  async getAllUsers(): Promise<UsersType[]> {
    return this.usersModule.find().exec();
  }

  async getUser(id: string): Promise<UsersType> {
    return this.usersModule.findOne({ id });
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
        creationDate: userData.creationDate,
        isActive: userData.isActive,
      });

      await newUser.save();

      return newUser;
    } else {
      return existingUser;
    }
  }
}
