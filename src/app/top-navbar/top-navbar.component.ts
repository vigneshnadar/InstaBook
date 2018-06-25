import { Component, OnInit } from '@angular/core';
import {UserServiceCleint} from '../services/user.service.cleint';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  user = {
    admin : false
  }
  constructor(private service: UserServiceCleint,
              private router: Router) {

    this.service.profile()
      .then(user => {
        this.user = user;
        console.log(user._id);


        this.service.findUserById(user._id)
          .then(newuser => {
            this.user = newuser;
            console.log('user');
            console.log(this.user);
          });
  });
  }
  ngOnInit() {
  }

  logout() {
    this.service
      .logout()
      .then(() => this.router.navigate(['login']));
  }

  home() {
    this.router.navigate(['home']);
  }

  admin() {
    this.router.navigate(['admin']);
  }

  author() {
    this.router.navigate(['author']);
  }

}
