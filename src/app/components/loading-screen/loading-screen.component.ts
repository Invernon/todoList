import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {

  @Input() status = false;
  @Input() message = 'Loading';

  constructor() { }

  ngOnInit() {
  }

}
