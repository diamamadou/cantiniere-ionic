import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMealPage } from './edit-meal.page';

describe('EditMealPage', () => {
  let component: EditMealPage;
  let fixture: ComponentFixture<EditMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
