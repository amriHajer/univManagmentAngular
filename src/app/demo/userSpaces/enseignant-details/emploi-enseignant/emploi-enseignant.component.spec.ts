import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiEnseignantComponent } from './emploi-enseignant.component';

describe('EmploiEnseignantComponent', () => {
  let component: EmploiEnseignantComponent;
  let fixture: ComponentFixture<EmploiEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploiEnseignantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
