import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  successAlert(message: string, title: string){
    Swal.fire(
      title,
      message,
      'success'
    )
  }

  async questionAlert(title: string, message: string): Promise<boolean>{
    return await Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      console.log('test')
      if (result.isConfirmed) {
    
        return true;

      }

      return false;
    })

  }

  errorAlert(message: string){
    Swal.fire(
      `Error!`,
      message,
      'error'
    )
  }
}
