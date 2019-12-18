import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodaysMenuPage } from './todays-menu.page';

describe('TodaysMenuPage', () => {
  let component: TodaysMenuPage;
  let fixture: ComponentFixture<TodaysMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodaysMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
