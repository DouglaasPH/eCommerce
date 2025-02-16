import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { WomenCollection } from "../../shared/women-collection/women-collection.component";
import { DealsOfTheMonth } from "../../shared/deals-of-the-month/deals-of-the-month.component";
import { SubscribeToOurNewslatter } from "../../shared/subscribe-to-our-newslatter/subscribe-to-our-newslatter.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule, DecimalPipe, NgFor } from "@angular/common";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { getProductData } from "../../requests/shopRequests";
import { ActivatedRoute, Router } from "@angular/router";
import { shoppingCartService } from "../../services/shoppingCart.service";
import { AuthGuard } from "../../guards/auth.guard";
import { checkLoggined } from "../../requests/loginRequests";
import { addItem } from "../../requests/shoppingCartRequests";

interface ProductInterface {
		id: number | undefined,
		description: string | undefined,
		mark: string | undefined,
		size_by_quantity: { [key: string]: string | number | undefined },
		price: number,
		discount_percentage: number,
		number_of_interest_free_installments: number,
        images_path: string[]
}

@Component({
    selector: 'product',
    standalone: true,
    imports: [CommonModule, NgFor, DecimalPipe, navBar, WomenCollection, DealsOfTheMonth, SubscribeToOurNewslatter, FooterBar],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductPage implements OnInit {
    @ViewChild('scrollDiv') scrollDiv!: ElementRef;
    
    constructor (private route: ActivatedRoute, private shoppingcartservice: shoppingCartService, private router: Router, private authguard: AuthGuard) {}
    product: ProductInterface = {
        id: undefined,
        description: undefined,
        mark: undefined,
        size_by_quantity: {},
        price: 0,
        discount_percentage: 0,
        number_of_interest_free_installments: 0,
        images_path: []

    };        
    mainImage: string = "";
    sizes: string[] | undefined = [];
    currentSize = "";
    currentQuantity = 1;
    addToCart = false;
    installments = "";

    async ngOnInit() {
        const productId = this.route.snapshot.paramMap.get('productId');
        this.product = await getProductData(productId);
        this.mainImage = this.product.images_path[0];

        const allSizes = Object.keys(this.product.size_by_quantity!);        
        allSizes?.map(size => {
            if (Number(this.product.size_by_quantity[size]) > 0) {
                this.sizes?.push(size);
            }
        })        
        this.currentSize = this.sizes![0];        
        this.installments = `${this.product.number_of_interest_free_installments}x of ${(this.product.discount_percentage !== 0 ? this.product.price * (1 - this.product.discount_percentage / 100) / this.product?.number_of_interest_free_installments : this.product?.price / this.product?.number_of_interest_free_installments)} interest free`;
    }

    increaseQuantity() {
        this.sizes?.map(size => {
            if (size === this.currentSize) {
                if (this.currentQuantity + 1 <= Number(this.product.size_by_quantity[size])) {
                    this.currentQuantity = this.currentQuantity + 1;
                }
            }
        })
    }

    decreaseQuantity() {
        if (this.currentQuantity > 1) {
            this.currentQuantity = this.currentQuantity - 1;
        } else return;
    }

    changeSize(switchTo: string) {
        this.currentSize = switchTo;
            this.currentQuantity = 1;        
    }

    async viewCart() {
        const loginStatus = await checkLoggined();

        if (loginStatus.isLogginned) {
            const itemData = {
                user_id: loginStatus.id,
                product_id: this.product.id,
                quantity: this.currentQuantity,
                size: this.currentSize
            };
            
            try {
                console.log(itemData)
                const response = await addItem(itemData);
                this.router.navigate(['/my-shopping-cart']);
            } catch (error) {
                console.log(error);
            }
        } else {
            this.router.navigate(['/login']);
        }
    }

    changeMainImage(image_path: string) {
        this.mainImage = image_path;
    }

    onScroll(condition: string) {
        if (condition === 'up') {
            if (this.scrollDiv.nativeElement.scrollTop + this.scrollDiv.nativeElement.clientHeight <= this.scrollDiv.nativeElement.scrollHeight) {
                this.scrollDiv.nativeElement.scrollTop -= 90;
            }
        } else {
            if (this.scrollDiv.nativeElement.scrollTop + this.scrollDiv.nativeElement.clientHeight < this.scrollDiv.nativeElement.scrollHeight) {
                this.scrollDiv.nativeElement.scrollTop += 90;
            }
        }


    }
}