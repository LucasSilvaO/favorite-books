export const fetchBooks = async (query: string = 'harry potter') => {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  const data = await res.json();
  return data.items || [];
};

export const fetchBookById = async (id: string) => {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  if (!res.ok) {
    throw new Error('Livro não encontrado');
  }
  const data = await res.json();
  return data;
}
