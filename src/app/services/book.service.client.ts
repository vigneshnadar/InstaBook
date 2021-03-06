export class BookServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section'
  BOOK_URL = 'http://localhost:4000/api/book'

  // findSectionsForStudent() {
  //   const url = 'http://localhost:4000/api/student/section';
  //
  //   return fetch(url,{
  //     credentials: 'include'
  //   })
  //     .then(response => response.json());
  // }

  findBooksForReader() {
      const url = 'http://localhost:4000/api/reader/book';

      return fetch(url, {
        credentials: 'include'
      })
        .then(response => response.json());
    }


  bookmarkUserInBook(bookId) {
    const url = 'http://localhost:4000/api/book/' + bookId + '/bookmark';

    return fetch(url , {
      method: 'POST',
      credentials: 'include'
    });
  }

  // app.get('/api/book/:bookId/review', findReviewsForBook)
  // app.post('/api/:bookId/review', addReview)


  findReviewsForBook(bookId) {
    const url = 'http://localhost:4000/api/book/' + bookId + '/review';
    return fetch(url , {

      credentials: 'include'
    })
      .then(response => response.json());
  }
  addReview(bookId, currentReview) {
    const url = 'http://localhost:4000/api/' + bookId + '/review';
    const rev = {
      review : currentReview
    }

    return fetch(url , {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(rev),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  findBookByTitle(title) {
    const url = 'http://localhost:4000/api/book/title/' + title;

    return fetch(url , {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json());
  }

  findBookByAuthor() {
    const url = 'http://localhost:4000/api/book/author';

    return fetch(url , {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json());
  }



  // unenrollStudentInSection(sectionId) {
  //   const url = 'http://localhost:4000/api/section/' + sectionId + '/unenrollment';
  //
  //   return fetch(url , {
  //     method: 'POST',
  //     credentials: 'include'
  //   });
  // }
  //
  // deleteSection(sectionId) {
  //   const url = 'http://localhost:4000/api/section/' + sectionId;
  //
  //   return fetch(url , {
  //     method: 'DELETE',
  //     credentials: 'include'
  //   });
  // }



  updateBook( bookId, book) {
    const url = 'http://localhost:4000/api/book/' + bookId + '/update';
    return fetch(url , {
      method: 'PUT',
      body: JSON.stringify(book),
      credentials: 'include',
      headers: {
        'content-type' : 'application/json'
      }
    })
      .then(response => response.json());
  }
  // editSection(sectionId, name, seats) {
  //   const url = 'http://localhost:4000/api/section/' + sectionId;
  //   const section = { name, seats};
  //
  //   return fetch(url , {
  //     method: 'PUT',
  //     body: JSON.stringify(section),
  //     credentials: 'include',
  //     headers: {
  //       'content-type' : 'application/json'
  //     }
  //   });
  // }
  //
  // findSectionsForCourse(courseId) {
  //   return fetch(this.SECTION_URL.replace('COURSEID', courseId))
  //     .then(response => response.json());
  // }



  createBook(newBook) {

    return fetch(this.BOOK_URL , {
      method: 'POST',
      body: JSON.stringify(newBook),
      credentials: 'include',
      headers: {
        'content-type' : 'application/json'
      }
    }).then(response => response.json());
  }


  deleteBook(bookId) {
    const url = 'http://localhost:4000/api/book/' + bookId + '/delete';
    return fetch(url , {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => response.json());
  }
}
