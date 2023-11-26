import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/createUser.dto";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import bcrypt from "bcryptjs";
import { UsersFilesService } from "./usersFiles.service";

dayjs.extend(utc);

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly usersFilesService: UsersFilesService,
  ) {}

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getByLogin(login: string): Promise<User> {
    return this.userModel.findOne({ login }).exec();
  }

  async getByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (await this.getByLogin(dto.login)) {
      throw new BadRequestException("Пользователь с таким логином уже существует", { cause: "login" });
    }

    if (await this.getByEmail(dto.email)) {
      throw new BadRequestException("Пользователь с таким Email уже существует", { cause: "email" });
    }

    const createdAt = dayjs().utc().format();
    const hashedPassword = bcrypt.hash(dto.password, 10);
    const createdUser = new this.userModel({ ...dto, password: hashedPassword, createdAt });
    const savedUser = await createdUser.save();
    await this.usersFilesService.createPersonalDir(savedUser._id.toString());
    return savedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    await this.usersFilesService.deletePersonalDir(deletedUser._id.toString());
    return deletedUser;
  }
}
