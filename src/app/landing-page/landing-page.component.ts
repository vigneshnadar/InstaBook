import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  books = [];
  constructor(private router: Router) {

    fetch
    ('https://www.googleapis.com/books/v1/volumes?q=titans')
      .then(response => response.json())
      .then(booklist => {
        this.books = booklist.items;
        console.log(this.books);
      });
  }

  ngOnInit() {
  }

  search() {
    this.router.navigate(['search']);
  }

  register() {
    this.router.navigate(['register']);
  }

}
