import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BooksList from './components/BooksList';
import SearchBar from './components/SearchBar';
import NotFound from './components/NotFound';

class BooksApp extends React.Component {
  state = {
    library: [],
    searched_books_library: [],
    query: "",
    error: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(booksList => {
        this.setState(() => ({
          library: booksList
        }))
      })
  }

  moveBookToShelf = (book, shelf) => {
    const updated_library = this.state.library.map(
      currBook => {
        if(currBook.id === book.id) {
          book.shelf = shelf
        }  
        return currBook
      })
      
      BooksAPI.update(book, shelf)
        .then( booksList => {
              this.setState(() => ({
                library: updated_library
        }))
        console.log("bookslist", booksList)  
      }) 
  }

  filterBy = (booksArray, query) => {
    return booksArray.filter(b => {
      return b.title.toLowerCase().includes(query.toLowerCase()) || 
             b.authors.map(a => {
               return a.toLowerCase().includes(query.toLowerCase())
             }) 
      }
    )
  }
  updateQuery = (query) => {
    console.log("query: ", query)
    if(query.length > 0) {
      BooksAPI.search(query)
      .then( books => {
        if (books.error) {
          console.log("books.error => ", books.error)
          this.setState({ searched_books_library: [], error: true });
        } else {
          this.filterBy(books, query)
          this.setState({ searched_books_library: books, error: false });
        }
      })
    } else {
      console.log(this.state.searched_books_library)
      this.setState({ searched_books_library: [] });
    }
    
  }

  render() {
    const booksShelf = [
      { key: 'currentlyReading', title: 'Currently Reading' },
      { key: 'wantToRead', title: 'Want to Read' },
      { key: 'read', title: 'Have Read' },
    ]

    const { library, searched_books_library, error } = this.state
    return(
      <div className="app">
        <div className="wrapper">
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <Switch>
            <Route exact path="/" render={() => (
              <BooksList books={library} 
                        shelves={booksShelf} 
                        onMove={this.moveBookToShelf}/>
            )} />
            <Route exact path="/search" render={() => (
                <SearchBar S_books={searched_books_library} 
                          books={library}
                          onMove={this.moveBookToShelf}
                          searchQuery={this.state.query}
                          onUpdateQuery={this.updateQuery}
                          hasError={error} />
            )} />
            <Route path="*" component={NotFound} />
          </Switch>
          <footer>
            <p> MyReads – A Book Tracking App </p>
            <p> Show project on <a href="#">Github</a></p>
            <p> © 2021 </p>
          </footer>
        </div>  
      </div>
    )
  }
}

export default BooksApp
