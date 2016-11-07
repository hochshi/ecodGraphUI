import {Component} from '@angular/core';
import {BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'fountain-app',
  template: require('./App.html'),
})
export class AppComponent {
  constructor(private breadcrumbService: BreadcrumbService) {
  }
}
