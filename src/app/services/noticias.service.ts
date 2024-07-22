import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import News from '../interfaces/news.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  constructor(private firestore: AngularFirestore) {}

  obtenerNoticiasGenerales(): Observable<News[]> {
    const newsRef = this.firestore.collection<News>('news', ref => ref.where('clubId', '==', "null"));
    return newsRef.get().pipe(
      map((querySnapshot: QuerySnapshot<News>) => {
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as News;
          data.id = doc.id;
          return data;
        });
      })
    );
  }

  obtenerNoticiasPorClub(clubId: string): Observable<News[]> {
    const newsRef = this.firestore.collection<News>('news', ref => ref.where('clubId', '==', clubId));
    return newsRef.get().pipe(
      map((querySnapshot: QuerySnapshot<News>) => {
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as News;
          data.id = doc.id;
          return data;
        });
      })
    );
  }
}
