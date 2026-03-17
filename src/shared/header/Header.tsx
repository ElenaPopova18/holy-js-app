import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.Header}>
      <h1>
        Tramvai{' '}
        <span role="img" aria-label="Salute">
          🥳
        </span>
      </h1>
    </header>
  );
}
