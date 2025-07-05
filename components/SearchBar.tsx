import { useState, Dispatch, SetStateAction } from 'react';
import { fetchBooks } from '@/utils/fetchBooks';
import { Book } from '../types/Book';

interface SearchBarProps {
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

export default function SearchBar({ setBooks }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const searchBooks = async () => {
    if (!query.trim()) return;

    try {
      const booksData = await fetchBooks(query);
      if (booksData.length === 0) {
        throw new Error('Livros não encontrados');
      }
      setBooks(booksData);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks();
  };

  return (
    <section
      style={{
        padding: '2.5rem',
        maxWidth: 480,
        margin: '0 auto',
        marginBottom: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#222',
          textAlign: 'center',
        }}
      >
        🔍 Buscar Livros
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Digite o nome do livro"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: 8,
            border: '1.5px solid #ccc',
            outlineColor: '#0070f3',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0070f3')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
          autoComplete="off"
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}
          aria-label="Buscar livros"
        >
          Buscar
        </button>
      </form>
    </section>
  );
}
