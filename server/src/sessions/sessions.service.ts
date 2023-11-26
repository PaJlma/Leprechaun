import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Session } from "./schemas/session.schema";
import { Model } from "mongoose";
import { CreateSessionDto } from "./dtos/createSession.dto";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { DeleteSessionDto } from "./dtos/deleteSession.dto";

dayjs.extend(utc);

@Injectable()
export class SessionsService {
  constructor(@InjectModel(Session.name) private readonly sessionModel: Model<Session>) {}

  async getByUserId(user: string, fingerPrint: string): Promise<Session> {
    return this.sessionModel.findOne({ user, fingerPrint }).exec();
  }

  async getByAccessToken(user: string, fingerPrint: string, access: string): Promise<Session> {
    return this.sessionModel.findOne({ user, fingerPrint, access }).exec();
  }

  async getByRefreshToken(user: string, fingerPrint: string, refresh: string): Promise<Session> {
    return this.sessionModel.findOne({ user, fingerPrint, refresh }).exec();
  }

  async create(dto: CreateSessionDto): Promise<Session> {
    const createdAt = dayjs().utc().format();
    const createdSession = new this.sessionModel({ ...dto, createdAt });
    return createdSession.save();
  }

  async delete(dto: DeleteSessionDto): Promise<Session> {
    return this.sessionModel.findOneAndDelete({ user: dto.user, fingerPrint: dto.fingerPrint }).exec();
  }

  async deleteAllForUser(user: string): Promise<Session[]> {
    const deletedSessions = await this.sessionModel.find({ user }).exec();
    await this.sessionModel.deleteMany({ user }).exec();
    return deletedSessions;
  }
}
