import defaultBook from '@/resources/defaultBook.png';

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
