import { db } from "../config/confing";

export const getAuthors = () => new Promise((resolve, reject) => {
    const consulta = "SELECT * FROM authors";
    db.query(consulta)
        .then(([rows]) => resolve(rows))
        .catch((error) => reject(error));
});

export const createAuthor = (author: any) => new Promise((resolve, reject) => {
    const consulta = "INSERT INTO authors (name, age) VALUES (?, ?)";
    db.query(consulta, [author.name, author.age])
        .then(([result]) => resolve(result))
        .catch((error) => reject(error));
});