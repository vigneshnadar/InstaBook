import { Component, OnInit } from '@angular/core';
import { parseString} from 'xml2js';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {


  bookname = '';
  books = [];
  currentBook;

  constructor() { }

  ngOnInit() {
  }
  searchBook(book) {
    console.log(book);

    fetch
    ('https://www.googleapis.com/books/v1/volumes?q=' + book)
      .then(response => response.json())
      .then(booklist => {
        this.books = booklist.items;
        console.log(this.books);
      });
  }


  details(book) {
    this.currentBook = book;
  }
  // findAllCourses() {
  //   return fetch
  //   ('http://localhost:8080/api/course')
  //     .then(response => response.json());
  // }


}
