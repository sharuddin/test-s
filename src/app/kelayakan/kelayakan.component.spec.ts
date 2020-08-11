import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KelayakanComponent } from './kelayakan.component';

describe('KelayakanComponent', () => {
  let component: KelayakanComponent;
  let fixture: ComponentFixture<KelayakanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KelayakanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KelayakanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
