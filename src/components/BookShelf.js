import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book';

const BookShelf = (props) => {
        const { shelf, books, onMovingBook } = props;
        //console.log("shelf => ", shelf)
        const books_in_shelf = books.filter(book => book.shelf === shelf.key)
    
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books_in_shelf.length > 0 
                            ?
                                books_in_shelf.map(book => (
                                    <Book key={book.id} book={book} changeShelf={onMovingBook}/>
                                ))
                            : <p style={{fontSize: '20px', fontWeight: 'bolder', color: '#2e7c31'}}>No books available on this shelf</p>
                        }
                    </ol>
                </div>
                </div>
        )
}

BookShelf.propTypes = {
    shelf: PropTypes.object,
    books: PropTypes.array.isRequired,
    onMovingBook: PropTypes.func.isRequired
}

export default BookShelf
