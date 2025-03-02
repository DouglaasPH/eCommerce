import { CommonModule, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { checkLoggined } from "../../../../requests/forLogin";
import { getAllFavoritesFromUser, getAllProductFavorite, updateFavoritesFromUser } from "../../../../requests/forFavorites";

interface ProductInterface {
		id: number | undefined,
		description: string | undefined,
		mark: string | undefined,
        price: number,
		discount_percentage: number,
		number_of_interest_free_installments: number,
        images_path: string
}

@Component({
    selector: 'favorites',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss',
})
export class Favorites implements OnInit {
    constructor (private location: Location) {}

    allFavoriteProducts: ProductInterface[] = [];

    async ngOnInit(): Promise<void> {
        const checkLogginned_response = await checkLoggined();
        const allFavoriteProductId_response = await getAllFavoritesFromUser(checkLogginned_response.id);
        const isArray = JSON.parse(allFavoriteProductId_response.favorites);
        isArray.forEach(async (product_id: number) => {
            const product_response = await getAllProductFavorite(product_id);
            this.allFavoriteProducts.push(product_response);
        });
    }

    onBuy(product_id: number) {
        this.location.replaceState('shop/product/' + product_id);
        window.location.reload();
    }
    
    async onUnfavorite(product: ProductInterface) {
        const checkLogginned_response = await checkLoggined();        
        const newFavoriteProduct = this.allFavoriteProducts.filter(currenttProduct => currenttProduct !== product);
        const newFavoriteListId = newFavoriteProduct.map(currentProduct => currentProduct.id);
        await updateFavoritesFromUser(newFavoriteListId, checkLogginned_response.id);
        this.allFavoriteProducts = newFavoriteProduct;
    }

    onShopping() {
        this.location.replaceState('/shop');
        window.location.reload();
    }    
}