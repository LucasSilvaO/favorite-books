import { GetServerSideProps } from 'next';
import React from 'react';
import { Book } from '@/types/Book';
import Head from 'next/head';
import { fetchBookById } from '@/utils/fetchBooks';

type BookDetailsProps = {
  book: Book | null;
};

const BookDetails = ({ book }: BookDetailsProps) => {
  if (!book) return <p style={{ textAlign: 'center', marginTop: 50 }}>Livro não encontrado.</p>;

  const {
    title,
    authors,
    description,
    publisher,
    publishedDate,
    pageCount,
    categories,
    averageRating,
    ratingsCount,
    imageLinks,
    infoLink,
    previewLink,
  } = book.volumeInfo;

  // Alguns links extras
  const buyLink = book.saleInfo?.buyLink || null;
  const epubSample = book.accessInfo?.epub?.acsTokenLink || null;
  const pdfSample = book.accessInfo?.pdf?.acsTokenLink || null;
  const webReaderLink = book.accessInfo?.webReaderLink || null;

  return (
    <>
      <Head>
        <title>{title} - Detalhes do Livro</title>
        <meta name="description" content={`Detalhes do livro ${title} por ${authors?.join(', ')}`} />
      </Head>
      <main
        style={{
          maxWidth: 900,
          margin: '40px auto',
          padding: 20,
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          borderRadius: 12,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: '#fff',
        }}
      >
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flexShrink: 0 }}>
            <img
              src={imageLinks?.thumbnail || '/no-image.png'}
              alt={title}
              style={{
                width: 250,
                height: 350,
                objectFit: 'cover',
                borderRadius: 12,
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              }}
            />
          </div>
          <div style={{ flexGrow: 1, minWidth: 250 }}>
            <h1 style={{ marginBottom: 10, color: '#222' }}>{title}</h1>
            <h3 style={{ marginTop: 0, marginBottom: 20, color: '#555' }}>
              {authors ? authors.join(', ') : 'Autor desconhecido'}
            </h3>

            {averageRating && ratingsCount && (
              <p style={{ marginBottom: 20, color: '#888' }}>
                ⭐ {averageRating} ({ratingsCount} avaliação{ratingsCount > 1 ? 'es' : ''})
              </p>
            )}

            <section
              style={{
                marginBottom: 20,
                lineHeight: 1.6,
                color: '#333',
                fontSize: 16,
                whiteSpace: 'pre-wrap',
              }}
              dangerouslySetInnerHTML={{ __html: description || 'Descrição não disponível.' }}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 16,
                fontSize: 15,
                color: '#444',
                marginBottom: 25,
              }}
            >
              <div>
                <strong>Editora:</strong> <br />
                {publisher || '—'}
              </div>
              <div>
                <strong>Publicado em:</strong> <br />
                {publishedDate || '—'}
              </div>
              <div>
                <strong>Páginas:</strong> <br />
                {pageCount ? pageCount.toLocaleString() : '—'}
              </div>
              <div>
                <strong>Categorias:</strong> <br />
                {categories ? categories.join(', ') : '—'}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {buyLink && (
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  Comprar por R${book.saleInfo.listPrice.amount.toFixed(2)}
                </a>
              )}

              {webReaderLink && (
                <a
                  href={webReaderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#2196F3',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  Ler no Google Books
                </a>
              )}

              {epubSample && (
                <a
                  href={epubSample}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#9C27B0',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  Baixar amostra EPUB
                </a>
              )}

              {pdfSample && (
                <a
                  href={pdfSample}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#FF5722',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  Baixar amostra PDF
                </a>
              )}
            </div>

            <div style={{ marginTop: 30 }}>
              <a
                href={infoLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#555', fontSize: 13, textDecoration: 'underline' }}
              >
                Mais informações
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};


export async function getServerSideProps(context: any) {
  const { id } = context.params;

  // Aqui você pode buscar os dados do livro, ex:
  // Se você tem uma API, pode chamar: fetch(`https://api.meusite.com/books/${id}`)
  // Vou deixar um exemplo simples simulando um fetch
  
  const book: Book | null = await fetchBookById(id)
  
  
  
  // Retorne book como props:
  return { props: { book } };
}

export default BookDetails;
