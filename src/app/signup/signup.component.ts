import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../user.model";
import {ServerService} from "../campgrounds/server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  constructor(private serv: ServerService, private router: Router) { }


  ngOnInit() {
  }

  onClickSubmit(sInfo: NgForm){
    this.user=new User(sInfo.value.username, sInfo.value.password);
    this.serv.signUp(this.user).subscribe();
    this.router.navigate(['/login']);
  }
}
