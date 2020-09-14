import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {ServerService} from "../campgrounds/server.service";
import {Campground} from "../campground.model";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {isNullOrUndefined, isUndefined} from "util";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  campGr: Campground;
  isEdit: boolean;
  campForm: FormGroup;
  isNewSubmitted: boolean;
  isEditSubmitted: boolean;
  constructor( private ser: ServerService, private router: Router) { }

  ngOnInit() {
    this.isEdit=false;
    this.isNewSubmitted=false;
    this.isEditSubmitted=false;
    this.onEdit();
    if(isNullOrUndefined(this.ser.token)){
      this.router.navigate(['/login']);
    }
  }

  onSubmitForm(va: NgForm) {
    console.log(va);
    this.campGr = new Campground('1', va.value.username, va.value.image, va.value.description);
    this.ser.addCamp(this.campGr).subscribe();
    this.isNewSubmitted = true;
  }

  onSubmitEditForm(va: NgForm) {
    console.log(this.campForm.getRawValue());
    const x = this.campForm.getRawValue();
    var asd ={campground:{name: x.name, image: x.image, description:x.description}};
    this.ser.submitEditCamp(asd, this.campGr.id).subscribe();
    this.isEditSubmitted=true;
  }

  onEdit() {
    this.campGr = this.ser.editCampResp();
    if(!isNullOrUndefined(this.campGr)){
    this.isEdit=true;
      console.log(this.campGr.name);
      this.campForm= new FormGroup({
        'name': new FormControl(this.campGr.name),
        'image': new FormControl(this.campGr.image),
        'description' : new FormControl(this.campGr.description)
      });
    }
  }
}
