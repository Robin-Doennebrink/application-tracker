import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationDialogComponent } from './add-application-dialog.component';

describe('AddApplicationDialogComponent', () => {
  let component: AddApplicationDialogComponent;
  let fixture: ComponentFixture<AddApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddApplicationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
