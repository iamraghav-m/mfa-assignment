
import React from 'react';
import { useFavoritesStore, Photo } from '../store/favoritesStore';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button 
        onClick={() => window.location.href = '/list'}
        className="view-list-btn">
        Go to List Page
      </button>
      
      <div className="favorites-section">
        <h3>My Favorites</h3>
        {favorites.length === 0 ? (
          <p>No favorites yet. Add some from the list page!</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((photo: Photo) => (
              <div key={photo.id} className="favorite-item">
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <h4>{photo.title}</h4>
                <p>ID: {photo.id}</p>
                <button 
                  onClick={() => removeFavorite(photo.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
