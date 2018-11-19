import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilter'
})
export class MultiFilterPipe implements PipeTransform {

  transform(items: any[], filter?: string, priority?: string, type?: string): any {
    let initial = false;
    let aux = [];
    console.log(items, type, priority);
    if (!initial) {
      aux = items;
      initial = true;
    }

    if (priority === '' && type === '') {
      switch (filter) {
        case 'name':
          items.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
          break;
        case 'type':
          items.sort(function (a, b) {
            if (a.type > b.type) {
              return 1;
            }
            if (a.type < b.type) {
              return -1;
            }
            return 0;
          });
          break;
        case 'all':
          return aux;
      }
      return items;
    } else if (priority !== '' && type === '') {
      items = items.filter(task => {
        if (task.priority === priority) {
          return task;
        }
      });
      return items;
    } else if (priority === '' && type !== '') {
      console.log('true aqui 2');
      items = items.filter(task => {
        if (task.type === type) {
          return task;
        }
      });
      return items;
    } else if (priority !== '' && type !== '') {
      console.log('true aqui');
      items = items.filter(task => {
        if (task.type === type) {
          return task;
        }
      }).filter(task => {
        if (task.priority === priority) {
          return task;
        }
      });
      return items;
    }
  }

}
