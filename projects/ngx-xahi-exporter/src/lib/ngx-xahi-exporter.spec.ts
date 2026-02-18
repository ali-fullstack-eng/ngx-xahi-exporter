import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxXahiExporter } from './ngx-xahi-exporter';

describe('NgxXahiExporter', () => {
  let component: NgxXahiExporter;
  let fixture: ComponentFixture<NgxXahiExporter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxXahiExporter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxXahiExporter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
