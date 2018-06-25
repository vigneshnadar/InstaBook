import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {CourseServiceClient} from '../services/course.service.client';
import {UserServiceCleint} from '../services/user.service.cleint';
import {BookServiceClient} from '../services/book.service.client';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})

export class AuthorPageComponent implements OnInit {


  courseId = '';
  bookName = '';
  bookDesc = '';
  bookUrl = '';
  books = [];
  isAdmin = true;
  selectedSection;
  currentCourse;
  currentUser;
  currentBookId = 0;

  constructor(private route: ActivatedRoute,
              private bookService: BookServiceClient,
              private router: Router,
              private courseService: CourseServiceClient,
              private userService: UserServiceCleint) {

    // this.route.params.subscribe(params => this.loadSections(params['courseId']));
    // this.route.params.subscribe(params => {
    //   this.courseId = params['courseId'];
    //   this.courseService.findCourseById(this.courseId)
    //     .then(course => {
    //       this.currentCourse = course;
    //       this.sectionName = course.title + ' Section 1';
    //     });
    // });


    this.userService.profile()
      .then(user => {
        // this.user = user;
        console.log(user._id);


        this.userService.findUserById(user._id)
          .then(newuser => {
            // this.user = newuser;
            console.log('user');
            console.log(newuser);
            this.currentUser = newuser
            this.isAdmin = newuser.admin;
          });

        this.loadBooks();
      });
  } // end of constrcutor


  // http://books.google.com/books/content?id=wK0xBWfL9GkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
  editBook(bookid, bookname, bookdescription, bookimageurl) {
    this.currentBookId = bookid;
    this.bookName = bookname;
    this.bookDesc = bookdescription;
    this.bookUrl = bookimageurl;
}

  deleteBook(bookid) {
    this.bookService.deleteBook(bookid)
      .then(response => {
        this.loadBooks();
      });
}


  createBook(name, description, imgurl) {
    // create a book and then bookmark it
    const newBook = {
      name: name,
      description: description,
      imageurl: imgurl,
      author: this.currentUser._id
    }
    console.log(newBook);
    // alert(section._id);
    this.bookService.createBook(newBook)
      .then(createdBook => {
        console.log(createdBook);
        this.loadBooks();
      });
  }

  loadBooks() {
    this.bookService.findBookByAuthor()
      .then(books => this.books = books);
  }
  // createSection(sectionName, seats) {
  //   this.sectionService.createSection(this.courseId, sectionName, seats)
  //     .then(() => {
  //       this.loadSections(this.courseId);
  //     });
  // }



  // populateField(id, name, seats) {
  //   this.sectionName = name;
  //   this.seats = seats;
  //   this.selectedSection = id;
  // }

  // deleteSection(sectionName, seats) {
  //   this.sectionService.createSection(this.courseId, sectionName, seats)
  //     .then(() => {
  //       this.loadSections(this.courseId);
  //     });
  // }

  ngOnInit() {
  }


  // enroll(section) {
  //   console.log(section);
  //   // alert(section._id);
  //   this.sectionService.enrollStudentInSection(section._id)
  //     .then(() => {
  //       this.router.navigate(['profile']);
  //     });
  // }




  // unenroll(section) {
  //   console.log(section);
  //   alert(section._id);
  //   this.sectionService.unenrollStudentInSection(section._id)
  //     .then(() => {
  //       this.router.navigate(['profile']);
  //     });
  // }


  // deleteSection(section) {
  //   console.log(section);
  //   alert(section._id);
  //   this.sectionService.deleteSection(section._id)
  //     .then(() => {
  //       this.loadSections(this.courseId);
  //     });
  // }
  //
  //
  // editSection(sectionName, seats) {
  //   // console.log(section);
  //   alert(this.selectedSection);
  //   this.sectionService.editSection( this.selectedSection, sectionName, seats)
  //     .then(() => {
  //       this.loadSections(this.courseId);
  //     });
  // }

}

