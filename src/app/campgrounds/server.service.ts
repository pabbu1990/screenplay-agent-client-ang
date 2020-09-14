import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Campground} from "../campground.model";
import {isUndefined} from "util";
import {Router} from "@angular/router";

@Injectable()
export class ServerService {
  private campgrounds: Campground[] = [];
  campground: Campground;
  token: any;
  //authHeaders = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.token});
  normalHeaders = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http, private router: Router) {}
  // storeServers(servers: any[]) {
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json',
  //   //   servers,
  //   //   {headers: headers});
  //   return this.http.put('https://udemy-ng-http.firebaseio.com/data.json',
  //     servers,
  //     {headers: headers});
  // }
  getServers() {
    return this.http.get('https://serene-tundra-49862.herokuapp.com/campgrounds')
      .map(
        (response: Response) => {
          const me = response.json().campgrounds;
          let realCampgrounds: Campground[] = [];
          for (let campground of me) {
            realCampgrounds.push(new Campground(
              campground._id,
              campground.name,
              campground.image,
              campground.description)
            );
          }

            return realCampgrounds;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong. Could not get campgrounds');
        }
      );
  }

  addCamp(cam: any) {
    console.log('body'+JSON.stringify(cam));
    console.log(this.getAuthHeader());
    return this.http.post('https://serene-tundra-49862.herokuapp.com/campgrounds', JSON.stringify(cam), this.getAuthHeader()).
    map((response: Response)=> {
      return response;
    })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong. Could not add the campground');
        }
      );
  }

  submitEditCamp(cam: any, heada: any) {
    console.log('path'+JSON.stringify(heada));
    console.log('body'+JSON.stringify(cam));

    //console.log('req header'+this.authHeaders.toJSON());
    return this.http.put('https://serene-tundra-49862.herokuapp.com/campgrounds/'+heada, JSON.stringify(cam), this.getAuthHeader()).
    map((response: Response)=> {
      return response;
    })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong. Edit failed');
        }
      );
  }

  deleteCampground(campId: any) {
    return this.http.delete('https://serene-tundra-49862.herokuapp.com/campgrounds/'+campId).
    map((response: Response)=> {
      return response;
    })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong. Delete failed');
        }
      );
  }

  editCamp(camp: any) {
  this.campground = camp;
  this.router.navigate(["new"]);

  }

  editCampResp() {
    setTimeout(()=>{this.campground = null, 4000})
    return this.campground;

  }

  signUp(userInf: any) {
    return this.http.post('https://serene-tundra-49862.herokuapp.com/signup', JSON.stringify(userInf), {headers: this.normalHeaders}).
    map((response: Response)=> {
      return response;
    })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong. Signup failed');
        }
      );
  }

  login(userInf: any) {
    console.log(JSON.stringify(userInf));
    return this.http.post('https://serene-tundra-49862.herokuapp.com/login', JSON.stringify(userInf), {headers: this.normalHeaders}).
    map((response: Response)=> {
      console.log("logintoken"+response.json());
      this.token=response.json();
      return response.json();
    })
      .catch(
        (error: Response) => {
          return Observable.throw('Login Failed. Either username or password is wrong');
        }
      );
  }

  logout() {
  this.token=null;
  }

  getAuthHeader(){
    let headers = new Headers();
    console.log('bitch?'+this.token);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.token);

    let options = new RequestOptions ({ headers: headers });
    //console.log('mnigga my nigga'+options);
    return options;
  }

}
