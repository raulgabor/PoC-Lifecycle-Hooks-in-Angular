import { Component } from '@angular/core';
import { Product } from './child-component/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  colorText = '';
  isDestroyed = false;
  name: string | undefined;
  price: number | undefined;
  product: Product = new Product();

  onColorSubmit(color: HTMLInputElement) {
    this.colorText = color.value;
  }

  updateProduct() {
    this.product = new Product();
    this.product.name = this.name;
    this.product.price = this.price;
  }

  destroy() {
    this.isDestroyed = true;
  }
}
