import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(username: string): Promise<User | undefined> {
      const user = await this.userModel.findOne({ username }).exec();
      return user || undefined;
    }
  
    async register(username: string, password: string) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({ username, password: hashedPassword });
      await newUser.save();
      return { username: newUser.username };
    }
}
