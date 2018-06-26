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
  showProfile = true;
  showAuthor = false;
  constructor(private service: UserServiceCleint,
              private router: Router) {

    this.service.profile()
      .then(user => {
        this.user = user;
        console.log(user._id);

        if (user.username === 'unregistered') {
          this.showProfile = false;
        }
        this.service.findUserById(user._id)
          .then(newuser => {
            this.user = newuser;
            console.log('user');
            console.log(this.user);
            console.log(newuser.isauthor);

            if (newuser.isauthor) {
              this.showAuthor = true;
            }
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

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }

  profile() {
    this.router.navigate(['profile']);
  }

}
