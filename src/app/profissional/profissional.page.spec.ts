import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalPage } from './profissional.page';

describe('ProfissionalPage', () => {
  let component: ProfissionalPage;
  let fixture: ComponentFixture<ProfissionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
