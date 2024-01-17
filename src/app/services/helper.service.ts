import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  

  constructor(public toastController: ToastController,
              public loadingController: LoadingController) { }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoandig(mensaje: string) {
    var loader = await this.loadingController.create({
      cssClass: 'my.custom-class',
      message: mensaje     
    })
      await loader.present();
      return loader;
  }

}
