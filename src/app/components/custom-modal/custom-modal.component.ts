import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WindowScrolling } from 'src/app/services/utilities/window-scrolling';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

  @Input() data: any; 
  @Input() active : boolean = false ;
  @Output() closeModal = new EventEmitter;

  newUserForm: FormGroup


  constructor( 
    private windowScrolling: WindowScrolling,
    private fb: FormBuilder, 
     ) {

      this.createUserForm();

   }

  ngOnInit() {
      
  }

  createUserForm() {
    this.newUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required] ],
      admin: [false, [Validators.required] ]
    });
  }

  close(){
    this.closeModal.emit();
  }

  submitForm(){
    this.closeModal.emit(this.newUserForm.value);
  }

}
