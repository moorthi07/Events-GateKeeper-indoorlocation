import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { app_service } from '../app.service';
import { SearchkeyModel } from './searchkey.model';

@Injectable()
export class SearchkeyService {

    constructor(private http: Http, public gsvc: app_service) {

    }

    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private SearchkeyUrl = this.gsvc.BaseURL + '/searchkey'; //api/searchkeys
    me;

    options() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        return new RequestOptions({ headers: headers, withCredentials: true });

    }


    resget() {
        return this.http.get(this.SearchkeyUrl, this.options())
            .toPromise()
            .then((response) => {
                return <SearchkeyModel[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    // Get 
    query(query: any): Promise <SearchkeyModel[] > {
        const url = `${this.SearchkeyUrl}?${query}`;
        return this.http.get(url, this.options())
            .toPromise()
            .then((response) => {
                return <SearchkeyModel[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    get(id: number): Promise <SearchkeyModel > {
        const url = `${this.SearchkeyUrl
    } / ${id } `;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as SearchkeyModel)
            .catch(this.handleError);
    }


    save(SearchkeyModel: SearchkeyModel): Promise<SearchkeyModel> {
        return this.http
            .post(this.SearchkeyUrl, JSON.stringify(SearchkeyModel), this.options())
            .toPromise()
            .then(res => res.json() as SearchkeyModel)
            .catch(this.handleError);
    }
 

    delete(SearchkeyModel: SearchkeyModel): Promise<void> {
        const url = `${this.SearchkeyUrl}/${SearchkeyModel.id}`;
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