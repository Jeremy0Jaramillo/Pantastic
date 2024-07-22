import { Component, OnInit } from '@angular/core';
import News from '../../interfaces/news.interface';
import { NoticiasService } from '../../services/noticias.service';
import { LoginService } from '../../services/login.service';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.html',
  styleUrls: ['./noticias.css']
})
export class NoticiasComponent implements OnInit {
  noticiasGenerales: News[] = [];
  noticiasClub: News[] = [];
  userClubIds: string[] = [];

  constructor(
    private noticiasService: NoticiasService,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().pipe(
      switchMap(userId => {
        if (userId) {
          // Obtener todas las afiliaciones del usuario
          return this.authService.getUserAffiliations(userId).pipe(
            map(affiliations => affiliations.map(affiliation => affiliation.clubId))
          );
        } else {
          return of([]);
        }
      })
    ).subscribe(clubIds => {
      this.userClubIds = clubIds;
      this.cargarNoticias();
    });
  }

  cargarNoticias(): void {
    this.noticiasService.obtenerNoticiasGenerales().subscribe(noticias => {
      this.noticiasGenerales = noticias;
    });

    if (this.userClubIds.length > 0) {
      // Crear un array de observables para obtener las noticias de cada club
      const noticiasObservables = this.userClubIds.map(clubId =>
        this.noticiasService.obtenerNoticiasPorClub(clubId)
      );

      forkJoin(noticiasObservables).subscribe(noticiasArrays => {
        // Combinar todas las noticias en un solo array
        this.noticiasClub = noticiasArrays.flat();
      });
    }
  }
}
