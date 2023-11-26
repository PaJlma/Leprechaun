import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as path from "path";
import * as fse from "fs-extra";

@Injectable()
export class UsersFilesService {
  constructor() {}

  private pathToStaticDir = path.resolve(__dirname, "..", "..", "static");
  private pathToUsersDir = path.join(this.pathToStaticDir, "users");
  private pathToGeneralAvatar = path.join(this.pathToStaticDir, "general", "avatar.jpg");

  async createPersonalDir(userId: string): Promise<string> {
    const pathToPersonalDir = path.join(this.pathToUsersDir, userId);
    const pathToPersonalAvatar = path.join(pathToPersonalDir, "avatar.jpg");

    try {
      fse.mkdir(pathToPersonalDir);
      fse.copy(this.pathToGeneralAvatar, pathToPersonalAvatar);
    } catch {
      throw new InternalServerErrorException("Ошибка при создании персональной директории пользователя");
    }

    return pathToPersonalDir;
  }

  async deletePersonalDir(userId: string): Promise<void> {
    const pathToPersonalDir = path.join(this.pathToUsersDir, userId);

    try {
      fse.rm(pathToPersonalDir, { recursive: true });
    } catch {
      throw new InternalServerErrorException("Ошибка при удалении персональной директории пользователя");
    }
  }
}
