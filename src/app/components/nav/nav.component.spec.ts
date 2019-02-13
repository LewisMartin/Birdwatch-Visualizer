import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { MaterialModule } from 'src/app/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatToolbarModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let dom;
  let hamburger;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule
      ],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    fixture.autoDetectChanges(true);
    component = fixture.componentInstance;
    dom = fixture.nativeElement;
    hamburger = dom.querySelector('#hamburger');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to home page on app title', () => {
    fixture.detectChanges();
    let href = fixture.debugElement.query(By.css('.app-title')).nativeElement.getAttribute('routerLink');

    expect(href).toEqual("['/']");
  });

  it('should have a link to breakdown page on menu', () => {
    fixture.detectChanges();
    hamburger.click();
    let href = fixture.debugElement.query(By.css('.breakdown-link')).nativeElement.getAttribute('routerLink');

    expect(href).toEqual("['breakdown']");
  });

  it('should have a link to tracker page on menu', () => {
    fixture.detectChanges();
    hamburger.click();
    let href = fixture.debugElement.query(By.css('.tracker-link')).nativeElement.getAttribute('routerLink');

    expect(href).toEqual("['tracker']");
  });
});
