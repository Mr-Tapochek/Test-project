import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card/Card';
import { useAppDispatch, useAppSelector } from '@/types/hooks';
import { toggleTheme } from '@/types/themeSlice';
import { PaintingsWithDetails } from '@/types';
import { getPaintingsWithDetails } from '@/services/api';
import styles from './Home.module.scss';
import SideMenu from '@/components/SideMenu/SideMenu';

const ITEMS_PER_PAGE = 6;

export const Home: React.FC = () => {
  const [paintings, setPaintings] = useState<PaintingsWithDetails[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isFiltered) {
      loadPaintings();
    }
  }, [currentPage, isFiltered]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsFiltered(false);
      setCurrentPage(1);
      loadPaintings();
      return;
    }
    try {
      const allPaintings = await getPaintingsWithDetails({} as any);
      const filtered = allPaintings.paintings.filter((painting) => {
        const query = searchQuery.toLowerCase().trim();
        const matchByName = painting.name?.toLowerCase().includes(query);
        const matchByAuthor = painting.authorName?.toLowerCase().includes(query);
        const matchByLocation = painting.locationName?.toLowerCase().includes(query);
        const matchByYear = painting.created?.toString().includes(query);
        return matchByName || matchByAuthor || matchByLocation || matchByYear;
      });
      setPaintings(filtered);
      setTotalCount(filtered.length);
      setCurrentPage(1);
      setIsFiltered(true);
    } catch (err) {
      console.error('Ошибка поиска:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsFiltered(false);
    setCurrentPage(1);
    loadPaintings();
  };

  const handleFilterChange = (filteredPaintings: PaintingsWithDetails[], hasFilters: boolean) => {
    setPaintings(filteredPaintings);
    setTotalCount(filteredPaintings.length);
    setCurrentPage(1);
    setIsFiltered(hasFilters);
    setSearchQuery('');
  };

  const loadPaintings = async () => {
    try {
      const response = await getPaintingsWithDetails({
        _page: currentPage,
        _limit: ITEMS_PER_PAGE,
      });
      setPaintings(response.paintings);
      setTotalCount(response.totalCount);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    }
  };

  const handleClearFilters = () => {
    setIsFiltered(false);
    setCurrentPage(1);
    setSearchQuery('');
    loadPaintings();
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={styles.container}>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <header className={styles.header}>
        <div className={styles.headerCont}>
          {theme === 'light' ? (
            <img src="./light-logo.svg" alt="logo" className={styles.leftImg} />
          ) : (
            <img src="./dark-logo.svg" alt="logo" className={styles.leftImg} />
          )}
          <button className={styles.toggle} onClick={handleToggle}>
            {theme === 'light' ? (
              <img src="./light-switch.svg" alt="switch" className={styles.rightImg} />
            ) : (
              <img src="./dark-switch.svg" alt="switch" className={styles.rightImg} />
            )}
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.navigate}>
          <div className={styles.searchBox}>
            {theme === 'light' ? (
              <img src="./light-search.svg" alt="search" className={styles.searchIcon} />
            ) : (
              <img src="./dark-search.svg" alt="search" className={styles.searchIcon} />
            )}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Placeholder"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {searchQuery && (
              <button className={styles.clearSearchBtn} onClick={handleClearSearch}>
                ✕
              </button>
            )}
          </div>
          <button className={styles.toggle} onClick={() => setIsMenuOpen(true)}>
            {theme === 'light' ? (
              <img src="./light-menu.svg" alt="menu" className={styles.menu} />
            ) : (
              <img src="./dark-menu.svg" alt="menu" className={styles.menu} />
            )}
          </button>
        </div>
        <div className={styles.grid}>
          {paintings.map((painting) => (
            <Card key={painting.id} painting={painting} />
          ))}
        </div>
        {!isFiltered && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              {'<'}
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className={styles.pageNumber}>
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              {'>'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
