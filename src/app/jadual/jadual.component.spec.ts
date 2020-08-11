import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JadualComponent } from './jadual.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

describe('JadualComponent', () => {
  let component: JadualComponent;
  let fixture: ComponentFixture<JadualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JadualComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JadualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
