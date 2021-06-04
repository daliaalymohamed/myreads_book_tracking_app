import React, { Component } from 'react'
import PropTypes from 'prop-types'
import addImage from '../icons/add.svg'

class Book extends Component { 
    static propTypes = {
        shelf: PropTypes.object,
        changeShelf: PropTypes.func,
        book: PropTypes.object.isRequired
    }

    state = {
        option: this.props.shelf
    }   

    handleSelect = (event) => {
        //console.log("event => ", event.target.value)
        this.setState({
            option: event.target.value
        }, () => console.log("after change shelf => ", this.state.option))
        this.props.changeShelf(this.props.book, event.target.value)
    }
    render() {
        const { book } = this.props;
        console.log("book => ", book)
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
                            <select onChange={this.handleSelect} defaultValue={'move'}>
                                <option value="move" disabled>
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
