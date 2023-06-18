import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { fetchQuery } from 'servises/fetchQuery';
import { toast } from 'react-toastify';
import { Gallery } from 'components/ImageGallery/imageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({ search }) => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [hiddenLoadMore, setHiddenLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hits, setHits] = useState(0);

  const valueRef = useRef(true);
  const prevValue = useRef('');

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoaded(true);
    setHiddenLoadMore(false);
  };

  const reset = () => {
    setPictures([]);
    setPage(1);
    setHiddenLoadMore(false);
    setTotalCount(0);
    setIsLoaded(true);
    setHits(0);
  };

  useEffect(() => {
    if (search) {
      if (search !== prevValue.current) {
        reset();
        valueRef.current = true;
      }
      fetchQuery(search, page)
        .then(response => {
          if (response.hits.length === 0) {
            if (valueRef.current) {
              throw new Error();
            }
          } else {
            setIsLoaded({ isLoaded: true });
            setPictures(prevPictures => [...prevPictures, ...response.hits]);
            setHiddenLoadMore(true);
            setTotalCount(prevTotalCount => prevTotalCount + 12);
            setHits(response.totalHits);
            valueRef.current = true;
          }
        })
        .catch(() => {
          if (valueRef.current) {
            toast.error('Nothing found');
            valueRef.current = false;
          }
          reset();
        })
        .finally(() => {
          prevValue.current = search;
          setIsLoaded(false);
        });
    }
  }, [search, page]);

  useEffect(() => {
    if (hits === 0) {
      return;
    } else {
      if (totalCount >= hits) {
        setHiddenLoadMore(false);
        toast.error(
          `We're sorry, but you've reached the end of search results.`
        );
        prevValue.current = '';
      }
    }
  }, [hits, totalCount]);

  return (
    <>
      <Gallery>
        {[pictures.length] &&
          pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
      </Gallery>
      {isLoaded && <Loader />}
      {hiddenLoadMore && <Button loadMore={loadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
};
