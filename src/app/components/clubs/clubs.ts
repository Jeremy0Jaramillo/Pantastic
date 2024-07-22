import { Component, OnInit } from '@angular/core';
import { ConsultasService } from "../../services/consultas.service";
import Clubs from "../../interfaces/clubs.interface";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.html',
  styleUrls: ['./clubs.css']
})

export class ClubsComponent implements OnInit {
  clubs: Clubs[] = [];
  alertMessage?: string;
  selectedClubId?: string;

  constructor(
    private consultasService: ConsultasService,
    private router: Router,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.obtenerClubs();
  }

  obtenerClubs(): void {
    this.consultasService.obtenerClubs().subscribe(
      clubs => {
        this.clubs = clubs;
      },
      error => {
        console.error('Error al obtener los clubs: ', error);
      }
    );
  }

  afiliarse(clubId: string): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.authService.afiliarUsuarioAClub(userId, clubId).subscribe(() => {
          this.alertMessage = "Gracias por afiliarte a nuestro club.";
          this.selectedClubId = clubId;
        });
      }
    });
  }

  irANoticias(): void {
    this.router.navigate(['/noticias']);
  }
}
