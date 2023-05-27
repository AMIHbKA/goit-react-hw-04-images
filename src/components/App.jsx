import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from 'UI/GlobalStyles/GlobalStyles';
import { AppContainer } from './App.styled';
import * as API from 'services/api/api';
import { Loader } from './Loader/Loader';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

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

  const onLoadMore = () => {
    setPage(state => state + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchImages() {
      try {
        setIsLoading(true);
        const response = await API.imageSearch(query, page);
        const { hits: responseHits, total, totalHits } = response;

        if (page === 1) {
          setHits(responseHits);
          setTotalHits(totalHits);
          if (total) {
            toast.success(
              `Great! The "${query}" request was successful. ${total} images were found!`,
              { style: { backgroundColor: 'green', color: '#fff' } }
            );
          } else {
            toast(`Sorry. No images were found for your query "${query}"!`, {
              icon: '😥',
              style: { backgroundColor: 'red', color: '#fff' },
            });
          }
        } else {
          setHits(state => [...state, ...responseHits]);

          setTimeout(() => {
            window.scrollBy({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }, 200);
        }
      } catch (error) {
        toast.error(error.message, {
          style: { backgroundColor: 'red', color: '#fff' },
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [page, query]);

  useEffect(() => {
    if (!totalHits) {
      return;
    }

    setShowButton(totalHits !== hits.length && !isLoading);

    const isLastPage = hits.length >= totalHits;
    if (isLastPage) {
      toast(`You have reached the last page!`, {
        icon: '😅',
        style: { backgroundColor: '#3f51b5', color: '#fff' },
        position: 'bottom-center',
      });
    }
  }, [hits, isLoading, totalHits]);

  return (
    <AppContainer>
      <GlobalStyle />
      <Searchbar onSearch={onSearch} />
      <ImageGallery hits={hits} />
      <Loader isLoading={isLoading} />
      <Button onLoad={onLoadMore} isShow={showButton} />
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
