import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { RegisterComponent } from '../register/register.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
              private _router: Router,
              private _auth: AuthService,
              public _snackBar: MatSnackBar,
              private userService: UserService,
              public dialog: MatDialog,
              private translocoService: TranslocoService) { }
  email: string = '';
  password: string = '';
  surveyCode: string = '';

  ngOnInit(): void {
    this.userService.getUser();
    if (UserService.checkUser()) this._router.navigateByUrl(`/dashboard`);
  }

  onSubmit(): void {
    this.login();
  }

  openRegForm() {
    this.dialog.open(RegisterComponent, {width: '600px', height: '450px'});
  }

  findSurvey() {
    this._router.navigateByUrl(`/survey/${this.surveyCode}`);
  }

  login() {
      this.userService.login(this.email, this.password).pipe(
        map(x => {
          if (x instanceof HttpErrorResponse) {
            throw x;
          }
          return x;
          })
        )
        .pipe(
          catchError(err => {
            if (err.status === 401 || err.status === 404 || err.status === 403) {
              this._snackBar.open(this.translocoService.translate('errors.loginError'), null, {
                duration: 3000
              });
            } else {
              this._snackBar.open(this.translocoService.translate('errors.serverError'), null, {
                duration: 3000
              });
            }
            this.email = '';
            this.password = '';

            return throwError(() => new Error(err));
          })
        ).subscribe({next: (res: any) => {
            if(res.creds){ 
              let createdUser = this.userService.createNewUserJson(res.user);
              this._auth.setDataInLocalStorage('access_token', res.creds.access_token);
              this._auth.setDataInLocalStorage('user', JSON.stringify(createdUser));
              UserService.CurrentUser = createdUser;
              this._router.navigateByUrl('/dashboard');
            }
            this._router.navigate(['/']);
          },
          error: (e) => {}
        });
  }

  getImageHeightForScreenSize() {
    if (window.innerWidth > 1600) return 600;
    if (window.innerWidth > 1400) return 400;
    return 0;
  }

}
