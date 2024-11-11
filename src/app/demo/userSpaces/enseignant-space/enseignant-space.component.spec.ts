import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantSpaceComponent } from './enseignant-space.component';

describe('EnseignantSpaceComponent', () => {
  let component: EnseignantSpaceComponent;
  let fixture: ComponentFixture<EnseignantSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantSpaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
