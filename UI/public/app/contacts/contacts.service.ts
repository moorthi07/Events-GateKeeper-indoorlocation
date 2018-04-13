import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { app_service } from '../app.service';
import { ContactsModel } from './contacts.model';

@Injectable()
export class ContactsService {

    constructor(private http: Http, public gsvc: app_service) {

    }

    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private ContactsUrl = this.gsvc.BaseURL + '/contacts'; //api/contacts
    me;

    options() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        return new RequestOptions({ headers: headers, withCredentials: true });

    }


    resget() {
        return this.http.get(this.ContactsUrl, this.options())
            .toPromise()
            .then((response) => {
                return <ContactsModel[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    // Get 
    query(query: any): Promise <ContactsModel[] > {
        const url = `${this.ContactsUrl}?${query}`;
        return this.http.get(url, this.options())
            .toPromise()
            .then((response) => {
                return <ContactsModel[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    get(id: number): Promise <ContactsModel > {
        const url = `${this.ContactsUrl
    } / ${id } `;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as ContactsModel)
            .catch(this.handleError);
    }


    save(ContactsModel: ContactsModel): Promise<ContactsModel> {
        return this.http
            .post(this.ContactsUrl, JSON.stringify(ContactsModel), this.options())
            .toPromise()
            .then(res => res.json() as ContactsModel)
            .catch(this.handleError);
    }
 

    delete(ContactsModel: ContactsModel): Promise<void> {
        const url = `${this.ContactsUrl}/${ContactsModel.id}`;
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