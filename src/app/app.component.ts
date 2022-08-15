import { LoadingService } from './services/loading.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'to-do-list';

  loading$:Observable<boolean>;

  constructor(private LoadingService:LoadingService){}
  
  ngOnInit():void{
    document.body.style.backgroundColor='grey';
    this.loading$=this.LoadingService.loading$();
  }
}
