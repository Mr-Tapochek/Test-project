import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card/Card';
import { Painting } from '@/types';
import { useAppDispatch, useAppSelector } from '@/types/hooks';
import { toggleTheme } from '@/types/themeSlice';
import styles from './Home.module.scss';

const MOCK_PAINTINGS: Painting[] = [
  {
    id: 1,
    name: 'Red Bicycle',
    imgUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
    authorId: 1,
    locationId: 1,
    created: '2020',
  },
  {
    id: 2,
    name: 'Butterfly on a Flower',
    imgUrl: 'https://www.gstatic.com/webp/gallery/2.jpg',
    authorId: 2,
    locationId: 2,
    created: '2019',
  },
  {
    id: 3,
    name: 'Mountain River',
    imgUrl: 'https://www.gstatic.com/webp/gallery/3.jpg',
    authorId: 3,
    locationId: 3,
    created: '2021',
  },
  {
    id: 4,
    name: 'Hot Air Balloons',
    imgUrl: 'https://www.gstatic.com/webp/gallery/4.jpg',
    authorId: 4,
    locationId: 4,
    created: '2018',
  },
  {
    id: 5,
    name: 'Venice Canal',
    imgUrl: 'https://www.gstatic.com/webp/gallery/5.jpg',
    authorId: 5,
    locationId: 1,
    created: '2022',
  },
  {
    id: 6,
    name: 'Sunset Over the Sea',
    imgUrl:
      'https://img.freepik.com/premium-photo/fantastic-colorful-sunset-wavy-waters-summer-day_245047-525.jpg?semt=ais_hybrid&w=740&q=80',
    authorId: 6,
    locationId: 5,
    created: '2017',
  },
];

export const Home: React.FC = () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPaintings(MOCK_PAINTINGS);
      } catch (error) {
        console.error('Error fetching paintings:', error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerCont}>
          {theme === 'light' ? (
            <img src="/light-logo.svg" alt="logo" className={styles.leftImg} />
          ) : (
            <img src="/dark-logo.svg" alt="logo" className={styles.leftImg} />
          )}
          <button className={styles.toggle} onClick={handleToggle}>
            {theme === 'light' ? (
              <img src="/light-switch.svg" alt="switch" className={styles.rightImg} />
            ) : (
              <img src="/dark-switch.svg" alt="switch" className={styles.rightImg} />
            )}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.navigate}>
          <div className={styles.searchBox}>
            {theme === 'light' ? (
              <img src="/light-search.svg" alt="search" className={styles.searchIcon} />
            ) : (
              <img src="/dark-search.svg" alt="search" className={styles.searchIcon} />
            )}
            <input type="text" className={styles.searchInput} placeholder="Placeholder" />
          </div>
          {theme === 'light' ? (
            <img src="/light-menu.svg" alt="menu" className={styles.menu} />
          ) : (
            <img src="/dark-menu.svg" alt="menu" className={styles.menu} />
          )}
        </div>
        <div className={styles.grid}>
          {paintings.map((painting) => (
            <Card key={painting.id} painting={painting} />
          ))}
        </div>
      </main>
    </div>
  );
};
