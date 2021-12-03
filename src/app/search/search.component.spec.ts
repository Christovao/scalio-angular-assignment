import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from '../user.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let routerSpy = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
        UserService,
        HttpClient,
        HttpHandler
      ],
      imports: [
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit, return list of users and redirect to results', () => {
    spyOn(component.userService, 'getUser').and.returnValue(of({ total_count: 10 }));

    component.onSubmit();

    expect(component.showSpinner).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['results']);
  });

  it('should call onSubmit, do not find any user and call error snackBar', () => {
    spyOn(component.userService, 'getUser').and.returnValue(of({ total_count: 0 }));
    const openErrorSnackBar = spyOn(component, 'openErrorSnackBar');

    component.onSubmit();

    expect(openErrorSnackBar).toHaveBeenCalled();
  });

  it('should call onSubmit, to return an error and call error snackBar', () => {
    spyOn(component.userService, 'getUser').and.returnValue(throwError(() => new Error('test')));
    const openErrorSnackBar = spyOn(component, 'openErrorSnackBar');

    component.onSubmit();

    expect(openErrorSnackBar).toHaveBeenCalled();
  });

  it('should call openErrorSnackBar', fakeAsync(() => {
    spyOn(component.userService, 'getUser').and.returnValue(of({ total_count: 0 }));
    const snackBarOpen = spyOn(component._snackBar, 'open');

    component.openErrorSnackBar();

    expect(component.isButtonDisabled).toBeTrue();

    tick(5000);
    fixture.detectChanges();

    expect(component.showSpinner).toBeFalse();
    expect(snackBarOpen).toHaveBeenCalledWith('Something went wrong, try again later.', '', {
      duration: 5000,
      panelClass: 'error-message'
    });
    expect(component.isButtonDisabled).toBeFalse();
  }));

  it('should unsubscribe', () => {
    const unsubscribe = spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
