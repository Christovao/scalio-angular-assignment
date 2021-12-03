import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {

  login: string = '';
  showSpinner: boolean = false;
  isButtonDisabled: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    public userService: UserService,
    public _snackBar: MatSnackBar) { }

  onSubmit(): void {
    this.showSpinner = true;

    this.subscription.add(this.userService.getUser(this.login).subscribe({
      next: (res: any) => {
        if (res.total_count) {
          sessionStorage.setItem('usersResponse', JSON.stringify(res.items));
          this.showSpinner = false;
          this.router.navigate(['results']);
        } else {
          this.openErrorSnackBar();
        }
      },
      error: (err) => {
        console.error(err);
        this.openErrorSnackBar();
      }
    }));
  }

  openErrorSnackBar(): void {
    this.showSpinner = false;
    this.isButtonDisabled = true;

    this._snackBar.open('Something went wrong, try again later.', '', {
      duration: 5000,
      panelClass: 'error-message'
    });

    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 5000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
