import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/Models/product';
import { Pagination } from "../shared/Models/pagination";
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';
import { ShopParams } from '../shared/Models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  baseUrl:string = "https://localhost:5001/api/";

  constructor(private httpClient : HttpClient) {

   }

   getProucts(shopParams:ShopParams){
    let params = new HttpParams();
    if (shopParams.brandId > 0) { params = params.append("brandId",shopParams.brandId)}
    if (shopParams.typeId > 0) { params = params.append("typeId",shopParams.typeId)}
    if (shopParams.sort) { params = params.append("sort",shopParams.sort)}
    params = params.append("pageIndex",shopParams.pageNumber)
    params = params.append("pageSize",shopParams.pageSize)
    
    if (shopParams.search)  params = params.append("search",shopParams.search)

    return this.httpClient.get<Pagination<Product>>(
      this.baseUrl+"products",
      {params:params});
   }

   getBrands(){
    return this.httpClient.get<Brand[]>(this.baseUrl+"products/brands");
   }

   getTypes(){
    return this.httpClient.get<Type[]>(this.baseUrl+"products/types");
   }
}
