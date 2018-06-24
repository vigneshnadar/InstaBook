import { Component, OnInit } from '@angular/core';
import { parseString} from 'xml2js';
import {BookServiceClient} from '../services/book.service.client';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {


  bookname = '';
  books = [];
  currentBook = {
    id : '0'
  };
  bookMarkVisible = false;

  constructor(private bookService: BookServiceClient) { }

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
    console.log('currentbook');
    console.log(this.currentBook);
    this.bookMarkVisible = true;
  }



  bookmark(book) {
    // create a book and then bookmark it
    const newBook = {
      name: book.volumeInfo.title,
      description: book.searchInfo.textSnippet,
      imageurl: book.volumeInfo.imageLinks.thumbnail
    }
    console.log(newBook);
    // alert(section._id);
    this.bookService.createBook(newBook)
      .then(createdBook => {
        console.log(createdBook);
        this.bookService.bookmarkUserInBook(createdBook._id);
      });


    // this.B.enrollStudentInSection(section._id)
    //   .then(() => {
    //     this.router.navigate(['profile']);
    //   });
  }

  // findAllCourses() {
  //   return fetch
  //   ('http://localhost:8080/api/course')
  //     .then(response => response.json());
  // }


}
