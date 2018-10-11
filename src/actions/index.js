import Api from '../utils/api'

export const sortListBy = (sortBy) => ({
  type: 'SORT_BOOKS',
  sortBy: sortBy
})

export const searchBook = (search) =>({
  type: 'SEARCH_BOOK_BY_NAME',
  search: search
})

export const changeListOrder = () => ({
  type: 'CHANGE_BOOKS_ORDER'
})

export const changeListPage = (skip) => ({
  type: 'CHANGE_BOOKS_PAGE',
  skip: skip
})

export const requestBooks = () => ({
  type: 'REQUEST_BOOKS'
})

export const receiveBooksSuccessful = (data) => ({
  type: 'RECEIVE_BOOKS_SUCCESS',
  books: data
})

export const receiveBooksFailed = (errorMsg) => ({
  type: 'RECEIVE_BOOKS_ERROR',
  error: errorMsg
})

export const fetchBooks = (dispatch, query) => {
  dispatch(requestBooks())
  const api = new Api()

  return api.getBooks(query)
    .then(data => dispatch(receiveBooksSuccessful(data)))
    .catch((e) => dispatch(receiveBooksFailed(e)))
    
}