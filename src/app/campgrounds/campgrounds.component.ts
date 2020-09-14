import { Component, OnInit } from '@angular/core';
import {Campground} from "../campground.model";
import {ServerService} from "./server.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";
import {isNull, isNullOrUndefined} from "util";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
  selector: 'app-campgrounds',
  templateUrl: './campgrounds.component.html',
  styleUrls: ['./campgrounds.component.css']
})
export class CampgroundsComponent implements OnInit {

  campgrounds : Campground[];
  campground: Campground;
  isCampNull: boolean = false;
  elem : boolean = false;
  isDeleteSubmitted: boolean;

  constructor(private serverService: ServerService, private router: Router) {}


  ngOnInit() {
    this.onGet();
    this.isDeleteSubmitted=false;
  }

  onGet() {
    this.serverService.getServers()
      .subscribe(
        (campgrounds: Campground[])=> {

          this.campgrounds = campgrounds;
          if(this.campgrounds.length===0){
            this.isCampNull = true;
          }
        }
      );
  }

  setFalse()
  {
    this.elem=false;
    this.isDeleteSubmitted=false;
    this.onGet();
    this.router.navigate(["campgrounds"]);
  }

  onClick(va: any){
    //console.log(va);
        this.setCampGround(va);
        this.elem=true;
    }

    onDelete(bit: any) {
    if(isNullOrUndefined(this.serverService.token)){
      this.router.navigate(['/login']);
    }
      this.setCampGround(bit);
      this.serverService.deleteCampground(this.campground.id).subscribe();
      this.isDeleteSubmitted=true;
    }

    onEditCampground(cam: any) {
        this.setCampGround(cam);
        this.serverService.editCamp(this.campground);
    }

    setCampGround(yo: any) {
      for (let camp of this.campgrounds) {
        if (camp.name === yo) {
          this.campground = camp;
        }
      }
    }
}
