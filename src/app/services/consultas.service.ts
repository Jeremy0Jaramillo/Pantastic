import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import {forkJoin, Observable, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';
import Product from '../interfaces/product.interface';
import firebase from 'firebase/compat/app';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

import User from "../interfaces/user.interface";

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


  obtenerProductoPorId(id: string): Observable<Product | undefined> {
    const docRef = this.firestore.collection<Product>('product').doc(id);
    return docRef.get().pipe(
      map(doc => doc.exists ? doc.data() as Product : undefined)
    );
  }


}
