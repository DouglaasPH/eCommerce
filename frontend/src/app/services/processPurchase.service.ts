import { Injectable} from "@angular/core";
import { getAllAddress } from "../requests/addressRequest";
import { getAllUserItem } from "../requests/shoppingCartRequests";
import { getProductData } from "../requests/shopRequests";
import { checkLoggined } from "../requests/loginRequests";

interface Product {
    id: number;
    description: string;
    mark: string;
    price: number;
    images_path: string[];
    size_by_quantity: { [key: string]: string }
    discount_percentage: number
}

interface userItem {
    product_id: number
    quantity: number
}

@Injectable({
    providedIn: 'root',
})
export class ProcessPurchaseService {
    shoppingCart: any[] = [];
    productData: Product[] = [];
    allAddress: any[] = [];
    user_id = -1;
    allProductIds: number[] = [];

    chosenAddress = -1;

    async updateProcessPurchase() {
        const response_user_id = await checkLoggined();
        this.user_id = await response_user_id.id;

        const response_all_address = await getAllAddress(this.user_id);
        this.allAddress = response_all_address;           

        const response: userItem[] = await getAllUserItem(this.user_id); 
        this.shoppingCart = response;
        
        if (response.length > 0) {
            response.forEach(item => {
                if (!this.allProductIds.includes(item.product_id)) {
                    this.allProductIds.push(item.product_id);
                }
            })
            
            this.allProductIds.forEach(async product_id => {
                const response: Product = await getProductData(product_id);
                this.productData[product_id] = response;
            })
        }
    }
    async getAllProperties() {
        await this.updateProcessPurchase();
        return {
            shoppingCart: this.shoppingCart,
            productData: this.productData,
            allAddress: this.allAddress,
            user_id: this.user_id,
        };
    }
    
    // check if there is an item in the shopping cart
    async checkShoppingCart() {
        await this.updateProcessPurchase();

        if (this.shoppingCart.length > 0) {
            return true
        } else return false;
    }
};