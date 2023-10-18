import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from './../../shared/Models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  
  product?: Product;

  constructor(
    private shopservice:ShopService, 
    private actiavatedRoute:ActivatedRoute){

  }
  
  ngOnInit(): void {
    const id = this.actiavatedRoute.snapshot.paramMap.get("id");
    
    if (id) 
      this.shopservice.getProduct(+id).subscribe({
        next: product => this.product = product,
        error : error=>console.log(error)
      });
  }

}
