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
    bgColor: '#fffceb'
  },
  {
    name:  'Media',
    value: 'medium',
    borderColor: '#FFDB5C',
    bgColor: '#fffceb'
  },
  {
    name:  'Baja',
    value: 'low',
    borderColor: '#4897D8',
    bgColor: '#fffceb'
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
