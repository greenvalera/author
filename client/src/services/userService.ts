import api from "../http";
import {IUser} from '../models/IUser'

export default class UserService {
  static async fetchUsers(): Promise<IUser[]> {
    const response = await api.get<IUser[]>('/users');
    return response?.data || [];
  }
}