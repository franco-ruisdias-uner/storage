import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle, IonRouterLink, IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {User} from "../../../core/interfaces";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,
    IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonInputPasswordToggle, IonButton, ReactiveFormsModule, IonGrid, IonRow, IonCol, IonText, IonRouterLink, RouterLink]
})
export class LoginPage {


  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {
  }

  async onSubmit() {
    const values = this.loginForm.value;
    const user: User = await this.userService.get(values.email);

    if (values.email === user.email && values.password === user.password) {
      await this.authService.setSession({
        jwtToken: 'TOKEN_ACA',
        refreshToken: 'REFRESH_ACA'
      })
      await this.router.navigate(['/home'], {replaceUrl: true});
    }
  }

}
