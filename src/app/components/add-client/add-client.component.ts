import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {


  //properties
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') from: any;

//added FlashMessagesService as a dependency to constructor (dependency injection)
  constructor(private flashMessage: FlashMessagesService,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
  }

  /*method to submit client-add form takes an object with 2 properties 
  value and valid which is typed to an object where value is typed to the Client
  and valid is typed to a boolean
  */
  onSubmit({value, valid}: {value: Client, valid: boolean}){

    //check to make sure disableBalanceOnAdd is true
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){
      //show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      //add new client
      this.clientService.newClient(value);
      //show message
      this.flashMessage.show('New Client Added', {
        cssClass: 'alert-success', timeout: 4000
      });
      //redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}
