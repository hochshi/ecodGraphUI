import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CyGraph} from '../models/cy.graph';
import {Observable} from 'rxjs';
import {IDomainAlignment} from '../models/domain.alignment';

@Injectable()
export class EcodService {
  private baseUrl = 'app/ecod';  // remark: URL to web api
  private algnUrl = 'app/alignments';
  constructor(private http: Http) { }

  getAlignments(): Observable<IDomainAlignment[]> {
    return this.http.get(this.algnUrl)
      .map(this.extractAllData)
      .catch(this.handleError);
  }

  getGraph(): Observable<CyGraph> {
    return this.http.get(this.baseUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractAllData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data[0] || {};
  }

  private handleError(error: Response | any) {
    // in a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
