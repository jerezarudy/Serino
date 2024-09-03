import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(username: string, password: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({ username, password: hashedPassword });
      return user.save();
    } catch (error) {
      console.log('error->', error);
      return error;
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }
}
