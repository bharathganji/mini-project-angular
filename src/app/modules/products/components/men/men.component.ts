import { Component, OnInit } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css'],
})
export class MenComponent implements OnInit {
  panelOpenState = true;
  faSearch = faSearch as IconDefinition;
  constructor(private productservice: ProductService) {
    this.productservice.getAllMenProducts().subscribe(
      (result) => {
        this.dup_men_array = result;
        this.menProducts = result;
      },
      (err: Error) => {
        alert(err.message);
      }
    );
  }
  ngOnInit(): void {}

  menProducts!: any[];
  dup_men_array!: any[];

  star4: any = false;
  star3: any = false;
  star2: any = false;

  // menProducts = [
  //   {
  //     title: 'Men Slim Casual Shirt',
  //     description: 'Men Slim Casual Shirt blue color',
  //     price: 3000,
  //     rating: 4,
  //     img: '../../../../../assets/mens/1.webp',
  //   },
  //   {
  //     title: 'Men Jamawar Shawl dress',
  //     description:
  //       'Pashmoda Men Jamawar Shawl',
  //     price: 2999,
  //     rating: 4,
  //     img: '../../../../../assets/mens/2.webp',
  //   },
  //   {
  //     title: 'Men Regular Shirt',
  //     description: 'Men Regular Shirt',
  //     price: 1499,
  //     rating: 3,

  //     img: '../../../../../assets/mens/3.webp',
  //   },
  //   {
  //     title: 'Puma Men Jacket',
  //     description: 'Puma Black-ULTRA YELLOW',
  //     price: 3499,
  //     rating: 3,

  //     img: '../../../../../assets/mens/4.webp',
  //   },
  //   {
  //     title: 'Men Regular Formal Shirt',
  //     description: 'Men Regular Formal Shirt',
  //     price: 2599,
  //     rating: 4,

  //     img: '../../../../../assets/mens/5.webp',
  //   },
  //   {
  //     title: 'Men t-Shirt',
  //     description:
  //       ' Try This Men t-Shirt Round Sleeve ',
  //     price: 2499,
  //     rating: 2,

  //     img: '../../../../../assets/mens/6.jpg',
  //   },
  //   {
  //     title: 'men t-shirt',
  //     description: 'men t-shirt black color',
  //     price: 1899,
  //     rating: 3,

  //     img: '../../../../../assets/mens/7.jpg',
  //   },
  //   {
  //     title: 'men pant',
  //     description: 'men cotton aolid cargo pants',
  //     price: 1499,
  //     rating: 2,

  //     img: '../../../../../assets/mens/8.jpg',
  //   },
  //   {
  //     title: 'men shirt cloth',
  //     description: 'men wool self design cloth',
  //     price: 999,
  //     rating: 3,

  //     img: '../../../../../assets/mens/9.jpg',
  //   },
  //   {
  //     title: 'men casual shirt',
  //     description: 'men solid casual slim fit shirt ',
  //     price: 1299,
  //     rating: 4,
  //     img: '../../../../../assets/mens/10.jpg',
  //   },
  //   {
  //     title: 'men pants',
  //     description: 'men jeans pants',
  //     price: 1399,
  //     rating: 4,
  //     img: '../../../../../assets/mens/11.jpg',
  //   },
  // ];

  // dup_men_array = JSON.parse(JSON.stringify(this.menProducts));

  toArray(param: number): any {
    return Array(param).fill(param);
  }

  value = 500;
  rangeFilter() {
    this.dup_men_array = this.menProducts.filter(
      (product) => product.price < this.value
    );
  }

  fiterByText(value: string) {
    this.dup_men_array = this.menProducts.filter((product) =>
      product.title.includes(value)
    );
  }
  resetAll() {
    this.dup_men_array = [...this.menProducts];
    this.star4 = false;
    this.star3 = false;
    this.star2 = false;
    this.value = 500;
  }

  addTocart(index: number) {
    this.productservice.addProductstoCart(this.menProducts[index]);
  }

  sort(value: any) {
    console.log(value + ' from sort function');
    if (value.endsWith('high')) {
      this.dup_men_array = this.menProducts.sort((a, b) => a.price - b.price);
    } else if (value.endsWith('low')) {
      this.dup_men_array = this.menProducts.sort((a, b) => b.price - a.price);
    } else if (value == 'selected') {
      this.dup_men_array = this.menProducts;
    }
  }

  arr: number[] = new Array();

  rating(ratingValue: any) {
    if (this.arr.includes(ratingValue)) {
      this.arr = this.arr.filter((e) => e !== ratingValue);
      this.dup_men_array = this.menProducts.filter((product) =>
        this.arr.includes(product.rating!)
      );
      if (this.arr.length == 0) {
        this.dup_men_array = [...this.menProducts];
      }
    } else {
      this.arr.push(ratingValue);
      this.dup_men_array = this.menProducts.filter((product) =>
        this.arr.includes(product.rating!)
      );
    }

    console.log(this.arr);
  }
}
