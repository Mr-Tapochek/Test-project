import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card/Card';
import { Painting } from '@/types';
import styles from './Home.module.scss';

const MOCK_PAINTINGS: Painting[] = [
  {
    id: 1,
    name: 'Красный велосипед',
    imgUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
    authorId: 1,
    locationId: 1,
    created: '2020',
  },
  {
    id: 2,
    name: 'Бабочка на цветке',
    imgUrl: 'https://www.gstatic.com/webp/gallery/2.jpg',
    authorId: 2,
    locationId: 2,
    created: '2019',
  },
  {
    id: 3,
    name: 'Горная река',
    imgUrl: 'https://www.gstatic.com/webp/gallery/3.jpg',
    authorId: 3,
    locationId: 3,
    created: '2021',
  },
  {
    id: 4,
    name: 'Воздушные шары',
    imgUrl: 'https://www.gstatic.com/webp/gallery/4.jpg',
    authorId: 4,
    locationId: 4,
    created: '2018',
  },
  {
    id: 5,
    name: 'Венецианский канал',
    imgUrl: 'https://www.gstatic.com/webp/gallery/5.jpg',
    authorId: 5,
    locationId: 1,
    created: '2022',
  },
  {
    id: 6,
    name: 'Закат над морем',
    imgUrl:
      'https://img.freepik.com/premium-photo/fantastic-colorful-sunset-wavy-waters-summer-day_245047-525.jpg?semt=ais_hybrid&w=740&q=80',
    authorId: 6,
    locationId: 5,
    created: '2017',
  },
];

export const Home: React.FC = () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPaintings(MOCK_PAINTINGS);
      } catch (error) {
        console.error('Error fetching paintings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Галерея искусств</h1>
        </header>
        <main className={styles.main}>
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p>Загрузка...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerCont}>
          <img src="/light-logo.svg" alt="logo" className={styles.leftImg}/>
          <img src="/light-switch.svg" alt="switch" className={styles.rightImg}/>
        </div>
      </header>

      <main className={styles.main}>
        {paintings.length === 0 ? (
          <div className={styles.empty}>
            <p>Произведения не найдены</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {paintings.map((painting) => (
              <Card key={painting.id} painting={painting} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
