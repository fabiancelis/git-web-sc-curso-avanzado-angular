import { Component, OnInit } from '@angular/core';
import { LoaderService } from './servicios/loader.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'intermedio';
  loading: boolean = false;

  constructor(
    private _loader: LoaderService 
  ) {}

  ngOnInit(): void {
    this.listenToLoading();
  }
  
  listenToLoading(): void {
    this._loader.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      })
  }

}
