import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ hits }) => {
  const renderGallery = hits.length > 0;
  return (
    <>
      <GalleryList>
        {renderGallery &&
          hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              id={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          ))}
      </GalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
};
