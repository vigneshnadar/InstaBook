import { Component, OnInit } from '@angular/core';
import { parseString} from 'xml2js';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {


  bookname = 'titan';

  constructor() { }

  ngOnInit() {
  }
  searchBook(book) {
    console.log(book);

    fetch
    ('https://www.goodreads.com/search/index.xml?key=Rf5RgIMAFlMe3bqgBWQrQ&q=titan',{
      credentials: 'same-origin',
      mode: 'no-cors'
    })
      .then(response => response.json())
      .then(booklist => console.log(booklist));

    // // https://www.goodreads.com/search/index.xml?key=Rf5RgIMAFlMe3bqgBWQrQ&q=titan
  }

  // addCourse(title) {
  //   this.courses.push({
  //     title: title,
  //     id: title
  //   });
  //   this.courseTitle = '';
  // }




  // findAllCourses() {
  //   return fetch
  //   ('http://localhost:8080/api/course')
  //     .then(response => response.json());
  // }


}
