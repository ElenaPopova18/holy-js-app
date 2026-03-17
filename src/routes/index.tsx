import { ChildAppWrapper } from '~shared/child-app/ChildAppWrapper';
import styles from './index.module.css';

export function IndexPage() {
  return (
    <main>
      <h1>Welcome to Holy JS App!</h1>
      <p>
        To change the page content, edit the file{' '}
        <code className={styles.Code}>routes/index.tsx</code>
      </p>

      <h2>Child App Integration</h2>
      <div className={styles.childAppContainer}>
        <ChildAppWrapper />
      </div>

      <p>Tramvai resources:</p>
      <ul>
        <li>
          <a
            href="https://tramvai.dev/docs/tutorials/pokedex-app/new-app"
            target="_blank"
            rel="noreferrer"
          >
            Tutorial
          </a>
        </li>
        <li>
          <a href="https://tramvai.dev/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </li>
        <li>
          <a
            href="https://github.com/tramvaijs/tramvai"
            target="_blank"
            rel="noreferrer"
          >
            Source code
          </a>
        </li>
      </ul>
    </main>
  );
}

export default IndexPage;
