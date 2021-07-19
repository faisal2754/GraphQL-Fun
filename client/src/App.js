import React, { useState } from 'react'
import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider,
   useQuery,
   gql
} from '@apollo/client'
import GoogleFontLoader from 'react-google-font-loader'
import BookList from './components/BookList'
import AddBook from './components/AddBook'

const client = new ApolloClient({
   uri: 'http://localhost:5000/graphql',
   cache: new InMemoryCache()
})

const App = () => {
   const [bookId, setBookId] = useState('')
   const blerea = 5

   return (
      <>
         <GoogleFontLoader
            fonts={[
               {
                  font: 'Roboto',
                  weights: [400, '400i']
               },
               {
                  font: 'Roboto Mono',
                  weights: [400, 700]
               }
            ]}
         />
         <ApolloProvider client={client}>
            <div className="main">
               <h1>Reading List</h1>
               <BookList />
               <AddBook />
            </div>
         </ApolloProvider>
      </>
   )
}

export default App
