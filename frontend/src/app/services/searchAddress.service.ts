import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class searchAddress {
    private apiUrl = 'https://viacep.com.br/ws/';

    constructor(private http: HttpClient) {
    }

    searchCep(cep: string) {
        return this.http.get<any>(`${this.apiUrl}${cep}/json/`);
    }
};