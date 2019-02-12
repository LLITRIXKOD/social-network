import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapComponent } from './cap.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';

describe('CapComponent', () => {
  let component: CapComponent;
  let fixture: ComponentFixture<CapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, FormsModule],
      declarations: [CapComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
