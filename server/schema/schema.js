const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/Book')
const Author = require('../models/Author')

const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLSchema,
   GraphQLID,
   GraphQLInt,
   GraphQLList,
   GraphQLNonNull
} = graphql

const books = [
   { name: 'Horrid Henry', genre: 'kid', id: '1', authorId: '1' },
   { name: 'Diary of a Wimpy Kid', genre: 'teen', id: '2', authorId: '2' },
   { name: 'Goosebumps', genre: 'adult', id: '3', authorId: '3' },
   { name: 'Kite Runner', genre: 'adult', id: '4', authorId: '3' },
   { name: 'Life of Pi', genre: 'adult', id: '5', authorId: '1' },
   { name: 'Hunger Games', genre: 'adult', id: '6', authorId: '2' }
]

const authors = [
   { name: 'Simon Something', age: 44, id: '1' },
   { name: 'Jeff ~Kinney', age: 25, id: '2' },
   { name: 'R.L. Stine', age: 58, id: '3' }
]

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
         type: AuthorType,
         resolve(parent, args) {
            // return _.find(authors, { id: parent.authorId })
            return Author.findById(parent.authorId)
         }
      }
   })
})

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            // return _.filter(books, { authorId: parent.id })
            return Book.find({ authorId: parent.id })
         }
      }
   })
})

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      book: {
         type: BookType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            // return _.find(books, { id: args.id })
            return Book.findById(args.id)
         }
      },
      author: {
         type: AuthorType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            // return _.find(authors, { id: args.id })
            return Author.findById(args.id)
         }
      },
      books: {
         type: GraphQLList(BookType),
         resolve(parent, args) {
            return Book.find({})
         }
      },
      authors: {
         type: GraphQLList(AuthorType),
         resolve(parent, args) {
            return Author.find({})
         }
      }
   }
})

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addAuthor: {
         type: AuthorType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            let author = new Author({
               name: args.name,
               age: args.age
            })
            return author.save()
         }
      },
      addBook: {
         type: BookType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            genre: { type: new GraphQLNonNull(GraphQLString) },
            authorId: { type: new GraphQLNonNull(GraphQLID) }
         },
         resolve(parent, args) {
            let book = new Book({
               name: args.name,
               genre: args.genre,
               authorId: args.authorId
            })
            return book.save()
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
})
