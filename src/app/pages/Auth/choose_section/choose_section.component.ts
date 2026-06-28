import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-choose_section',
  templateUrl: './choose_section.component.html',
  styleUrls: ['./choose_section.component.css']
})
export class Choose_sectionComponent implements OnInit {

  constructor(private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

showRegisterSnack() {
  this.snackBar.open(
    'You cannot register through the website. Please use the mobile app to complete your registration.',
    'Download App', // required internally
    {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['gorgeous-snackbar', 'playstore-only']
    }
  ).onAction().subscribe(() => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.bosec',
      '_blank'
    );
  });
}



}

