import { Component } from '@angular/core';
import { CrudService, UserData } from '../services/crud.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userData: UserData = {
    title: '',
    description: '',
    image: ''
  };

  selectedFile: File | null = null;
  uploads: any[] = [];

  token = this.tokenService.getToken();

  constructor(
    private crudService: CrudService,
    private tokenService: TokenService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.readUserData();
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

  // Se ejecuta cuando se selecciona un archivo
  onFileSelected(event: any) {
    //console.log('Archivos seleccionados:', event.target.files);
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.convertToBase64(this.selectedFile);
    }
  }  

  // Se ejecuta cuando se selecciona una nueva imagen
  onNewImageSelected(event: any, upload: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.convertToBase64(selectedFile).then((base64Data: string) => {
        upload.image = base64Data;
        this.enableSaveButton(upload);
      });
    }
  }

  // Convierte el archivo a Base64
  async convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        this.userData.image = base64Data;
        //console.log('Datos Base64 obtenidos:', base64Data);
        resolve(base64Data);
      };
      reader.onerror = () => {
        reject('Error al leer el archivo.');
      };
      reader.readAsDataURL(file);
    });
  }
  
  // Publica la información del usuario
  createUserData() {
    console.log('Datos a enviar:', this.userData);
    this.crudService.createUser(this.userData, this.token).subscribe(
      (response) => {
        this.presentToast('Publicación exitosa.');
        this.readUserData();
      },
      (error) => {
        this.presentToastError('Error al publicar.');
        console.error('Error al publicar:', error);
      }
    );
  }

  // Obtiene la información del usuario
  readUserData() {
    this.crudService.getUploads(this.token).subscribe(
      (response) => {
        this.uploads = response;
        console.log('Datos obtenidos:', this.uploads);
      },
      (error) => {
        this.presentToastError('Error al obtener datos.');
        console.error('Error al obtener datos:', error);
      }
    );
  }

  // Actualiza un registro
  saveChanges(upload: any) {
    const updatedData: UserData = {
      title: upload.title,
      description: upload.description,
      image: upload.image
    };

    this.crudService.updateUpload(upload.id, updatedData, this.token).subscribe(
      (response) => {
        this.presentToast('Registro actualizado.');
        this.readUserData();
      },
      (error) => {
        this.presentToastError('Error al actualizar el registro.');
        console.error('Error al actualizar el registro:', error);
      }
    );
  }

  // Elimina un registro con confirmación
  deleteUpload(uploadId: string) {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmed) {
      this.crudService.deleteUpload(uploadId, this.token).subscribe(
        (response) => {
          this.presentToast('Registro eliminado.');
          this.readUserData();
        },
        (error) => {
          this.presentToastError('Error al eliminar el registro.');
          console.error('Error al eliminar el registro:', error);
        }
      );
    }
  }

  // Convierte una cadena Base64 a imagen
  dataURItoImage(dataURI: string) {
    return 'data:image/jpeg;base64,' + dataURI;
  }

  enableSaveButton(upload: any) {
    upload.changesMade = true;
  }
}
