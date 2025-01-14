import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {

  constructor() {}

  public confirm(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
