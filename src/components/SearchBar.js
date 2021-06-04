import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book';

class SearchBar extends Component {
    static propTypes = {
        S_books: PropTypes.array,
        books: PropTypes.array,
        onMove: PropTypes.func,
        hasError: PropTypes.bool
    }

    state = {
        value: "",
    }

    handleChange = (val) => {
        this.setState({
            value: val.trim()
        })
        this.props.onUpdateQuery(this.state.value)   
    }
    render () {
        const { value } = this.state;
        const { S_books, books, onMove, hasError } = this.props;

        const showingBooks = S_books.map(s_book => {
            //console.log("S_book => ", s_book)
            books.map(book => {
                if(book.id === s_book.id) {
                    //console.log("book.shelf => ", book.shelf)
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
                               value={value}
                               onChange={(event) => this.handleChange(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { 
                            showingBooks.length > 0 && (showingBooks.map(s_book => (
                                <Book key={s_book.id} book={s_book} shelf={s_book.shelf} changeShelf={onMove}/>
                            )))   
                        }
                        { hasError && (<h3 style={{fontSize: '20px', fontWeight: 'bolder', color: '#2e7c31'}}>Search returned no books. Please try again !</h3>)}
                    </ol>
                </div>
           </div>
        )
    }
    
}

export default SearchBar
