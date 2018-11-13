import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { PriorityService } from '../../services/priority/priority.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
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

  constructor( private listService:ListService, private optionsService:PriorityService, private fb: FormBuilder) {

    this.options = this.optionsService.getAll();

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
          ...snap.payload.doc.data()

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

  getBgColor(value){
    return this.optionsService.getBgColor(value)
  }
  
  getBorderColor(value){
    return this.optionsService.getBorderColor(value)
  }

}
