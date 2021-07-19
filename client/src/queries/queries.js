import { gql } from '@apollo/client'

const GET_BOOKS = gql`
   {
      books {
         id
         name
      }
   }
`

const GET_BOOK = gql`
   query ($id: ID) {
      book(id: $id) {
         name
         genre
         author {
            id
            name
            age
            books {
               id
               name
            }
         }
      }
   }
`

const GET_AUTHORS = gql`
   {
      authors {
         id
         name
      }
   }
`

const ADD_BOOK = gql`
   mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
      addBook(name: $name, genre: $genre, authorId: $authorId) {
         id
         name
      }
   }
`

export { GET_BOOKS, GET_BOOK, GET_AUTHORS, ADD_BOOK }
