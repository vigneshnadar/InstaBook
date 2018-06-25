import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorHostComponent } from './author-host.component';

describe('AuthorHostComponent', () => {
  let component: AuthorHostComponent;
  let fixture: ComponentFixture<AuthorHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
