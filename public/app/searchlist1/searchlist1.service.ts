import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { app_service } from '../app.service';
import { Searchlist1Model } from './searchlist1.model';

@Injectable()
export class Searchlist1Service {

    constructor(private http: Http, public gsvc: app_service) {

    }

    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private Searchlist1Url = this.gsvc.BaseURL + '/searchlist1'; //api/searchlist1S
    me;

    options() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        return new RequestOptions({ headers: headers, withCredentials: true });

    }


    resget() {
        return this.http.get(this.Searchlist1Url, this.options())
            .toPromise()
            .then((response) => {
                return <Searchlist1Model[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    // Get 
    query(query: any): Promise <Searchlist1Model[] > {
        const url = `${this.Searchlist1Url}?${query}`;
        return this.http.get(url, this.options())
            .toPromise()
            .then((response) => {
                return <Searchlist1Model[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    get(id: number): Promise <Searchlist1Model > {
        const url = `${this.Searchlist1Url
    } / ${id } `;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Searchlist1Model)
            .catch(this.handleError);
    }


    save(Searchlist1Model: Searchlist1Model): Promise<Searchlist1Model> {
        return this.http
            .post(this.Searchlist1Url, JSON.stringify(Searchlist1Model), this.options())
            .toPromise()
            .then(res => res.json() as Searchlist1Model)
            .catch(this.handleError);
    }
 

    delete(Searchlist1Model: Searchlist1Model): Promise<void> {
        const url = `${this.Searchlist1Url}/${Searchlist1Model.id}`;
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