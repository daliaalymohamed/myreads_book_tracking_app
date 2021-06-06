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
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(booksList => {
        this.setState(() => ({
          library: booksList
        }))
      })
      .catch(err => {
        console.log(err)
      })
  }

  moveBookToShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
      .then((booksList) =>{
        // Change the shelf property of the book object to new Shelf.
        book.shelf = newShelf
        //  Get the previous state book array without current book & add it to the new updated books array
        let updated_library = this.state.library.filter((resultBook) =>resultBook.id !== book.id)
        updated_library.push(book)
        // Set the new state with Updated Books array
        this.setState({library: updated_library})
      })
  }

  render() {
    const booksShelf = [
      { key: 'currentlyReading', title: 'Currently Reading' },
      { key: 'wantToRead', title: 'Want to Read' },
      { key: 'read', title: 'Have Read' },
    ]

    const { library } = this.state
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
                <SearchBar books={library}
                           onMove={this.moveBookToShelf}/>
            )} />
            <Route path="*" component={NotFound} />
          </Switch>
          <footer>
            <p> MyReads – A Book Tracking App </p>
            <p> Show project on <a href="https://github.com/daliaalymohamed/myreads_book_tracking_app">Github</a></p>
            <p> © 2021 </p>
          </footer>
        </div>  
      </div>
    )
  }
}

export default BooksApp
