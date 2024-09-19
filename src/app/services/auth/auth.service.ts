import {Injectable} from '@angular/core';
import {IStorageService} from "../../core/storage/iStorage/i-storage.service";
import {Session} from "../../core/interfaces";
import {Storage} from '../../core/enums'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private iStorage: IStorageService) {
  }

  async getSession(): Promise<Session> {
    return this.iStorage.getValue<Session>(Storage.SESSION);

  }

  async setSession(session: Session): Promise<Session> {
    await this.iStorage.setValue(Storage.SESSION, session)
    return session;
  }

  async removeSession(): Promise<void> {
    await this.iStorage.removeValue(Storage.SESSION);
  }
}
