import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}
  checkUser = () => UserService.checkUser();

  logout() {
    this._authService.clearStorage();
    this._router.navigateByUrl('/home');
  }
}
