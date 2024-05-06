import { Component, OnInit } from '@angular/core';
import { RegisterService, UserData } from '../services/register.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userdata: UserData = {
    name: '',
    last_name: '',
    age: 0,
    phone: '',
    sex: '',
    password: '',
  }

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  // Método para registrar un usuario
  registerUser() {
    this.registerService.registerUser(this.userdata).subscribe(
      (response) => {
        this.presentToast('Registro exitoso.');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.presentToastError('Error al registrar.');
        console.log(error);
      }
    )
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

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
