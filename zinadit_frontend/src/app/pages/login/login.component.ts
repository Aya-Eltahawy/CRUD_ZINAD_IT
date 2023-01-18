import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginAttempts:number =0;

  constructor(private Api:ApiService , private router:Router) { }
  ngOnInit(): void {
  }
  
  LoginData = new FormGroup({email:new FormControl('', Validators.required) ,
password:new FormControl('', Validators.required) ,
})

Login(){
  const Form = new FormData();
  Form.append("email" , this.LoginData.value.email ||"user@example.com");
  Form.append("password" , this.LoginData.value.password ||"password");
this.Api.LoginApi(Form).subscribe(

  res=>{
    this.loginAttempts++;
    console.log(this.loginAttempts);
    if(res.status){
   this.Api.userId=res.data.data.id;
   this.Api.isLoggedIn=true;
   this.Api.userName=res.data.data.name;
   this.router.navigate(['/news']);
    }
},
  err=>console.log(err),
  ()=>{
  ;
    
  }
)
}


}
