import { ShopParams } from './../shared/Models/shopParams';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/Models/product';
import { ShopService } from './shop.service';
import { Type } from '../shared/Models/type';
import { Brand } from '../shared/Models/brand';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild("search") searchTerm?:ElementRef;
  
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];
  
  shopParams= new ShopParams();
  
  totalcount = 0;

  sortoptions = [
    {name:"Alphabatical",value:"Name" },
    {name:"Price : Low to high",value:"PriceAsc" },
    {name:"Price : Hign to low",value:"PriceDesc" }
  ];
  
  constructor(private shopService: ShopService){}
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  
  getProducts() {
    this.shopService.getProucts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalcount = response.count;
      },
      error: error => console.log(error)
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next:response=> this.brands = [{id:0,name:"All"},...response],
      error:error=>console.log(error)
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next:response=> this.types = [{id:0,name:"All"},...response],
      error:error=>console.log(error)
    }) 
  }

  onBrandIdSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onTypeIdSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onSortSelected(event:any){
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event:any){
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    if (this.searchTerm) {
      this.shopParams.search = this.searchTerm.nativeElement.value;
      this.getProducts();
    }
  }

  onReset(){
    if (this.searchTerm)  this.searchTerm.nativeElement.value = "";
      this.shopParams =  new ShopParams();
      this.getProducts();
  }
}
