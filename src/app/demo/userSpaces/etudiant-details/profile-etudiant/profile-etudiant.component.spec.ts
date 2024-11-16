import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEtudiantComponent } from './profile-etudiant.component';

describe('ProfileEtudiantComponent', () => {
  let component: ProfileEtudiantComponent;
  let fixture: ComponentFixture<ProfileEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
