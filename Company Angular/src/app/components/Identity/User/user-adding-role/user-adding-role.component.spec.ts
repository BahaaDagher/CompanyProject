import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddingRoleComponent } from './user-adding-role.component';

describe('UserAddingRoleComponent', () => {
  let component: UserAddingRoleComponent;
  let fixture: ComponentFixture<UserAddingRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddingRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddingRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
