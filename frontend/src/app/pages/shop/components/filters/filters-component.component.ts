import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { getAllFilterOptions, getAllFilters, getFiltersWithSelectedFilters } from "../../../../requests/shopRequests";
import { Router } from "@angular/router";

@Component({
    selector: 'filters',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './filters-component.component.html',
    styleUrl: './filters-component.component.scss',
})
export class FiltersComponent implements OnInit {
    constructor(private router: Router) { }

    allFilters: string[] = [];
    allFilterOptions: object = {}; 
    myFilters: { [key: string]: string } = {};
    filterStatus: { [key: string]: boolean } = {};
    filtersName: { [key: string]: string } = {};

    async ngOnInit() {
        try {
            this.allFilters = await getAllFilters();
            this.allFilterOptions = await getAllFilterOptions(this.allFilters);
            this.allFilters.map(filter => {
                this.myFilters = {
                    ...this.myFilters,
                    [filter]: ''
                };
                this.filterStatus = {
                    ...this.filterStatus,
                    [filter]: false,
                }

                if (filter.indexOf('_') !== -1) {
                    const filterName = filter.charAt(0).toUpperCase() + filter.slice(1, filter.indexOf('_')) + " " + filter.charAt(filter.indexOf('_') + 1).toUpperCase() + filter.slice(filter.indexOf('_') + 2, filter.length);
                    this.filtersName = {
                        ...this.filtersName,
                        [filter]: filterName
                    };
                } else {
                    const filterName = filter.charAt(0).toUpperCase() + filter.slice(1, filter.length);
                    this.filtersName = {
                        ...this.filtersName,
                        [filter]: filterName
                    };
                }
            })
        } catch (error) {
            window.location.reload();
        }

        this.backToTheShoppingPath();
    }
    
    backToTheShoppingPath() {
        const path = this.router.url;

        if (path !== '/shop') {
            const paramsString = path.split('?')[1];
            const searchParams = new URLSearchParams(paramsString);
            const paramsObject: Record<string, string> = {};
            searchParams.forEach((value, key) => {
                paramsObject[key] = value;
            });
            this.myFilters = {
                ...paramsObject,
            };

            this.allFilters.forEach(filter => {
                if (this.myFilters[filter] !== '') {
                    this.filterStatus[filter] = true;
                }
            })
        } else return;
    }

    changeNewFilter(key: keyof { [key: string]: string } | string, value: string) {        
        this.filterStatus[key] = !this.filterStatus[key];

        if (this.myFilters[key] === '') {
            this.myFilters = {
                ...this.myFilters,
                [key]: value,
            };          
        } else {            
            this.myFilters = {
                ...this.myFilters,
                [key]: '',
            };                        
        }

        this.router.navigate([], {
            queryParams: this.myFilters,
        });        

        this.newOptions();
    }

    async newOptions() {
        const response = await getFiltersWithSelectedFilters(this.myFilters);   
        this.allFilterOptions = response;
        const objKeys = Object.keys(response);
        const objKeysB = Object.keys(this.myFilters);
        objKeysB.filter(key => {
            if (!objKeys.includes(key)) {
                this.allFilterOptions = {
                    ...this.allFilterOptions,
                    [key]: [this.myFilters[key]],
                };
            }
        })
    }
}