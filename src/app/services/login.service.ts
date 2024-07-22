import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Observable, BehaviorSubject, from} from 'rxjs';
import User from '../interfaces/user.interface';
import firebase from 'firebase/compat/app';
import Affiliation from "../interfaces/affiliation.interface";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private currentUserId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loggedIn.next(true);
        this.currentUser.next({
          id: user.uid,
          firstName: user.displayName ? user.displayName.split(' ')[0] : '',
          lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
          email: user.email || ''
        });
        this.currentUserId.next(user.uid);
      } else {
        this.loggedIn.next(false);
        this.currentUser.next(null);
        this.currentUserId.next(null);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            this.loggedIn.next(true);
            this.currentUser.next({
              id: user.uid,
              firstName: user.displayName ? user.displayName.split(' ')[0] : '',
              lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
              email: user.email || ''
            });
            this.currentUserId.next(user.uid);
          }
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  loginWithGoogle(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            this.loggedIn.next(true);
            this.currentUser.next({
              id: user.uid,
              firstName: user.displayName ? user.displayName.split(' ')[0] : '',
              lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
              email: user.email || ''
            });
            this.currentUserId.next(user.uid);
          }
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.signOut()
        .then(() => {
          this.loggedIn.next(false);
          this.currentUser.next(null);
          this.currentUserId.next(null);
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): Observable<string | null> {
    return this.currentUserId.asObservable();
  }

  afiliarUsuarioAClub(userId: string, clubId: string): Observable<void> {
    const affiliation: Affiliation = { userId, clubId };
    const affiliationId = this.firestore.createId();
    return new Observable<void>((observer) => {
      this.firestore.collection('affiliations').doc(affiliationId).set(affiliation).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getUserAffiliations(userId: string): Observable<Affiliation[]> {
    return this.firestore.collection<Affiliation>('affiliations', ref => ref.where('userId', '==', userId))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Affiliation;
          return data;
        }))
      );
  }
}
