import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { PriorityService } from '../../services/priority/priority.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { WindowSize } from 'src/app/services/utilities/window-size';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Task } from '../../models/task';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('marginAnimation', [
      state('hide', style({
        marginBottom: '4px',
      })),
      state('show', style({
        marginBottom: '45vh',
      })),
      transition('hide <=> show', animate('.350s ease-in-out'))
    ]),
  ]
})
export class TasksComponent implements OnInit {

  tasks: Array<Task>;
  isReady = false;
  options = [];
  typeOptions = [];
  taskForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    type: ['', [Validators.required, Validators.maxLength(15)]],
    detail: ['', [Validators.required, Validators.maxLength(400)]],
    priority: ['', Validators.required],
  });
  extraTypeInput = false;

  get name() {
    return this.taskForm.get('name');
  }
  get type() {
    return this.taskForm.get('type');
  }
  get detail() {
    return this.taskForm.get('detail');
  }
  get priority() {
    return this.taskForm.get('priority');
  }

  filter = {
    name: false,
    type: false,
    priority: false,
    priorityName: '',
    typeName: ''
  };

  addForm = false;
  editTaskForm = false;
  taskID: string;
  isMobile$: Observable<boolean>;
  taskOpen: string;
  isMobile = false;

  constructor(
    private listService: ListService,
    private optionsService: PriorityService,
    private fb: FormBuilder,
    private windowSize: WindowSize) {

    this.options = this.optionsService.getAll();
    this.isMobile$ = this.windowSize.isMobileObservable;
  }


  trackByFn(index, item) {
    return item._id;
  }

  async ngOnInit() {
    await this.listService.getTasks().subscribe((taskSnapshots) => {
      (this.tasks as unknown) = taskSnapshots.map(snap => {
        const obj = {
          _id: snap.payload.doc.id,
          ...snap.payload.doc.data(),
          showDetail: false
        };
        this.isReady = true;
        return obj;
      });
      this.getTypeKeys(this.tasks);
    });
    console.log(this.taskForm.value.type , this.extraTypeInput);
  }

  deleteTask(id) {
    this.listService.deleteTask(id);
  }

  addNewToggle() {
    this.addForm = !this.addForm;
    this.extraTypeInput = false;
    this.taskForm.reset();
  }

  editTask(task) {
    this.addForm = true;
    this.taskID = task._id;
    this.taskForm.patchValue(task);
    this.editTaskForm = true;
  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
 }

  getTypeKeys(array) {
    this.typeOptions = [];
    this.unique(array, 'type').forEach(element => {
      const options = {
        name: element.type,
        value: element.type,
      };
      this.typeOptions.push(options);
    });
    console.log(this.typeOptions);
  }

  // This with activate the extra input if the user select Add new in the Select
  extraType() {
    if ( this.taskForm.value.type === ' ' ) {
      this.extraTypeInput = true;
    } else {
      this.extraTypeInput = false;
    }
  }

  // Recive a task to open it details
  openDetail(task , isMobile) {
    if (isMobile) {
      this.tasks.forEach(element => {
        if (element._id === task._id) {
          if (this.taskOpen === task._id) {
            element.showDetail = false;
            this.taskOpen = '';
          } else {
            this.taskOpen = element._id;
            element.showDetail = true;
          }
        } else {
          element.showDetail = false;
        }
      });
    }
  }

  // Submit del formulario
  onSubmit(id?) {
    this.addForm = false;
    if (this.editTaskForm) {
      this.editTaskForm = false;
      this.listService.updateTask(id, this.taskForm.value);
    } else {
      this.listService.createTask(this.taskForm.value).then(data => {
        if (data) {
          alert('Task successfully created!');
        }
      }
      )
        .catch(err => {
          console.log(err.message);
        });
    }
  }

  detailState(value, isMobile) {
    const detailState = (value && isMobile) ? 'show' : 'hide';
    return detailState;
  }

  // return the BG color depending the Priority
  getBgColor(value) {
    return this.optionsService.getBgColor(value);
  }

   // return the Border color depending the Priority
  getBorderColor(value) {
    return this.optionsService.getBorderColor(value);
  }

  filterChange() {
    if ( this.filter.name ) {
      return 'name';
    }
    if ( !this.filter.name && this.filter.typeName === '' && this.filter.priorityName === '' ) {
      return 'all';
    }
  }

}
