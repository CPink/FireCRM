import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/Client';



@Injectable()
export class ClientService {

//properties
clientsCollection: AngularFirestoreCollection<Client>;
clientDoc: AngularFirestoreDocument<Client>;
clients: Observable<Client[]>;
client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));

  }

  getClients(): Observable<Client[]> {
    //get clients with id

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.clients = this.clientsCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
         data.id = action.payload.doc.id;
        return data;
      });
    });
    
    return this.clients;
  }

  //add new client from from submition
  newClient(client: Client){
    this.clientsCollection.add(client);
  }

  //get client for client-details
  getClient(id: string): Observable<Client>{
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    });

    return this.client;
  }

  //update client balance from the client details component.html
  updateClient(client: Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

}
