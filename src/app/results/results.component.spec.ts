import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      imports: [
        MatPaginatorModule,
        MatTableModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    const user = [
      {
        login: 'firstUser'
      }
    ];
    window.sessionStorage.setItem('usersResponse', JSON.stringify(user));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngAfterViewInit', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('[{"login":"firstUser"}]');
    const cdrDetectChanges = spyOn(component.cdRef, 'detectChanges');

    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.matSort);
    expect(cdrDetectChanges).toHaveBeenCalled();
  });
});
