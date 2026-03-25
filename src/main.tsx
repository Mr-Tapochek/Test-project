import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './types';
import { Theme } from './types/themeSlice.ts';
import './styles/global.scss'
import App from './App.tsx'

const savedTheme = localStorage.getItem('theme') as Theme;
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else if (savedTheme === 'light') {
  document.documentElement.removeAttribute('data-theme');
} else {
  // Проверяем системные настройки
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);