import { BasketService } from 'src/app/basket/basket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './shared/Models/product';
import { Pagination } from "./shared/Models/pagination";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Shopping';

  constructor(private basketService: BasketService)
  {
  }

  ngOnInit(): void {    
    const basketId= localStorage.getItem('basket_id')
    if (basketId) 
      this.basketService.getBasket(basketId)
    
  }
}
