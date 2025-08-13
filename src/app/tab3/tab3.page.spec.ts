import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3Page } from './tab3.page';
import { Storage } from '@ionic/storage-angular';
import { GeminiService } from '../services/gemini.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  beforeEach(async () => {
    const storageMock = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);
    const geminiServiceMock = jasmine.createSpyObj('GeminiService', ['generateContent']);

    await TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [
        IonicModule.forRoot(),
        ExploreContainerComponentModule,
        HttpClientTestingModule // Para simular HTTP
      ],
      providers: [
        { provide: Storage, useValue: storageMock },
        { provide: GeminiService, useValue: geminiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
