import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LoaderService {

    private static loaderEnabled: boolean;
    
    constructor() {}

    get loaderEnabled() {
        return LoaderService.loaderEnabled;
    }

    public showLoader() {
        LoaderService.loaderEnabled = true;
    }
    public hideLoader() {
        LoaderService.loaderEnabled = false;
    }
}