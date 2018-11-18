import { Component, OnInit, Input } from '@angular/core';

export interface ColorStyleModel {
  backgroundColor?: string;
  fontColor?: string;
  barColor?: string;
}

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})

export class ProgressBarComponent implements OnInit {

  @Input() value = 0;
  @Input() colorStyle: ColorStyleModel;
  @Input() displayValue = true;
  @Input() striped = false;
  @Input() animated = false;

  public unit = '%';
  public defaultColor: ColorStyleModel = {
    backgroundColor: '#FFF',
    fontColor: '#000',
    barColor: '#b6b6b6'
  };

  constructor() { }

  ngOnInit() {
    setTimeout( () => {
      this.value = 40;
    }, 2000);
    setTimeout( () => {
      this.value = 100;
    }, 4000);
  }

  setUnitClass() {
    let unit;
    switch (this.unit) {
      case '%':
        unit = 'unit-percentage';
        break;
      default:
        unit = 'unit-default';
        break;
    }
    return unit;
  }

  setBackgroundColor() {
    const style = {
      backgroundColor : this.colorStyle ? this.colorStyle.backgroundColor : this.defaultColor.backgroundColor,
    };
    return style;
  }

  setBarProperties() {

    const style = {
      'background-color' : this.colorStyle ? this.colorStyle.barColor : this.defaultColor.barColor,
      'color' : this.colorStyle ? this.colorStyle.fontColor : this.defaultColor.fontColor,
      'width' : this.value + '%',
    };

    return style;
  }

}
