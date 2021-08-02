import React from 'react';
import PropTypes from 'prop-types';
import styled from '../assets/styles/bookCard.module.scss';

export default function BookCard(props) {
  const {
    book: {
      id: bookId,
      volumeInfo: {
        authors: author,
        imageLinks: { thumbnail = '' } = { thumbnail: undefined },
        title,
      },
    },
  } = props;

  return (
    <div className={styled.book} key={bookId}>
      <img
        className={styled.book_img}
        src={thumbnail !== undefined ? thumbnail : 'img not available'}
        alt={
          title && thumbnail === undefined
            ? 'image not available'
            : `image not found ${title}`
        }
      />
      <div className={styled.book_text}>
        <h2 className={styled.book_title}>{title || 'not found'}</h2>
        <h3 className={styled.book_author}>{author || 'not found'}</h3>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};
