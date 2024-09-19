import {Injectable} from '@angular/core';
import {IStorageService} from "../../core/storage/iStorage/i-storage.service";
import {User} from "../../core/interfaces";
import {Storage} from "../../core/enums";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private iStorage: IStorageService) {
  }

  async create(user: User): Promise<User> {
    let users = await this.iStorage.getValue<User[]>(Storage.USERS);
    if (!users || users.length === 0) {
      users = [user];
    } else {
      users.push(user);
    }
    await this.iStorage.setValue(Storage.USERS, users);
    return user;
  }

  async get(email: string): Promise<any> {
    const users = await this.iStorage.getValue<User[]>(Storage.USERS);
    if (!users || users.length === 0) {
      return null;
    }

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return null
    }
    return users[userIndex];
  }

  async remove(user: User): Promise<boolean> {
    const users = await this.iStorage.getValue<User[]>(Storage.USERS);
    if (!users || users.length === 0) {
      return false;
    }

    const userIndex = users.findIndex(user => user.email === user.email);
    if (userIndex === -1) {
      return false;
    }
    users.splice(userIndex, 1);
    await this.iStorage.setValue(Storage.USERS, users);
    return true
  }

}
