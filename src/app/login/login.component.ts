import { Component, OnInit } from '@angular/core';
import {User} from "../user.model";
import {Router} from "@angular/router";
import {ServerService} from "../campgrounds/server.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  alert: boolean = false;
  error: any;

  constructor(private service: ServerService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin(uInfo: NgForm)
  {
    this.user=new User(uInfo.value.username, uInfo.value.password);
    this.service.login(this.user).subscribe((response: any)=> {
      this.router.navigate(['/campgrounds']);
    },
      (error: Error)=>{
      this.router.navigate(['/login']);
      this.error = error;
      this.alert = true;
      });
  }
}
