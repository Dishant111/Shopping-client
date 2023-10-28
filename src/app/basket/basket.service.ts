import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotal } from '../shared/Models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotal | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private httpclient:HttpClient) { }

  getBasket(id: string){
    return this.httpclient.get<Basket>(this.baseUrl+'basket?id='+id)
    .subscribe({
      next : (basket)=> {
        this.basketSource.next(basket);
        this.calculateTotal()
      }
    })
  }

  
  setBasket(basket: Basket){
    return this.httpclient.post<Basket>(this.baseUrl+'basket?',basket)
    .subscribe({
      next : (basket)=> {
        this.basketSource.next(basket);
        this.calculateTotal()
      }
    })
  }

  geCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item:Product | BasketItem,quantity =1){
  if (this.isProduct(item)) {
    item = this.mapProductItemToBasketItem(item);
  }
   const basket = this.geCurrentBasketValue() ?? this.createBasket()
   basket.items = this.addorUpdateItem(basket.items,item,quantity)
   this.setBasket(basket);
  }

  removeItemFromBasket(id:number,quantity = 1){
    const basket = this.geCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x=>x.id == id);
    if(item)
    {
      item.quantity-=quantity
      if(item.quantity == 0)
      {
        basket.items = basket.items.filter(x=>x.id != id)
      }
      if (basket.items.length > 0) this.setBasket(basket)
      else this.deleteBasket(basket)
    }
  }

  deleteBasket(basket: Basket) {
      return this.httpclient.delete(this.baseUrl + 'basket?id='+basket.id).subscribe({
        next: ()=>{
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_id');
        }
      })
  }


  private addorUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket()
    localStorage.setItem('basket_id',basket.id)
    return basket;
  }

  private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureURl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private calculateTotal()
  {
    const basket = this.geCurrentBasketValue();
     if(!basket)return;
     const shipping = 0;
     const subtotal = basket.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
     const total =subtotal+shipping;
     this.basketTotalSource.next({
      shipping: shipping,
      subtotal : subtotal,
      total:total
    })

  }
  
  private isProduct(item:Product|BasketItem):item is Product{
    return (item as Product).productBrand !== undefined
  }
}
