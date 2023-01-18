import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public Api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    console.log("logging out");
    this.Api.isLoggedIn=false;
    this.router.navigate(['/']);
  }

}
