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
      headers: {
       // 'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
      //mode: 'no-cors'
    })
      .then(output => {
        console.log(output.text());
        return output.text();
      })
      .then( xmltext => {
        console.log('xml text is');
        console.log(xmltext);
        parseString(xmltext, (err, goodreadsResult) => {
            const op = {
              books: goodreadsResult.GoodreadsResponse.search[0].result[0].work.map(
                work => ({
                  gdId: work.best_book[0].id[0]._,
                  title: work.best_book[0].title[0],
                  authors: work.best_book[0].author[0].name[0],
                  covers: [work.best_book[0].image_url[0]]
                })
              )
            }
            console.log(op);
          }
        )
      }
      });

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
