import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceCleint} from '../services/user.service.cleint';
import {Router} from "@angular/router";
import {BookServiceClient} from '../services/book.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceCleint,
              private bookService: BookServiceClient,
              private router: Router) { }

  user: User = new User();
  username;
  password;
  sections = [];
  books = [];
  following = [];
  followedBy = [];
  update(user: User) {
    console.log(user);
    this.service.updateProfile(user.username, user.password, user.firstName, user.lastName, user.email)
      .then( () => console.log('update'));
        // user => this.user = user);
  }

  ngOnInit() {
    this.service.profile()
      .then(user => {
        this.user = user;
        console.log(user._id);

        this.service.findFollowingReaders(user._id)
          .then( following => {
            console.log(following);
            console.log('testing');
            this.following = following;
          });


        this.service.findFollowedByReaders(user._id)
          .then( followedBy => {
            console.log(followedBy);
            this.followedBy = followedBy;
          });

        this.service.findUserById(user._id)
          .then(newuser => {
            this.user = newuser;
            console.log('user');
            console.log(this.user);


            this.bookService.
            findBooksForReader()
              .then(books => {
                this.books = books;
                console.log('books');
                console.log(books);
              });
          });
      });
    // this.sectionService
    //   .findSectionsForStudent()
    //   .then(sections => {
    //     this.sections = sections;
    //     console.log(sections[0].section);
    //   });
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
