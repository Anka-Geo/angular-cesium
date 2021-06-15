import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cesium';
  foo?: Cesium.Viewer;

  ngOnInit() {
    this.foo = new Cesium.Viewer('map');
  }
}
