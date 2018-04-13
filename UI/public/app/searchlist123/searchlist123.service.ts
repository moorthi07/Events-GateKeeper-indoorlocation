import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { app_service } from '../app.service';
import { Searchlist123Model } from './searchlist123.model';

@Injectable()
export class Searchlist123Service {

    constructor(private http: Http, public gsvc: app_service) {

    }

    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private Searchlist123Url = this.gsvc.BaseURL + '/searchlist123'; //api/searchlist123S
    me;

    options() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        return new RequestOptions({ headers: headers, withCredentials: true });

    }


    resget() {
        return this.http.get(this.Searchlist123Url, this.options())
            .toPromise()
            .then((response) => {
                return <Searchlist123Model[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    // Get 
    query(query: any): Promise <Searchlist123Model[] > {
        const url = `${this.Searchlist123Url}?${query}`;
        return this.http.get(url, this.options())
            .toPromise()
            .then((response) => {
                return <Searchlist123Model[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    get(id: number): Promise <Searchlist123Model > {
        const url = `${this.Searchlist123Url
    } / ${id } `;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Searchlist123Model)
            .catch(this.handleError);
    }


    save(Searchlist123Model: Searchlist123Model): Promise<Searchlist123Model> {
        return this.http
            .post(this.Searchlist123Url, JSON.stringify(Searchlist123Model), this.options())
            .toPromise()
            .then(res => res.json() as Searchlist123Model)
            .catch(this.handleError);
    }
 

    delete(Searchlist123Model: Searchlist123Model): Promise<void> {
        const url = `${this.Searchlist123Url}/${Searchlist123Model.id}`;
    return this.http
        .delete(url, this.options())
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
}
 

    private handleError = (error: any): Promise<any> => {
        console.log("error...............",error);
    // this.gsvc.showToast('An error occurred');
    return Promise.reject(error.message || error);
}
}