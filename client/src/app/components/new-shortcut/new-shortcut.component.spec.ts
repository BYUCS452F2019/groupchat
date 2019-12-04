import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShortcutComponent } from './new-shortcut.component';

describe('NewShortcutComponent', () => {
  let component: NewShortcutComponent;
  let fixture: ComponentFixture<NewShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
