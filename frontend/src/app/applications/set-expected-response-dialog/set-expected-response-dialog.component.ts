import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface SetExpectedResponseDialogData {
  currentDate?: string | null;
}

@Component({
  selector: 'app-set-expected-response-dialog',
  templateUrl: './set-expected-response-dialog.component.html',
  styleUrls: ['./set-expected-response-dialog.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter()]
})
export class SetExpectedResponseDialogComponent {
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<SetExpectedResponseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: SetExpectedResponseDialogData
  ) {
    this.form = this.fb.group({
      expected_response_date: [
        this.parseIsoDate(data?.currentDate) ?? null,
        Validators.required
      ],
    });
  }

  save(): void {
    if (this.form.valid) {
      const date: Date = this.form.value.expected_response_date;
      this.dialogRef.close({
        expected_response_date: this.formatDate(date)
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private parseIsoDate(value?: string | null): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}