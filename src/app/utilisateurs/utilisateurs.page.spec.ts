import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UtilisateursPage } from './utilisateurs.page';

describe('UtilisateursPage', () => {
  let component: UtilisateursPage;
  let fixture: ComponentFixture<UtilisateursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilisateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
