import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor() { }

  priority = [{
    name:  'Alta',
    value: 'high',
    borderColor: '#FA6E59',
    bgColor: '#FA6E5940'
  },
  {
    name:  'Media',
    value: 'medium',
    borderColor: '#f8ca2c',
    bgColor: '#f8ca2c40'
  },
  {
    name:  'Baja',
    value: 'low',
    borderColor: '#4897D8',
    bgColor: '#4897D840'
  },
]

getAll(){
  return this.priority;
}

getBgColor(value:string):string{
  let color = '';
  this.priority.forEach(element => {
    if( element.value === value ){
      color = element.bgColor
    }
  });
  return color;
}

getBorderColor(value:string):string{
  let color = '';
  this.priority.forEach(element => {
    if( element.value === value ){
      color = element.borderColor;
    }
  });
  return color;
}

}
