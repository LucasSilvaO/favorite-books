import { useEffect, useState } from 'react';
import { fetchBooks } from '../utils/fetchBooks';
import { BookCard } from '../components/BookCard';
import SearchBar from '@/components/SearchBar';
import { Book } from '@/types/Book';

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };

    getBooks();
  }, []);

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#222',
        }}
      >
        Lista de Livros
      </h1>

        <SearchBar setBooks={setBooks} />


      <section
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          gap: '1.5rem',
        }}
      >
        {books.length === 0 && (
          <p style={{ textAlign: 'center', color: '#555', gridColumn: '1/-1' }}>
            Nenhum livro encontrado. Tente buscar algo acima.
          </p>
        )}

        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </main>
  );
};

export default Home;
