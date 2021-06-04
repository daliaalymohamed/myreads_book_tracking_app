import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class BooksList extends Component {
    static propTypes = {
        shelves: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        onMove: PropTypes.func.isRequired
    }
    
    render () {
        const { shelves, books, onMove } = this.props;
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-content">
                        <div>
                            {
                                shelves.map(shelf => (
                                    //console.log("shelf => ", shelf),
                                    <BookShelf key={shelf.key} shelf={shelf} books={books} onMovingBook={onMove}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search"><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
    
}

export default BooksList
