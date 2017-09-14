import { Injectable } from '@angular/core';
import {  Response,Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//Injectable service
@Injectable() 
export class PetService {
    //ToDo: Set as a configurable value
    private serviceUri: string = 'http://agl-developer-test.azurewebsites.net/people.json?callback=JSONP_CALLBACK';

    //Injecting JsonP
    constructor( private jsonp:Jsonp){        
    } 
    //Observable for data stream
    getpetOwnerData() : Observable<any> {
        return this.jsonp.get(this.serviceUri)
             .map((resp: Response) => <any> resp.json())
             .catch(this.errorHandler);             
    };
    
    //return any error while fetching data
    private errorHandler(error: any) {
        return Observable.throw(error.json().error || 'Server error');
  }
}