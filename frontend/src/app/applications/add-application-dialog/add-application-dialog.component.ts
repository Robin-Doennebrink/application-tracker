import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { Validators } from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-add-application-dialog',
  templateUrl: './add-application-dialog.component.html',
  styleUrls: ['./add-application-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,MatDialogModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  providers: [
        provideNativeDateAdapter()
    ]
})
export class AddApplicationDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      company: ['', Validators.required],
      job_title: ['', Validators.required],
      link_to_job_advertisement: ['', Validators.required],
      comment: ['', Validators.required],
      application_date: [new Date(), Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const rawResult = this.form.value;
      const formattedResult = {
        ...rawResult,
        application_date: this.formatDate(rawResult.application_date),
      }
      this.dialogRef.close(formattedResult);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
