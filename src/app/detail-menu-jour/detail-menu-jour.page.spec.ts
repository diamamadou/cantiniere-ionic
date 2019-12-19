import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailMenuJourPage } from './detail-menu-jour.page';

describe('DetailMenuJourPage', () => {
  let component: DetailMenuJourPage;
  let fixture: ComponentFixture<DetailMenuJourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMenuJourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailMenuJourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
