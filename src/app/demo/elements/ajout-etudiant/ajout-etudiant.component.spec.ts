import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEtudiantComponent } from './ajout-etudiant.component';

describe('AjoutEtudiantComponent', () => {
  let component: AjoutEtudiantComponent;
  let fixture: ComponentFixture<AjoutEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
