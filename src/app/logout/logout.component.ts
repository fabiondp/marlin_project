import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.logoutTeste();
    console.log(this.authService.check);

    // if (!this.authService.check) {
    //   this.router.navigate(['/home']);
    // }
    // this.router.navigate(['/home']);
  }
}
