import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private firestore: AngularFirestore) {}

  getUserPayments(userId: string): Observable<any[]> {
    const paymentsRef = this.firestore.collection<any>('orders', ref => ref.where('userId', '==', userId));
    return paymentsRef.get().pipe(
      map((querySnapshot: QuerySnapshot<any>) => {
        return querySnapshot.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
      })
    );
  }
}
