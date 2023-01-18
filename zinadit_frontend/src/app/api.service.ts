import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 public userId:Number=0;
 public userName:string=""
 public isLoggedIn:boolean=false;
  constructor(private http:HttpClient,private _router:Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

//check some condition  
if (this.isLoggedIn==true)  {
return true;
}
this._router.navigate(['/'])
return false;
}
  LoginApi(Data:any):Observable<any>{
    return  this.http.post(`http://localhost:8000/api/login`, Data)
        }
  EditPost(Data:any,id:any):Observable<any>{return this.http.post(`http://localhost:8000/api/post/${id}`, Data)}      
  AddPost(Data: any): Observable<any> {return this.http.post(`http://localhost:8000/api/posts`, Data)}
  RemovePost(id: any): Observable<any> {return this.http.delete(`http://localhost:8000/api/post/${id}`)}
  AllPosts(): Observable<any> {return this.http.get(`http://localhost:8000/api/posts`)}
  GetPost(id:any): Observable<any> {return this.http.get(`http://localhost:8000/api/posts/${id}`)}
  
  
}
