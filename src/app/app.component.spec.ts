import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';

// Configure the test module
describe('AppComponent', () => { 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],imports: [ HttpModule, JsonpModule ]
    }).compileComponents();
  }));
  //Assert if the application is properly bootstrapped and initial app instance crated
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  //Assert the Html title is set
  it(`should have as title 'Cats list'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Cats list');
  }));  
});
