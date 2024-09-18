import {Component} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import {IonicStorageService} from "../services/ionic-storage.service";
import {Storage} from "../core/enums";
import {Router} from "@angular/router";
import {IStorageService} from "../core/storage/iStorage/i-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  constructor(//private storageService: IonicStorageService,
    private iStorage: IStorageService,
    private router: Router,) {
  }

  async logout() {
    await this.iStorage.removeValue(Storage.TOKEN);
    await this.router.navigate(['/login'], {replaceUrl: true});
  }
}
