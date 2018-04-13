import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { app_service } from '../app.service';
import { SearchlistModel } from './searchlist.model';

@Injectable()
export class SearchlistService {

    constructor(private http: Http, public gsvc: app_service) {

    }

    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private SearchlistUrl = this.gsvc.BaseURL + '/searchlist'; //api/searchlists
    me;

    options() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        return new RequestOptions({ headers: headers, withCredentials: true });

    }


    resget() {
        return this.http.get(this.SearchlistUrl, this.options())
            .toPromise()
            .then((response) => {
                return <SearchlistModel[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    // Get 
    query(query: any): Promise <SearchlistModel[] > {
        const url = `${this.SearchlistUrl}?${query}`;
        return this.http.get(url, this.options())
            .toPromise()
            .then((response) => {
                return <SearchlistModel[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    get(id: number): Promise <SearchlistModel > {
        const url = `${this.SearchlistUrl
    } / ${id } `;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as SearchlistModel)
            .catch(this.handleError);
    }


    save(SearchlistModel: SearchlistModel): Promise<SearchlistModel> {
        return this.http
            .post(this.SearchlistUrl, JSON.stringify(SearchlistModel), this.options())
            .toPromise()
            .then(res => res.json() as SearchlistModel)
            .catch(this.handleError);
    }
 

    delete(SearchlistModel: SearchlistModel): Promise<void> {
        const url = `${this.SearchlistUrl}/${SearchlistModel.id}`;
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