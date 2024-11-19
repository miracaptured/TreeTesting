import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TreeTesting';

  checkUser = () => UserService.checkUser();

  constructor(private _iconService: IconService) {
  }
  
  ngOnInit(): void {
    this._iconService.registerIcons();
  }
}
