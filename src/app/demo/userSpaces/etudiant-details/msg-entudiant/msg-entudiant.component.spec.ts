import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgEntudiantComponent } from './msg-entudiant.component';

describe('MsgEntudiantComponent', () => {
  let component: MsgEntudiantComponent;
  let fixture: ComponentFixture<MsgEntudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgEntudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgEntudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
