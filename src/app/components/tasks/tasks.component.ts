import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { PriorityService } from '../../services/priority/priority.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { WindowSize } from 'src/app/services/utilities/window-size';
import { Observable } from 'rxjs';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';




@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('marginAnimation', [ 
      state('hide' , style ({ 
        marginBottom: '4px',
      })),
      state('show' , style ({ 
        marginBottom: '45vh',
      })),
      transition( 'hide <=> show' , animate('.350s ease-in-out'))
    ]),
  ]
})
export class TasksComponent implements OnInit {

  tasks = [];
  options = [];
  taskForm = this.fb.group({
    name:  ['' , Validators.required],
    type: ['' , Validators.required],
    detail: ['', Validators.required],
    priority: ['', Validators.required],
  })

  addForm = false;
  editTaskForm: boolean = false;
  taskID: any;
  isMobile$: Observable<boolean>;
  taskOpen: any;
  isMobile: boolean;

  constructor( 
    private listService:ListService,
    private optionsService:PriorityService,
    private fb: FormBuilder,
    private windowSize:WindowSize) {

    this.options = this.optionsService.getAll();
    this.isMobile$ = this.windowSize.isMobileObservable;
   }

  trackByFn(index, item) {
    return item.id
  }

  async ngOnInit() {
    await this.listService.getTasks().subscribe( (taskSnapshots) => {
      console.log(taskSnapshots)
      this.tasks = taskSnapshots.map(snap => {
        let obj = {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data(),
          showDetail:false
          //notacion ... literalmente copia la estructura de la data como viene, si el campo
          //dice name: "Hola" ,
          // Nuestro objeto tendra una propiedad que se llama name: "hola"
        }
        return obj;
      })
    })

  }

  deleteTask(id){
    this.listService.deleteTask(id);
  }

  addNewToggle(){
    this.addForm = !this.addForm;
    this.taskForm.reset();
  }

  editTask(task){
    this.addForm = true;
    this.taskID = task.id;
    this.taskForm.patchValue(task);
    this.editTaskForm = true;
  }

  openDetail(task){
    this.tasks.forEach(element => {
      if(element.id === task.id){
        if( this.taskOpen === task.id){
          element.showDetail = false;
          this.taskOpen = '';
        }else{
          this.taskOpen = element.id;
          element.showDetail = true;
          }
        }else{
        element.showDetail = false;
      }
    });
  }

  onSubmit(id?){
    this.addForm = false;

    if(this.editTaskForm){
      this.editTaskForm = false;
      this.listService.updateTask(id,this.taskForm.value)
    }
    else{
      this.listService.createTask(this.taskForm.value)
    }
  }

  detailState( value , isMobile ){
    console.log(value , isMobile)
    let state = value && isMobile ? 'show' : 'hide';
    return state;
  }

  getBgColor(value){
    return this.optionsService.getBgColor(value)
  }
  
  getBorderColor(value){
    return this.optionsService.getBorderColor(value)
  }

}
