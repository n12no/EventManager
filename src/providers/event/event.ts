
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
  public eventListRef: firebase.database.Reference;

  constructor() {
    console.log('Hello EventProvider');
    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
        this.eventListRef = firebase
        .database()
        .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }
  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): firebase.database.ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost *1,
      revenue: eventCost * -1
    });
  }
  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }
  getEventDetail(eventId: string): firebase.database.Reference {
    return this.eventListRef.child(eventId);
  }
  addGuest(guestName: string, eventId: string, eventPrice: number): PromiseLike<any> {
    return this.eventListRef.child(`${eventId}/guestList`).push({guestName})
    .then(newGuest => {
      this.eventListRef.child(eventId).transaction(event => {
        event.revenue += eventPrice;
        return event;
      });
    });
  }
}
