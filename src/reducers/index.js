//import { combineReducers } from 'redux'

const defaultState = {
  listOfBooks: [],
  query: {
    sortBy: 'author',
    order: 1,
    skip: 0,
    limit: 3,
    search: ''
  },
  isFetching: false
}

const booksList = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case 'REQUEST_BOOKS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_BOOKS_SUCCESS':
      const nextState = {
        ...state,
        isFetching: false,
        listOfBooks: action.books,
      }
      if (nextState.fetchError) delete nextState.fetchError
      return nextState
    case 'RECEIVE_BOOKS_ERROR':
      return {
        ...state,
        isFetching: false,
        fetchError: action.error
      }
    case 'SEARCH_BOOK_BY_NAME':
      return {
        ...state,
        query: {
          ...state.query,
          search: action.search
        }
      }
    case 'SORT_BOOKS':
      return {
        ...state,
        query: {
          ...state.query,
          sortBy: action.sortBy
        }
      }
    case 'CHANGE_BOOKS_PAGE':
      return {
        ...state,
        query: {
          ...state.query,
          skip: action.skip
        }
      }
    case 'CHANGE_BOOKS_ORDER':
      return {
        ...state,
        query: {
          ...state.query,
          order: -state.query.order
        }
      }
    default:
      return state
  }
}

const rootReducer = booksList

export default rootReducer