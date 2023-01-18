import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  status: number = -1;
  state: string = "";
  postId: number = 0;
  arData: any = [];
  enData: any = [];
  language: string = "en";
  currentPost:any;
  constructor(private Api: ApiService, private router: Router) { }
  AllPostsArray: any
  ngOnInit(): void {
    //document.querySelectorAll("[data-bs-dismiss='modal']").forEach((element:any)=>element.addEventListner('click',(this.status=-1)))
    this.GetAllPosts();
    if (localStorage.getItem('language') == null)
      localStorage.setItem('language', 'en');
    if(this.AllPostsArray = localStorage.getItem('language') == 'ar')
    {
      this.AllPostsArray = this.arData
      document.getElementById('inlineRadio2')?.click();
    } 
    else
    {
      this.AllPostsArray = this.enData
      document.getElementById('inlineRadio1')?.click();
    }
  }


  PostData = new FormGroup({
    title_en: new FormControl('', [Validators.required, Validators.minLength(3)]),
    title_ar: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content_en: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content_ar: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  toggleLanguage(element: any) {
    if (localStorage.getItem('language') == 'en' && element.value == 'ar') {
      localStorage.removeItem('language');
      this.AllPostsArray = this.arData;
      localStorage.setItem('language', 'ar');
      this.language = "ar";
    }
    else if (localStorage.getItem('language') == 'ar' && element.value == 'en') {
      localStorage.removeItem('language');
      localStorage.setItem('language', 'en');
      this.AllPostsArray = this.enData;
      this.language = "en";

    }
  }
  clearData()
  {
    this.arData.splice(0, this.AllPostsArray.length); /* clearing the posts array to fetch new data */
    this.enData.splice(0, this.AllPostsArray.length);
  }
  refresh() {
    // this.router.navigate([this.router.url]); //very useless we are navigating to the same route I don't know why it is the document requirements sir!
    //(Refresh V2)
    this.GetAllPosts();
    console.log("refreshed");
    console.log(this.AllPostsArray);
  }
  modalHandler() {
    console.log(this.state);
    const Form = new FormData();
    if(this.PostData.invalid)return;
    Form.append("title_ar", this.PostData.value.title_ar || "title");
    Form.append("title_en", this.PostData.value.title_en || "title");
    Form.append("content_ar", this.PostData.value.content_ar || "content");
    Form.append("content_en", this.PostData.value.content_en || "content");
    console.log(this.Api.userId);
    if (this.state == 'add') {
      Form.append("user_id", (this.Api.userId || 0).toString());
      this.AddPostData(Form);
    }
    else
      this.EditPost(Form);
    console.log('ok dd');
    (document.getElementsByClassName('btn-close')[0] as HTMLElement).click();
    
  }
  DeletePost(id: number) { //deleting a post by its
    this.Api.RemovePost(id).subscribe(
      res => {
        this.GetAllPosts();
      },
      (err) => console.log(err),
      () => {

      }
    )

  }
  resetModal() //resets the modal to the default state which is add + resets all form fields
  {
    this.state='add';
    this.PostData.reset();
  }
  FetchPost(id:number)
  {
    this.state='edit';
    this.postId=id;
    this.Api.GetPost(id).subscribe(res=>{
      /* this line serves as a mockup data comment it when appropriate response from the API is available*/ 
     // res={"id":59,"title":{"title_ar":"سلام","title_en":"asdas"},"content":{"content_ar":"عليكم","content_en":"asdasd"},"created_at":"18-09-2022"};
      
      console.log(res);
      this.PostData.setValue({title_en:res.data.post.title['title_en'],
      title_ar:res.data.post.title['title_ar'],
      content_en:res.data.post.content['content_en'],
      content_ar:res.data.post.content['content_ar'] });

    })
  }
  AddPostData(Form: FormData) {
    this.Api.AddPost(Form).subscribe(

      res => {
        console.log(res.data);
        this.enData.push({ "title": Form.get("title_en"), "content": Form.get('content_en'), "created_at": new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy') })
        this.arData.push({ "title": Form.get("title_ar"), "content": Form.get('content_ar'), "created_at": new Date().toLocaleDateString().replaceAll('/', '-') });
        this.fireAlert(1)

      },
      err => { console.log(err); this.fireAlert(0); },
      () => {


      }
    )
  }
  fireAlert(status: number) {
    this.status = status;
    setTimeout(() => this.status = -1, 4000);
  }
  EditPost(Form: FormData) {
    this.Api.EditPost(Form, this.postId).subscribe(
      res => {
        console.log(res);
        this.fireAlert(1);

      },
      err => { console.log(err); this.fireAlert(0); },
      () => {
        this.refresh();

      }
    )
  }
  GetAllPosts() {
    this.Api.AllPosts().subscribe(
      res => {
        this.clearData();
        console.log((res.data.posts[0]));
        for (let i = 0; i < res.data.posts.length; ++i) {
          this.arData.push({
            content: (res.data.posts[i].content)['content_ar'],
            title: (res.data.posts[i].title)['title_ar'], created_at: res.data.posts[i].created_at, id: res.data.posts[i].id
          });
          this.enData.push({
            content: (res.data.posts[i].content)['content_en'],
            title: (res.data.posts[i].title)['title_en'], created_at: res.data.posts[i].created_at, id: res.data.posts[i].id
          });
        }
        console.log(this.arData);
        console.log(this.AllPostsArray);
      }
      ,
      err => console.log(err),
      () => {

      }
    )
  }

}
