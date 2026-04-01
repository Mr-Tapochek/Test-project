import React, { useState } from 'react';
import styles from './SideMenu.module.scss';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const [openFilters, setOpenFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setOpenFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={onClose} />
      <div className={`${styles.sideMenu} ${isOpen ? styles.active : ''}`}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
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
            <div className={`${styles.filterContent} ${openFilters.includes('artist') ? styles.show : ''}`}>
              <select className={styles.select} >
                <option value="" disabled selected>Select the artist</option>
                <option>Иван Айвазовский</option>
                <option>Винсент Ван Гог</option>
                <option>Леонардо да Винчи</option>
                <option>Пабло Пикассо</option>
              </select>
            </div>
          </div>

          <div className={styles.filterItem}>
            <div 
              className={`${styles.filterHeader} ${openFilters.includes('location') ? styles.active : ''}`}
              onClick={() => toggleFilter('location')}
            >
              <h3>Location</h3>
              <span className={styles.plusIcon}>{openFilters.includes('location') ? '−' : '+'}</span>
            </div>
            <div className={`${styles.filterContent} ${openFilters.includes('location') ? styles.show : ''}`}>
              <select className={styles.select}>
                <option value="" disabled selected>Select the location</option>
                <option>Русский музей</option>
                <option>Эрмитаж</option>
                <option>Лувр</option>
                <option>Третьяковская галерея</option>
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
            <div className={`${styles.filterContent} ${openFilters.includes('year') ? styles.show : ''}`}>
              <div className={styles.yearRange}>
                <div className={styles.yearInput}>
                  <input type="number" placeholder="From" />
                </div>
                <div className={styles.yearDash}>—</div>
                <div className={styles.yearInput}>
                  <input type="number" placeholder="To" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.showBtn}>Show the results</button>
            <button className={styles.clearBtn}>Clear</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;