import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEnseignantComponent } from './profile-enseignant.component';

describe('ProfileEnseignantComponent', () => {
  let component: ProfileEnseignantComponent;
  let fixture: ComponentFixture<ProfileEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEnseignantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
