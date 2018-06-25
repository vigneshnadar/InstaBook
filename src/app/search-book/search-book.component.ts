import { Component, OnInit } from '@angular/core';
import { parseString} from 'xml2js';
import {BookServiceClient} from '../services/book.service.client';
import {UserServiceCleint} from '../services/user.service.cleint';

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
  reviewStr = '';
  reviews = [];
  user;
  bookClicked = false;

  constructor(private bookService: BookServiceClient,
              private userService: UserServiceCleint) {
    this.userService.profile()
      .then(user => {
        this.user = user;
        console.log(user._id);
      });

    this.searchBook('titans');
  }

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
    this.bookClicked = true;
    this.currentBook = book;
    console.log('currentbook');
    console.log(this.currentBook);
    this.bookMarkVisible = true;

    this.reviews = [];
    this.bookService.findBookByTitle(book.volumeInfo.title)
      .then(cbe => {
        this.bookService.findReviewsForBook(cbe[0]._id)
          .then(reviews => {
            console.log('review');
            console.log(reviews);
            this.reviews = reviews;
          });
      });
  }

  // app.get('/api/book/:bookId/review', findReviewsForBook)
  // app.post('/api/:bookId/review', addReview)

  addReview(currentReview, cb) {



    if (this.user.username === 'unregistered') {
      alert('Please register/login to bookmark');
    } else {
      const newBook = {
        name: cb.volumeInfo.title,
        description: cb.searchInfo.textSnippet,
        imageurl: cb.volumeInfo.imageLinks.thumbnail
      }
      console.log(newBook);
      this.bookService.findBookByTitle(cb.volumeInfo.title)
        .then(cbe => {
          console.log('book by title');
          // console.log(createdBook);
          if (cbe.length === 0) {
            console.log('not found');

            this.bookService.createBook(newBook)
              .then(createdBook => {
                console.log(createdBook);
                this.bookService.addReview(createdBook._id, currentReview)
                  .then(response => {
                    this.bookService.findReviewsForBook(createdBook._id)
                      .then(reviews => {
                        console.log('review');
                        console.log(reviews);
                        this.reviews = reviews;
                      });
                  });
              });
          } else {
            console.log('book found');
            console.log(cbe);
            console.log(cbe[0]._id);
            this.bookService.addReview(cbe[0]._id, currentReview)
              .then(response => {
                this.bookService.findReviewsForBook(cbe[0]._id)
                  .then(reviews => {
                    console.log('review');
                    console.log(reviews);
                    this.reviews = reviews;
                  });
              });
          }
        });
    }
  }




  bookmark(book) {
    // create a book and then bookmark it
    // alert(section._id);
    if (this.user.username === 'unregistered') {
      alert('Please register/login to bookmark');
    } else {
      const newBook = {
        name: book.volumeInfo.title,
        description: book.searchInfo.textSnippet,
        imageurl: book.volumeInfo.imageLinks.thumbnail
      }
      console.log(newBook);
      this.bookService.findBookByTitle(book.volumeInfo.title)
        .then(cb => {
          console.log('book by title');
              // console.log(createdBook);
              if (cb.length === 0) {
                console.log('not found');

                this.bookService.createBook(newBook)
                  .then(createdBook => {
                    console.log(createdBook);
                    this.bookService.bookmarkUserInBook(createdBook._id);
                  });
              } else {
                console.log('book found');
                console.log(cb);
                console.log(cb[0]._id);
                this.bookService.bookmarkUserInBook(cb[0]._id);
              }
            });
    }


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
