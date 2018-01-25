import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';




@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  //properties
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  //Injected Dependiencies
  //ClientService
  //Router
  //ActivatedRoute
  //FlashMessage

  constructor(private clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService) { }


  ngOnInit() {
    //get id from url 
    this.id = this.route.snapshot.params['id'];

    //get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(this.client != null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
      }

      this.client = client;
    });
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick(){
    if(confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client Removed', {
        cssClass: 'alert-success', timeout: 4000
      });

      this.router.navigate(['/']);
    }
  }
}
