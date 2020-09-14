import {Component, OnInit} from '@angular/core';
import {ServerService} from "./campgrounds/server.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public server: ServerService){}
  localToken: any = this.server.token;
  ngOnInit(

  ) {
}

onLogout(){
  this.server.logout();
}
}
