import { Component, OnInit } from '@angular/core';
import {UserServiceCleint} from '../services/user.service.cleint';
import {SectionServiceClient} from '../services/section.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})




export class UserGridComponent implements OnInit {

  constructor(private userService: UserServiceCleint,
              private sectionService: SectionServiceClient) { }

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

  followUser(userId) {
    this.userService.followUser(userId);
  }

}

