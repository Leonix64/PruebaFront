import { Component, OnInit } from '@angular/core';
import { LoginService, LoginData } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logindata: LoginData = {
    name: '',
    password: ''
  }
  token = '';

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  // Método para iniciar sesión del usuario
  loginUser() {
    this.loginService.LoginUser(this.logindata).subscribe(
      (response) => {
        this.token = response.token;
        this.tokenService.setToken(this.token);
        this.router.navigate(['/home']);
        this.presentToast('Inicio de sesión exitoso');
      },
      (error) => {
        console.log(error);
        this.presentToastError('Error al iniciar sesión');
      }
    );
  }

  // Método para mostrar un toast de éxito
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  // Método para mostrar un toast de error
  async presentToastError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}
