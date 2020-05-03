
import { Component, OnInit } from '@angular/core';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthService } from 'src/app/shared/services/auth.service';

interface DataLogin {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: DataLogin = {};
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  loading = false;
  submitted = false;
  signinForm: FormGroup;
  loggedIn: boolean;
  returnUrl: string;

  constructor(
    private noti: NotificationService,
    private sharedData: SharedDataService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
  ) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    // if (this.jwtHelper.isTokenExpired()) {
    //   localStorage.removeItem('access_token');
    // }
  }

  loginUser() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.signIn(this.signinForm.value).then(res => {
      this.noti.showSuccess('Đăng nhập Thành công', '');
      this.router.navigate([this.returnUrl]);
    }).catch(error => {
      console.log(error)
      this.noti.showError('Đăng nhập Thất bại', error.error);
      this.loading = false;
    });
  }
}
