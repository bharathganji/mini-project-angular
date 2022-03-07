import { Component, OnInit } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {
  panelOpenState = true;
  faSearch = faSearch as IconDefinition;
  constructor(private productservice: ProductService) {
    this.productservice.getAllWomenProducts().subscribe(
      (result) => {
        this.dup_women_array = result;
        this.womenProducts = result;
      },
      (err: Error) => {
        alert(err.message);
      }
    );
  }

  womenProducts!: any[];
  dup_women_array!: any[];

  ngOnInit(): void {}

  star4: any = false;
  star3: any = false;
  star2: any = false;

  // womenProducts = [
  //   {
  //     title: 'woman net dress',
  //     description:
  //       'Womens Net Embroidered Semi-Stitched Lehenga ',
  //     price: 2500,
  //     rating: 4,
  //     img: '../../../../../assets/women/1.jpg',
  //   },
  //   {
  //     title: 'women long sleeve dress',
  //     description:
  //       'Women Long Sleeve Dress - Vintage Print Split Dress',
  //     price: 1900,
  //     rating: 4,
  //     img: '../../../../../assets/women/2.jpg',
  //   },
  //   {
  //     title: 'women net dress',
  //     description:
  //       'women net lehenga',
  //     price: 899,
  //     rating: 3,

  //     img: '../../../../../assets/women/3.jpg',
  //   },
  //   {
  //     title: 'women net sequence design dress',
  //     description:
  //       'women net sequence design dress',
  //     price: 1200,
  //     rating: 3,

  //     img: '../../../../../assets/women/4.jpg',
  //   },
  //   {
  //     title: 'women saree',
  //     description:
  //       'women saree self design black saree',
  //     price: 1399,
  //     rating: 4,

  //     img: '../../../../../assets/women/5.jpg',
  //   },
  //   {
  //     title: 'women kurta dress',
  //     description:
  //       'new trendy kurta dress for women',
  //     price: 1499,
  //     rating: 2,

  //     img: '../../../../../assets/women/6.jpg',
  //   },
  //   {
  //     title: 'women party ware dress',
  //     description:
  //       'women party ware dress ',
  //     price: 1299,
  //     rating: 3,

  //     img: '../../../../../assets/women/7.jpg',
  //   },
  //   {
  //     title: 'women regular dress',
  //     description:
  //       'women daily ware dress',
  //     price: 1199,
  //     rating: 2,

  //     img: '../../../../../assets/women/8.jpg',
  //   },
  //   {
  //     title: 'women party ware saree',
  //     description:
  //       'women party ware cotton saree ',
  //     price: 1299,
  //     rating: 3,

  //     img: '../../../../../assets/women/9.jpg',
  //   },
  //   {
  //     title: 'women self design salwar dress',
  //     description:
  //       'self design salwar suit material',
  //     price: 1099,
  //     rating: 4,
  //     img: '../../../../../assets/women/10.jpg',
  //   },
  //   {
  //     title: 'women kurti dress',
  //     description:
  //       'new kurta dress for women',
  //     price: 1499,
  //     rating: 4,
  //     img: '../../../../../assets/women/11.jpg',
  //   },    {
  //     title: 'women satin dress',
  //     description:
  //       'women satin geoegette dress material',
  //     price: 1399,
  //     rating: 4,
  //     img: '../../../../../assets/women/12.jpg',
  //   },    {
  //     title: 'women wedding wear dress',
  //     description:
  //       'georgette dress material , navy blue color ',
  //     price: 1299,
  //     rating: 4,
  //     img: '../../../../../assets/women/13.jpg',
  //   },
  // ];

  // dup_women_array = JSON.parse(JSON.stringify(this.womenProducts));
  
  
  toArray(param: number): any {
    return Array(param).fill(param);
  }

    
  value = 500;
  rangeFilter() {
    this.dup_women_array = this.womenProducts.filter(
      (product) => product.price < this.value
    );
  }
  
  sort(value: any) {
    console.log(value  +' from sort function')
    if (value.endsWith('high')) {
      this.dup_women_array = this.womenProducts.sort((a, b) => a.price - b.price);
    } else if (value.endsWith('low')) {
      this.dup_women_array = this.womenProducts.sort((a, b) => b.price - a.price);
    } else if(value=='selected'){
      this.dup_women_array = this.womenProducts;
    }
  }

  fiterByText(value: string) {
    this.dup_women_array = this.womenProducts.filter((product) =>
      product.title.includes(value)
    );
  }
  resetAll() {
    this.dup_women_array = [...this.womenProducts];
    this.star4 = false;
    this.star3 = false;
    this.star2 = false;
  }

  addTocart(index: number) {
    this.productservice.addProductstoCart(this.womenProducts[index]);
  }

  arr: number[] = new Array();

  rating(ratingValue: any) {
    if (this.arr.includes(ratingValue)) {
      this.arr = this.arr.filter((e) => e !== ratingValue);
      this.dup_women_array = this.womenProducts.filter((product) =>
        this.arr.includes(product.rating!)
      );
      if (this.arr.length == 0) {
        this.dup_women_array = [...this.womenProducts];
      }
    } else {
      this.arr.push(ratingValue);
      this.dup_women_array = this.womenProducts.filter((product) =>
        this.arr.includes(product.rating!)
      );
    }

    console.log(this.arr);
  }
}
