import React, { useState, useEffect } from 'react';
import styles from './SideMenu.module.scss';
import { getAuthors, getLocations, getPaintingsWithDetails } from '@/services/api';
import { Author, Location } from '@/types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filteredPaintings: any[], hasFilters: boolean) => void;
  onClearFilters: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onFilterChange, onClearFilters }) => {
  const [openFilters, setOpenFilters] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');
  const [artists, setArtists] = useState<Author[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const loadFiltersData = async () => {
      const [authorsData, locationsData] = await Promise.all([getAuthors(), getLocations()]);
      setArtists(authorsData);
      setLocations(locationsData);
    };
    if (isOpen) {
      loadFiltersData();
    }
  }, [isOpen]);

  const toggleFilter = (filter: string) => {
    setOpenFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const artistName = e.target.value;
    setSelectedArtist(artistName);
    const artist = artists.find((a) => a.name === artistName);
    setSelectedArtistId(artist?.id || null);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locationName = e.target.value;
    setSelectedLocation(locationName);
    const location = locations.find((l) => l.location === locationName);
    setSelectedLocationId(location?.id || null);
  };

  const handleShowResults = async () => {
    const params: any = {};
    if (selectedArtistId) {
      params.authorId = selectedArtistId;
    }
    if (selectedLocationId) {
      params.locationId = selectedLocationId;
    }
    if (yearFrom) {
      params.created_gte = yearFrom;
    }
    if (yearTo) {
      params.created_lte = yearTo;
    }
    const hasActiveFilters = !!(selectedArtistId || selectedLocationId || yearFrom || yearTo);
    if (hasActiveFilters) {
      const result = await getPaintingsWithDetails(params);
      onFilterChange(result.paintings, true);
    } else {
      onClearFilters();
    }
    onClose();
  };

  const handleClear = () => {
    setSelectedArtist('');
    setSelectedArtistId(null);
    setSelectedLocation('');
    setSelectedLocationId(null);
    setYearFrom('');
    setYearTo('');
    onClearFilters();
    onClose();
  };

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={onClose} />
      <div className={`${styles.sideMenu} ${isOpen ? styles.active : ''}`}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.filterItem}>
            <div
              className={`${styles.filterHeader} ${openFilters.includes('artist') ? styles.active : ''}`}
              onClick={() => toggleFilter('artist')}
            >
              <h3>Artist</h3>
              <span className={styles.plusIcon}>{openFilters.includes('artist') ? '−' : '+'}</span>
            </div>
            <div
              className={`${styles.filterContent} ${openFilters.includes('artist') ? styles.show : ''}`}
            >
              <select
                className={styles.select}
                value={selectedArtist}
                onChange={handleArtistChange}
              >
                <option value="" disabled>
                  Select the artist
                </option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.name}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div
              className={`${styles.filterHeader} ${openFilters.includes('location') ? styles.active : ''}`}
              onClick={() => toggleFilter('location')}
            >
              <h3>Location</h3>
              <span className={styles.plusIcon}>
                {openFilters.includes('location') ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.filterContent} ${openFilters.includes('location') ? styles.show : ''}`}
            >
              <select
                className={styles.select}
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="" disabled>
                  Select the location
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.location}>
                    {location.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.filterItem}>
            <div
              className={`${styles.filterHeader} ${openFilters.includes('year') ? styles.active : ''}`}
              onClick={() => toggleFilter('year')}
            >
              <h3>Year</h3>
              <span className={styles.plusIcon}>{openFilters.includes('year') ? '−' : '+'}</span>
            </div>
            <div
              className={`${styles.filterContent} ${openFilters.includes('year') ? styles.show : ''}`}
            >
              <div className={styles.yearRange}>
                <div className={styles.yearInput}>
                  <input
                    type="number"
                    placeholder="From"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                  />
                </div>
                <div className={styles.yearDash}>—</div>
                <div className={styles.yearInput}>
                  <input
                    type="number"
                    placeholder="To"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.showBtn} onClick={handleShowResults}>
              Show the results
            </button>
            <button className={styles.clearBtn} onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;