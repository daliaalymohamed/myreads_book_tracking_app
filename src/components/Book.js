import React, { Component } from 'react'
import PropTypes from 'prop-types'
import addImage from '../icons/add.svg'

class Book extends Component { 
    static propTypes = {
        changeShelf: PropTypes.func,
        book: PropTypes.object.isRequired
    }

    state = {
        option: this.props.book.shelf
    }   

    handleSelect = (event) => {
        this.setState({
            option: event.target.value
        })
        this.props.changeShelf(this.props.book, event.target.value)
    }
    render() {
        const { book } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, 
                                                    backgroundImage: `url(${book.imageLinks
                                                                            ? book.imageLinks.smallThumbnail
                                                                            : addImage})` }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select onChange={this.handleSelect} value={this.props.book.shelf}>
                                <option value="" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {
                        book.authors 
                        ? book.authors.map((author, index) => (
                            <div key={index} className="book-authors">{author}</div>
                         ))
                        : <div className="book-authors">'Unknown Author'</div>
                    }
                </div>
            </li>
        )
    }    
}

export default Book
