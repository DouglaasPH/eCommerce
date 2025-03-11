import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule, DecimalPipe, NgFor } from "@angular/common";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { getProductData } from "../../requests/forShop";
import { ActivatedRoute, Router } from "@angular/router";
import { checkLoggined } from "../../requests/forLogin";
import { addItem } from "../../requests/forShoppingCart";
import { getAllFavoritesFromUser, updateFavoritesFromUser } from "../../requests/forFavorites";

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
    imports: [CommonModule, NgFor, DecimalPipe, navBar, FooterBar],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss', './media-queries-for-product.component.scss'],
})
export class ProductPage implements OnInit {
    @ViewChild('scrollDiv') scrollDiv!: ElementRef;
    
    constructor (private route: ActivatedRoute, private router: Router) {}
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
    productIsFavorite = false;
    currentProductId = 0;

    async ngOnInit() {
        this.currentProductId = Number(this.route.snapshot.paramMap.get('productId'));
        this.checkIfTheProductIsFavorite();
        this.product = await getProductData(this.currentProductId);
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
                const response = await addItem(itemData);
                this.router.navigate(['/shopping-cart']);
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

    async checkIfTheProductIsFavorite() {
        const checkLogin = await checkLoggined();
        
        if (checkLogin.isLogginned) {
            try {
                const allFavoriteProductIDs = await getAllFavoritesFromUser(checkLogin.id);                
                const isArray = JSON.parse(allFavoriteProductIDs.favorites);
                if (isArray.includes(this.currentProductId)) {
                    this.productIsFavorite = true;
                } else {
                    this.productIsFavorite = false;
                }
                console.log(this.currentProductId, allFavoriteProductIDs)
            } catch (error) {
                console.log(error);
            }
        } else {
            this.productIsFavorite = false;            
        }
    }

    async onButtonFavorite() {
        const checkLogin = await checkLoggined();

        if (checkLogin.isLogginned) {
            const allFavoriteProductIDs = await getAllFavoritesFromUser(checkLogin.id);                
            const isArray = JSON.parse(allFavoriteProductIDs.favorites);

            if (this.productIsFavorite) {
                const newFavoriteListId = isArray.filter((productId: number) => productId !== this.currentProductId);
                await updateFavoritesFromUser(newFavoriteListId, checkLogin.id);
                this.productIsFavorite = false;
            } else {
                const newFavoriteListId = [...isArray, this.currentProductId];
                await updateFavoritesFromUser(newFavoriteListId, checkLogin.id);
                this.productIsFavorite = true;                
            }
        }
    }

    redirectToLogin() {
        this.router.navigate(['login/sign-in']);
    }
}