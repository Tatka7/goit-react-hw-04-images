import { Component } from 'react';
import { fetchImages } from '../service/pixabayAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './button/Button';
import Modal from './modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: '',
    tags: '',
    total: 0,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImages(query, page);
      if (data.hits.length === 0) {
        return toast.error(
          'There are no images matching your search query. Please try again.'
        );
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlaSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  onOpenModal = (largeImage, tags) => {
    this.setState({ showModal: true, largeImage, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, largeImage: '', tags: '' });
  };

  render() {
    const { images, isLoading, total, error, showModal, largeImage, tags } =
      this.state;
    // const totalPage = total / images.length;
    return (
      <div className={css.AppContainer}>
        <Searchbar onSubmit={this.handlaSubmit} />
        {images.length === 0 && <p className={css.pStart}></p>}
        {isLoading && <Loader />}
        {images.length !== 0 && (
          <ImageGallery gallery={images} onOpenModal={this.onOpenModal} />
        )}
        {/* {totalPage > 1 && !isLoading && images.length !== 0 && ( */}
        {total !== images.length && !isLoading && (
          <Button onClick={this.onLoadMore} />
        )}
        {showModal && (
          <Modal
            largeImage={largeImage}
            tags={tags}
            onCloseModal={this.onCloseModal}
          />
        )}
        {error && (
          <p className={css.pError}>
            There are no images matching your search query
            <span>Please try again</span>
          </p>
        )}
        <ToastContainer
          // type={toast.TYPE.INFO}
          autoClose={3000}
          theme="grey"
        />
      </div>
    );
  }
}
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
