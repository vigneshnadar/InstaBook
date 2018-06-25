import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from '../services/course.service.client';
import {User} from '../models/user.model.client';
import {SectionServiceClient} from '../services/section.service.client';
import {UserServiceCleint} from '../services/user.service.cleint';
import {Course} from '../models/coruse.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {BookServiceClient} from '../services/book.service.client';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private userService: UserServiceCleint,
              private bookService: BookServiceClient) { }

  users = [];
  otherusers = [];
  user;
  username;
  password;
  sections = [];
  ngOnInit() {
    // this.service.findAllCourses()
    //   .then(courses => this.courses = courses);
    this.userService.findAllUsers()
      .then( users => {
        this.users = users;
        this.userService.profile()
          .then(user => {
            this.user = user;
            for (let j = 0; j < this.users.length; j++) {
              console.log(this.users[j]);
              if (this.users[j]._id !== this.user._id) {
                this.otherusers.push(this.users[j]);
              }
            } // end of for
          });
      });
  }


  // addUser(user) {
  //   console.log([username, password, password2]);
  //   if ( password !== password2) {
  //     alert('Passwords dont match');
  //   } else {
  //     if ( username === 'admin' && password === 'admin') {
  //       this.isAdmin = true;
  //     }
  //
  //     const user = {
  //       username: username,
  //       password: password,
  //       admin: this.isAdmin
  //     };
  //     this.service.createUser(user)
  //       .then(() => this.router.navigate(['profile']));
  //   }
  // }



}
