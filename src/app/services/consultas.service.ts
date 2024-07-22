import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import {forkJoin, Observable, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';
import Product from '../interfaces/product.interface';
import Clubs from '../interfaces/clubs.interface';
import firebase from 'firebase/compat/app';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor(private firestore: AngularFirestore) {}

  obtenerProductos(): Observable<Product[]> {
    const simulacionesRef = this.firestore.collection<Product>('product');
    return simulacionesRef.get().pipe(
      map((querySnapshot: QuerySnapshot<Product>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }

  obtenerClubs(): Observable<Clubs[]> {
    const clubsRef = this.firestore.collection<Clubs>('clubs');
    return clubsRef.get().pipe(
      map((querySnapshot: QuerySnapshot<Clubs>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }



}
