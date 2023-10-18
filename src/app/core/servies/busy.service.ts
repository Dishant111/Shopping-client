import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
busyRequestCount = 0;

  constructor(private spinnerService:NgxSpinnerService) 
  {

   }

   public busy(){
    this.busyRequestCount ++;
    this.spinnerService.show(undefined,{
      type: 'timer',
      bdColor:'rdba(255,255,255,0.7)',
      color:'#333333'

    });
   }

   public ideal(){
    this.busyRequestCount --;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
   }
}

