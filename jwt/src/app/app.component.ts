import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({

imports: [RouterModule],
  selector: 'app-root',
  standalone: true,  // Make it standalone
  templateUrl: './app.component.html',

})
export class AppComponent {}
