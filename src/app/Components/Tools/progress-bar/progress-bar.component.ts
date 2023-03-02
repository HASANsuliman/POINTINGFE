import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit,AfterViewInit {
  isLoadingbar: BehaviorSubject<boolean> = this.loaderService.isLoadingBar;
  constructor(private loaderService: LoaderService) { }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {

  }

}
