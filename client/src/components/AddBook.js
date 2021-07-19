import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Message, Form, Grid } from 'semantic-ui-react'
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries/queries'

const DisplayAuthors = () => {
   const { loading, error, data } = useQuery(GET_AUTHORS)

   if (loading) return <option>Loading...</option>
   //    if (error) return <div>Error</div>

   return data.authors.map((author) => {
      return (
         <option key={author.id} value={author.id}>
            {author.name}
         </option>
      )
   })
}

const AddBook = () => {
   const [bookName, setBookName] = useState('')
   const [genre, setGenre] = useState('')
   const [authorId, setAuthorId] = useState('')
   const [isError, setIsError] = useState(false)

   const [addBook] = useMutation(ADD_BOOK)

   const onSubmit = async (event) => {
      event.preventDefault()
      if (bookName && genre && authorId) {
         setIsError(false)
         await addBook({
            variables: { name: bookName, genre: genre, authorId: authorId },
            refetchQueries: [{ query: GET_BOOKS }],
            awaitRefetchQueries: true
         })
         setBookName('')
         setGenre('')
         setAuthorId('')
      } else {
         setIsError(true)
      }
   }

   return (
      <Grid>
         <Grid.Column width={3}>
            <Form onSubmit={onSubmit} error={isError} style={{ padding: 10 }}>
               <Form.Field>
                  <label>Book Name</label>
                  <input
                     value={bookName}
                     onChange={(event) => {
                        setBookName(event.target.value)
                     }}
                  />
               </Form.Field>
               <Form.Field>
                  <label>Genre</label>
                  <input
                     value={genre}
                     onChange={(event) => {
                        setGenre(event.target.value)
                     }}
                  />
               </Form.Field>
               <Form.Field
                  label="Author"
                  control="select"
                  value={authorId}
                  onChange={(event) => {
                     setAuthorId(event.target.value)
                  }}
               >
                  <option>Select an author</option>
                  {DisplayAuthors()}
               </Form.Field>
               <Message
                  error
                  header="Error"
                  content="Please fill in all the fields"
               />
               <Button primary>Add Book!</Button>
            </Form>
         </Grid.Column>
      </Grid>
   )
}

export default AddBook
