import { db } from "../config/confing";

export const getBooks = () => new Promise((resolve, reject) => {
    const consulta = "SELECT * FROM books";
    db.query(consulta)
        .then(([rows]) => resolve(rows))
        .catch((error) => reject(error));
});

export const getBook = (_: any, { id }: any) => {
    getBooks()
        .then((books: any) => {
            const book = books.find((book: any) => book.id === id);
            return book || null;
        })
        .catch((error: any) => {
            throw error;
        });
};

export const createBook = (book: any) => new Promise((resolve, reject) => {
    const consulta = "INSERT INTO books (title, author_id, stock, price) VALUES (?, ?, ?, ?)";
    db.query(consulta, [book.title, book.author, book.stock, book.price])
        .then(([result]) => resolve(result))
        .catch((error) => reject(error));
});

export const updateBook = (book: any) => new Promise((resolve, reject) => {
    const consulta = "UPDATE books SET title = ?, author_id = ?, stock = ?, price = ? WHERE id = ?";
    db.query(consulta, [book.title, book.author, book.stock, book.price, book.id])
        .then(([result]) => resolve(result))
        .catch((error) => reject(error));
});

export const deleteBook = (id: number) => new Promise((resolve, reject) => {
    const consulta = "DELETE FROM books WHERE id = ?";
    db.query(consulta, [id])
        .then(([result]) => resolve(result))
        .catch((error) => reject(error));
});
