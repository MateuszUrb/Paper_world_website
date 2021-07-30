import React from 'react';
import styled from '../assets/styles/bookCard.module.scss';
/* eslint-disable react/prop-types */

export default function BookCard(props) {
  const { book } = props;
  // using this method of destructing because i have weird error while using destruction in function props
  const bookImg = book?.volumeInfo?.imageLinks?.thumbnail || '';
  const bookId = book?.id;
  const author = book?.volumeInfo?.authors;
  const title = book?.volumeInfo?.title;
  return (
    <div className={styled.book} key={bookId}>
      <img
        className={styled.book_img}
        src={bookImg !== undefined ? bookImg : 'img not available'}
        alt={
          title && bookImg === undefined
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
