
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useFavoritesStore, Photo } from '../store/favoritesStore';
import './PhotoList.scss';

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
        );
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  const toggleFavorite = (photo: Photo) => {
    if (isFavorite(photo.id)) {
      removeFavorite(photo.id);
    } else {
      addFavorite(photo);
    }
  };

  return (
    <div className="photo-list">
      <div className="list-header">
        <h2>Photo List</h2>
        <button 
          onClick={() => window.location.href = '/'}
          className="back-button">
          Back to Dashboard
        </button>
      </div>
      
      <div className="photos-grid">
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return (
              <div 
                ref={lastPhotoElementRef}
                key={photo.id} 
                className="photo-item"
              >
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <h4>{photo.title}</h4>
                <p>ID: {photo.id}</p>
                <button 
                  onClick={() => toggleFavorite(photo)}
                  className={isFavorite(photo.id) ? "remove-favorite-button" : "add-favorite-button"}
                >
                  {isFavorite(photo.id) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            );
          } else {
            return (
              <div key={photo.id} className="photo-item">
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <h4>{photo.title}</h4>
                <p>ID: {photo.id}</p>
                <button 
                  onClick={() => toggleFavorite(photo)}
                  className={isFavorite(photo.id) ? "remove-favorite-button" : "add-favorite-button"}
                >
                  {isFavorite(photo.id) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            );
          }
        })}
      </div>
      {loading && <p className="loading">Loading more photos...</p>}
    </div>
  );
};

export default PhotoList;
