import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }


  //Authenticate user with firebase and log them in 
  login(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData => resolve(userData),
       err => reject(err))
    });
  }

  //check to make sure user is loged in if they are route to dashboard
  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  //register new user with firebase
  register(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(userData => resolve(userData),
       err => reject(err))
    });
  }
}
