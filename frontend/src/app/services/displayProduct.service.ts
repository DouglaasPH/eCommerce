import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class displayProductService {
    private productId: number | undefined = undefined;

    setProductId(data: number | undefined) {
        this.productId = data;
    }
}