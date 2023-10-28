import { Component, Inject } from '@angular/core';
import { updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss'],
})
export class AddTodoDialogComponent {
  currentUser: Employee;
  todo: { title: string; content: string } = { title: '', content: '' };

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fireService: FirestoreService
  ) {
    this.currentUser = data;
  }

  saveTodo() {
    if (this.todo) {
      this.currentUser.todos.push(this.todo);
    }
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
