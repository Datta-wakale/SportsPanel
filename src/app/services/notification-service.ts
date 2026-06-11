import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  toastData: { type: string; title: string; message: string } | null = null;

  //setting toast 
  setToast(type:string, title: string , message: string): void{
    this.toastData = { type, title , message};
  }

  //clearing the Toast
  clearToast(): void{
    this.toastData= null;
  }
}
