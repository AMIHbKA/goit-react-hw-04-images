import React, { useState } from 'react';
// import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from 'UI/GlobalStyles/GlobalStyles';
import { AppContainer } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, set1TotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = newQuery => {
    if (query === newQuery) {
      toast(
        `Information about the query "${newQuery}" has already been submitted!`,
        { icon: '🙃' }
      );

      return null;
    }

    setQuery(newQuery);
    setPage(1);
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <Searchbar onSearch={onSearch} />
      {/* <ImageGallery query={query} /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            color: '#3f51b5',
            fontSize: '1.2em',
          },
          duration: 3000,
        }}
      />
    </AppContainer>
  );
};
