import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;
  email: string;



  //dependency Injection
  //AuthService
  //FlashMessageService
  //Router
  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
              
             ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }
  
  //form submit to authenticate user with firebase using promise
  onSubmit(){
    this.authService.login(this.email, this.password)
    .then(res => {
      this.flashMessage.show('You Are now logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessage.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}
