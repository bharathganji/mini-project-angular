import { Component, OnInit } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";


@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css'],
  animations: [
    trigger("animateCart", [
      state(
        "ready",
        style({
          transform: "rotate(0)",
          marginLeft: 0
        })
      ),
      state(
        "active",
        style({
          transform: "rotate(-20deg)",
          marginLeft: "140px",
          display: "none"
        })
      ),
      transition("ready => active", animate("600ms 100ms ease-in")),
      transition("active => ready", animate("100ms ease-in"))
    ]),
    trigger("animateText", [
      state(
        "ready_text",
        style({
          opacity: 1
        })
      ),
      state(
        "active_text",
        style({
          opacity: 0
        })
      ),
      transition("ready_text => active_text", animate("100ms linear")),
      transition("active_text => ready_text", animate("100ms 100ms linear"))
    ]),
    trigger("hideText", [
      state(
        "ready_text",
        style({
          display: "inline"
        })
      ),
      state(
        "active_text",
        style({
          display: "none"
        })
      ),
      transition("ready_text => active_text", animate("0ms 700ms linear")),
      transition("active_text => ready_text", animate("0ms linear"))
    ]),
    trigger("animateCheck", [
      state(
        "ready_check",
        style({
          opacity: 0
        })
      ),
      state(
        "active_check",
        style({
          opacity: 1
        })
      ),
      transition("ready_check => active_check", animate("100ms 750ms linear")),
      transition("ready_check => active_check", animate("100ms linear"))
    ]),
    trigger("hideCheck", [
      state(
        "ready_check",
        style({
          display: "none"
        })
      ),
      state(
        "active_check",
        style({
          display: "inline"
        })
      ),
      transition("ready_check => active_check", animate("100ms 720ms linear"))
    ])
  ]

})
export class KidsComponent implements OnInit {
  panelOpenState = true;
  faSearch = faSearch as IconDefinition;

  constructor(private productservice: ProductService) {
   
    
    this.productservice.getAllKidsProducts().subscribe(
      (result) => {
        this.dup_kids_array = result;
        this.kidsProducts = result;
      },
      (err: Error) => {
        alert(err.message);
      }
    );
  }

  
  
  kidsProducts!: any[];
  dup_kids_array!: any[];

  ngOnInit(): void {}

  star4: any = false;
  star3: any = false;
  star2: any = false;

  // kidsProducts = [
  //   {
  //     title: 'Boys Cotton dress',
  //     description: 'Bold N Elegant Cool Printed Bear Cartoon Printed ',
  //     price: 1599,
  //     rating: 4,
  //     img: '../../../../../assets/kids/1.jpg',
  //   },
  //   {
  //     title: 'Boys woolen dress blue',
  //     description:
  //       'Some quick example text to build on the card title and make up the bulk of the card content',
  //     price: 1399,
  //     rating: 4,
  //     img: '../../../../../assets/kids/2.jpg',
  //   },
  //   {
  //     title: 'kids panda dress',
  //     description:
  //       ' Baby Spring Hooded Flannel Romper Panda Style Outfits Panda',
  //     price: 1299,
  //     rating: 3,

  //     img: '../../../../../assets/kids/3.jpg',
  //   },
  //   {
  //     title: 'girls dress',
  //     description:
  //       'pink girls dress with good texture',
  //     price: 1199,
  //     rating: 3,

  //     img: '../../../../../assets/kids/4.jpg',
  //   },
  //   {
  //     title: 'boys dress black and white',
  //     description:
  //       'boys dress black and white stripes',
  //     price: 1199,
  //     rating: 4,

  //     img: '../../../../../assets/kids/5.jpg',
  //   },
  //   {
  //     title: 'girls dress',
  //     description:
  //       'girls dress blue colour with pink design',
  //     price: 1399,
  //     rating: 2,

  //     img: '../../../../../assets/kids/6.jpg',
  //   },
  //   {
  //     title: 'boys dress set',
  //     description:
  //       'Bold N Elegant Sky Blue n Grey Cute Elephant Tail 2pc',
  //     price: 1299,
  //     rating: 3,

  //     img: '../../../../../assets/kids/7.jpg',
  //   },
  //   {
  //     title: 'Kids Cotton Printed Clothing Set',
  //     description:
  //     'Material: Cotton blend, Smooth breathable and Skin-Friendly Fabric',
  //     price: 1599,
  //     rating: 2,

  //     img: '../../../../../assets/kids/8.jpg',
  //   },
  //   {
  //     title: 'Boys Cotton Stylish T-Shirt',
  //     description:
  //       'Boys Cotton Stylish T-Shirt and Pant Set in Orange Color',
  //     price: 1499,
  //     rating: 3,

  //     img: '../../../../../assets/kids/9.jpg',
  //   },
  //   {
  //     title: 'girls summer style dress',
  //     description:
  //       'Baby Girl Dress Spring Summer Baby Girl Princess Clothes',
  //     price: 999,
  //     rating: 4,
  //     img: '../../../../../assets/kids/10.jpg',
  //   },
  //   {
  //     title: 'Boys Chest Printed shirt ',
  //     description:
  //       'Boy Chest Printed Hooded Sweatshirt',
  //     price: 2000,
  //     rating: 4,
  //     img: '../../../../../assets/kids/11.jpg',
  //   },
  // ];


    
  toArray(param: number): any {
    return Array(param).fill(param);
  }

  value = 500;
  rangeFilter() {
    this.dup_kids_array = this.kidsProducts.filter(
      (product) => product.price < this.value
    );
  }

  fiterByText(value: string) {
    this.dup_kids_array = this.kidsProducts.filter((product) =>
      product.title.includes(value)
    );
  }
  resetAll() {
    this.dup_kids_array = [...this.kidsProducts];
    this.star4 = false;
    this.star3 = false;
    this.star2 = false;
  }

  addTocart(index: number) {
    this.productservice.addProductstoCart(this.kidsProducts[index]);
  }

  arr: number[] = new Array();
  sort(value: any) {
    console.log(value + ' from sort function');
    if (value.endsWith('high')) {
      this.dup_kids_array = this.kidsProducts.sort((a, b) => a.price - b.price);
    } else if (value.endsWith('low')) {
      this.dup_kids_array = this.kidsProducts.sort((a, b) => b.price - a.price);
    } else if (value == 'selected') {
      this.dup_kids_array = this.kidsProducts;
    }
  }

  rating(ratingValue: any) {
    if (this.arr.includes(ratingValue)) {
      this.arr = this.arr.filter((e) => e !== ratingValue);
      this.dup_kids_array = this.kidsProducts.filter((product) =>
        this.arr.includes(product.rating!)
      );
      if (this.arr.length == 0) {
        this.dup_kids_array = [...this.kidsProducts];
      }
    } else {
      this.arr.push(ratingValue);
      this.dup_kids_array = this.kidsProducts.filter((product) =>
        this.arr.includes(product.rating!)
      );
    }

    console.log(this.arr);
  }

  
}