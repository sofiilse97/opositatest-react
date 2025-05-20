import defaultBook from '@/resources/defaultBook.png';
import { memo } from 'react';

const BookImage = ({ src }: { src: string }) => {
  return (
    <img
      src={src}
      style={{
        backgroundImage: `url(${defaultBook})`,
      }}
    />
  );
};

export default memo(BookImage);
