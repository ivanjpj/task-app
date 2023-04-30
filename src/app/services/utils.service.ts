import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  //====Loading====

  //Present
  async presentLoading(options?: LoadingOptions) {
    const loading = await this.loadingController.create(options);
    await loading.present();
  }

  //Dismiss
  async dismissLoading() {
    return await this.loadingController.dismiss();
  }


  //====Local Storage====
  //SET
  setElementInLocalStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element))
  }

  //GET
  getElementFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    toast.present();
  }

  //==== Router ====
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //==== Alert ====
  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);

    await alert.present();
  }

}
