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

}
