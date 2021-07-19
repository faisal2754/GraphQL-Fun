import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { Icon, List, Grid, Button, Container } from 'semantic-ui-react'
import { GET_BOOKS } from '../queries/queries'
import BookDetails from './BookDetails'

const BookList = () => {
   const displayBooks = (bookArr) => {
      return bookArr.books.map((book) => {
         return (
            <Button
               key={book.id}
               onClick={(_) => {
                  setSelectedBook(book.id)
               }}
            >
               <Icon name="book" />
               {book.name}
            </Button>
         )
      })
   }

   const [selectedBook, setSelectedBook] = useState('')
   const { loading, error, data } = useQuery(GET_BOOKS)

   if (loading) return <div>Loading...</div>
   if (error) return <div>Error</div>
   return (
      <Grid>
         <Grid.Row stretched>
            <Grid.Column width={8}>
               <ul id="book-list">{displayBooks(data)}</ul>
            </Grid.Column>
            <Grid.Column width={8} color="yellow">
               {selectedBook && <BookDetails selectedBook={selectedBook} />}
            </Grid.Column>
         </Grid.Row>
      </Grid>
   )
}

export default BookList
