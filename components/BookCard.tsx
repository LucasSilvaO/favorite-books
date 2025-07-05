import { Book } from '@/types/Book';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const stored = localStorage.getItem('favorites') || '[]';
    const favorites = JSON.parse(stored);

    const updated = isFavorite
      ? favorites.filter((id: string) => id !== book.id)
      : [...favorites, book.id];

    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const stored = localStorage.getItem('favorites') || '[]';
    const favorites = JSON.parse(stored);
    setIsFavorite(favorites.includes(book.id));
  }, [book.id]);

  return (
    <div
      style={{
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxWidth: 280,
        backgroundColor: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      <div style={{ height: 400, position: 'relative' }}>
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : '/no-cover.png'
          }
          alt={book.volumeInfo.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="lazy"
        />
      </div>

      <div style={{ padding: 16, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            margin: '0 0 8px 0',
            color: '#222',
            minHeight: 52,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          title={book.volumeInfo.title}
        >
          {book.volumeInfo.title}
        </h2>
        <h4
          style={{
            fontWeight: 500,
            margin: '0 0 12px 0',
            color: '#666',
            fontSize: 14,
            minHeight: 36,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          title={book.volumeInfo.authors?.join(', ')}
        >
          {book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}
        </h4>

        <p
          style={{
            fontSize: 14,
            color: '#444',
            flexGrow: 1,
            marginBottom: 12,
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {book.volumeInfo.description
            ? book.volumeInfo.description.replace(/(<([^>]+)>)/gi, '').slice(0, 150) + '...'
            : 'Descrição não disponível.'}
        </p>

        <div style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>
          <p>
            <strong>Editora:</strong> {book.volumeInfo.publisher || '—'}
          </p>
          <p>
            <strong>Publicado em:</strong> {book.volumeInfo.publishedDate || '—'}
          </p>
          <p>
            <strong>Páginas:</strong> {book.volumeInfo.pageCount?.toLocaleString() || '—'}
          </p>
          <p>
            <strong>Categorias:</strong>{' '}
            {book.volumeInfo.categories?.slice(0, 2).join(', ') || '—'}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <button
            onClick={toggleFavorite}
            style={{
              cursor: 'pointer',
              backgroundColor: isFavorite ? '#e0245e' : '#ccc',
              border: 'none',
              borderRadius: 6,
              color: '#fff',
              fontWeight: '600',
              padding: '8px 14px',
              transition: 'background-color 0.3s ease',
            }}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '❤️ Favorito' : '🤍 Favoritar'}
          </button>

          <Link href={`/books/${book.id}`} legacyBehavior>
            <a
              style={{
                color: '#0070f3',
                fontWeight: '600',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Ver Mais
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
