import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-edit.html',
})
export class UserEditComponent {

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      name: [data.user.name],
      email: [data.user.email],
      phone: [data.user.phone]
    });
  }

  save() {
    this.dialogRef.close(this.editForm.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}