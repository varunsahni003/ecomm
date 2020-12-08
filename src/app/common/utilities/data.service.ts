import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
	providedIn: 'root',
})

export class DataService {
    dataObj = {};
    selectedProduct: Product;
    @Output() dataServiceObserver: EventEmitter<any> = new EventEmitter();

    setChatData(data) {
        this.dataObj = data;
        this.dataServiceObserver.emit(this.dataObj);
        return this.dataServiceObserver;
    }
}