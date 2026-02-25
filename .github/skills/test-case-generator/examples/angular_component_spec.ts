/*
Example structure: Angular Jasmine/Karma unit test for a component
Keep the test deterministic: no real HTTP (use HttpClientTestingModule)
*/

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MyWidgetComponent } from './my-widget.component';

describe('MyWidgetComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MyWidgetComponent],
    }).compileComponents();
  });

  it('renders the title input', () => {
    const fixture = TestBed.createComponent(MyWidgetComponent);
    fixture.componentInstance.title = 'Orders';
    fixture.detectChanges();

    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement as HTMLElement;
    expect(h1.textContent).toContain('Orders');
  });
});
