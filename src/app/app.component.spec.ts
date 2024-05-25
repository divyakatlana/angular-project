import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Sidebar } from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { HeaderComponent } from './components/includes/header/header.component';

describe('AppComponent', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        Sidebar
      ],
      providers: [
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'drooms-starwars-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('drooms-starwars-app');
  });
});
