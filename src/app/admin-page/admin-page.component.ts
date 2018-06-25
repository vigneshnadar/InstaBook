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
  user = {
    _id : 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }
  username;
  password;
  sections = [];

  ngOnInit() {
    // this.service.findAllCourses()
    //   .then(courses => this.courses = courses);
    this.loadUsers();

  }
  loadUsers() {
    this.userService.findAllUsers()
      .then( users => {
        this.users = users;

        this.userService.profile()
          .then(user => {
            this.user = user;

            this.user.username = user.username;
            this.user.password = user.password;
            this.user.firstName = user.firstName;
            this.user.lastName = user.lastName;
            this.user.email = user.email;
            this.otherusers = [];
            for (let j = 0; j < this.users.length; j++) {
              console.log(this.users[j]);
              if (this.users[j]._id !== this.user._id) {
                this.otherusers.push(this.users[j]);
              }
            } // end of for
          });
      });
  }

  editUser(u) {
    this.user = u ;
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId)
      .then(() => this.loadUsers());
  }

  update(username, password, firstName, lastName, email) {
    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    }

    this.userService.updateUser(this.user._id, newUser)
      .then(() => {
        this.loadUsers();
      });
  }

  addUser(username, password, firstName, lastName, email) {
    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      createdByAdmin : true,
      email: email
    }
    console.log('newuser');
    console.log(newUser);
    this.userService.createUser(newUser)
      .then(() => {
        this.loadUsers();
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
