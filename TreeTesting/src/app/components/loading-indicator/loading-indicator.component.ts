import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, AsyncPipe, NgIf, NgTemplateOutlet],
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
  private loadingService: LoadingService, 
  private router: Router) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}
