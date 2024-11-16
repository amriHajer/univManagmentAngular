import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiEtudiantComponent } from './emploi-etudiant.component';

describe('EmploiEtudiantComponent', () => {
  let component: EmploiEtudiantComponent;
  let fixture: ComponentFixture<EmploiEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploiEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
