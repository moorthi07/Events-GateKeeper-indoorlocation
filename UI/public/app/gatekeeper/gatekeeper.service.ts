import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { app_service } from '../app.service';
import { ContactsModel } from './gatekeeper.model';

@Injectable()
export class GatekeeperService {

    constructor(private http: Http, public gsvc: app_service) {

    }

    private gatekeeperurl="http://ec2-18-184-32-172.eu-central-1.compute.amazonaws.com:8088";
    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private ContactsUrl = this.gatekeeperurl + '/events/desc'; //api/contacts
    me;

    options() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        return new RequestOptions({ headers: headers, withCredentials: true });

    }


    resget() {
        const events= this.gatekeeperurl + '/events/tags';
        // return this.http.get(this.ContactsUrl, this.options())
        return this.http.get(events, this.options())
            .toPromise()
            .then((response) => {
                return <ContactsModel[] > response.json();
            })
            .catch((res: Response) => this.handleError(res));
    }


    // Get 
    query(query: any): Promise <ContactsModel[] > {
        // const events= this.gsvc.BaseURL + 'assets/gatekeeper.json';
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