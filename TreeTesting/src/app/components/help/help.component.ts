import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (UserService.checkUser() === false) this._router.navigateByUrl('/login');
  }
}
