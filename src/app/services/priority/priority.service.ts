import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor() { }

  priority = [{
    name:  'Alta',
    value: 'high',
    color: '#ffa2a2'
  },
  {
    name:  'Media',
    value: 'medium',
    color: '#ffff9b'
  },
  {
    name:  'Baja',
    value: 'low',
    color: '#8bfcd1'
  },
]

getAll(){
  return this.priority;
}

getBgColor(value:string):string{
  let color = '';
  this.priority.forEach(element => {
    console.log(element.value , value)
    if( element.value === value ){
      color = element.color
    }
  });
  return color;
}

}
