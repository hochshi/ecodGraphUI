import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {CyGraph} from '../models/cy.graph';

@Injectable()
export class EcodService {
  private baseUrl = 'app/ecod';  // remark: URL to web api
  constructor(private http: Http) { }

  getGraph(): Promise<CyGraph> {
    return this.http.get(this.baseUrl)
      .toPromise()
      .then(response => response.json().data[0] as CyGraph)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // getHeroes(): Promise<CyGraph> {
  //   return this.http.get(this.heroesUrl)
  //     .toPromise()
  //     .then(response => response.json().data as CyGraph)
  //     .catch(this.handleError);
  // }
  // getHero(id: number): Promise<CyGraph> {
  //   return this.getHeroes()
  //     .then(heroes => heroes.find(hero => hero.id === id));
  // }
  // delete(id: number): Promise<void> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  // create(name: string): Promise<Hero> {
  //   return this.http
  //     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }
  // update(hero: Hero): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(hero), {headers: this.headers})
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }

}
