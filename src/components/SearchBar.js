import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book';
import * as BooksAPI from '../BooksAPI'

class SearchBar extends Component {
    static propTypes = {
        books: PropTypes.array,
        onMove: PropTypes.func,
    }

    state = {
        searched_books_library: [],
        query: "",
        error: false
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
        if(query.length > 0) {
          BooksAPI.search(query)
          .then( books => {
            if (books.error) {
              this.setState({ searched_books_library: [], error: true });
            } else {
              this.filterBy(books, query)
              this.setState({ searched_books_library: books, error: false });
            }
          })
        } else {
          this.setState({ searched_books_library: [] });
        }
        
      }

    handleChange = (val) => {
        this.setState({
            query: val
        })
        this.updateQuery(val)
    }
    render () {
        const { query, searched_books_library, error } = this.state;
        const { books, onMove } = this.props;

        const showingBooks = searched_books_library.map(s_book => {
            books.map(book => {
                if(book.id === s_book.id) {
                    s_book.shelf = book.shelf
                }
                return book;
            })
            return s_book
        })

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" 
                               placeholder="Search by title or author"
                               value={query}
                               onChange={(event) => this.handleChange(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { 
                            showingBooks.length > 0 && (showingBooks.map(s_book => (
                                <Book key={s_book.id} 
                                      book={s_book} 
                                      shelf={s_book.shelf ? s_book.shelf : 'none'}  
                                      changeShelf={onMove}/>
                            )))   
                        }
                        { error && (<h3 style={{fontSize: '20px', fontWeight: 'bolder', color: '#2e7c31'}}>Search returned no books. Please try again !</h3>)}
                    </ol>
                </div>
           </div>
        )
    }
    
}

export default SearchBar
