export interface IAccount {
  _id?: string;
  login?: string;
  email?: string;
  createdAt?: string;
  nick?: string;
  lastName?: string;
  phoneNumber?: string;
  isBanned?: boolean;
  birthDate?: string;
  sex?: "Male" | "Female";
  role?: "User" | "Admin";
  channelInfo?: IChannelInfo;
}

export interface IChannelInfo {
  description?: string;
  isConfirmed?: boolean;
}
