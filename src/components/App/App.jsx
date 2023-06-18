import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'components/App/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [value, setValue] = useState('');

  const formSubmitHandler = query => {
    setValue(query);
  };

  return (
    <Container>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery search={value} />
      <ToastContainer autoClose={2000} />
    </Container>
  );
};
