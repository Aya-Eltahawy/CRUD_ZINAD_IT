import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-logincom',
  templateUrl: './logincom.component.html',
  styleUrls: ['./logincom.component.css']
})
export class LogincomComponent implements OnInit {

  constructor(private Api:ApiService , private router:Router) { }

  ngOnInit(): void {
  }
  
  
  Login(){
    const Form = new FormData();
    Form.append("email" , "user@example.com");
    Form.append("password" , "password");
    
  this.Api.LoginApi(Form).subscribe(
  
    res=>{
      console.log(res.data)
     
  },
    err=>console.log(err),
    ()=>{
    this.router.navigate(['/news']);
      
    }
  )
  }
}
