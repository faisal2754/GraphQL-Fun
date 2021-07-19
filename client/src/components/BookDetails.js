import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOK } from '../queries/queries'

const BookDetails = ({ selectedBook }) => {
   const { loading, data, error } = useQuery(GET_BOOK, {
      variables: { id: selectedBook }
   })

   if (loading) return <div>Loading...</div>
   if (error) {
      console.log(error)
   }

   const { book } = data

   return (
      <div>
         <h2>{book.name}</h2>
         <p>{book.genre}</p>
         <p>{book.author.name}</p>
         <p>All books by this author:</p>
         <ul>
            {book.author.books.map((book) => {
               return <li key={book.id}>{book.name}</li>
            })}
         </ul>
      </div>
   )
}

export default BookDetails
