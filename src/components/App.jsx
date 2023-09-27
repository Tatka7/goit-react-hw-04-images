import { useState, useEffect } from 'react';
import { getImages } from '../service/pixabayAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './button/Button';
import Modal from './modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query !== '') {
      fetchImages(query, page);
    }
  }, [query, page]);

  const fetchImages = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await getImages(query, page);
      if (data.hits.length === 0) {
        return toast.error(
          'There are no images matching your search query. Please try again.'
        );
      }

      setTotal(data.totalHits);
      setImages(prev => [...prev, ...data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  return (
    <div className={css.AppContainer}>
      <Searchbar onSubmit={renderSubmit} />
      {images.length === 0 && <p className={css.pStart}></p>}
      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery gallery={images} onOpenModal={onOpenModal} />
      )}
      {/* {totalPage > 1 && !isLoading && images.length !== 0 && ( */}
      {total !== images.length && !isLoading && <Button onClick={onLoadMore} />}
      {showModal && (
        <Modal
          largeImage={largeImage}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}
      {error && (
        <p className={css.pError}>
          There are no images matching your search query
          <span>Please try again</span>
        </p>
      )}
      <ToastContainer autoClose={3000} theme="grey" />
    </div>
  );
}
