import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getBook ,getBooks, createBook, deleteBook, updateBook } from "./repocitories/Books";
import { getAuthors, createAuthor } from "./repocitories/Authors";

const typeDefs = `
  type Book {
    id: ID,
    title: String,
    author: Int,
    stock: Int,
    price: Float,
  }

  type Author {
    id: ID,
    name: String,
    age: Int,
  }
  
  input BookInput { 
    title: String,
    author: Int,
    stock: Int,
    price: Float,
  }

  input AuthorInput {
    id:Int,
    name: String,
    age: Int,
  }

  type Query {
    books: [Book]
    book(id: ID): Book
    authors: [Author]
  }

  type Mutation {
    createBook(book: BookInput): Book
    createAuthor(author: AuthorInput): Author
    updateBook(id: ID, book: BookInput): Book
    deleteBook(id: ID): [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => getBooks(),
    book: (_: any, { id }: any) => getBook(_, id),
    authors: () => getAuthors(),
  },
  Mutation: {
    createBook: (_: any, { book }: any) => createBook(book),
    createAuthor: (_: any, { author }: any) => createAuthor(author),
    updateBook: (_: any, { id, book }: any) => updateBook({ id, ...book }),
    deleteBook: (_: any, { id }: any) => deleteBook(id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = parseInt(process.env.PORT || "4000");

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });
  console.log("Servidor corriendo en " + url);
})();
console.log("OK!");
