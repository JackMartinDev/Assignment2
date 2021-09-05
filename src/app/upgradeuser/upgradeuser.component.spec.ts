import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeuserComponent } from './upgradeuser.component';

describe('UpgradeuserComponent', () => {
  let component: UpgradeuserComponent;
  let fixture: ComponentFixture<UpgradeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
