import defaultBook from '@/assets/default-book.png';

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

export default BookImage;
