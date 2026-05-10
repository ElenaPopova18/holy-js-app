import { Link } from '@tramvai/module-router';
import { ChildAppWrapper } from '~shared/child-app/ChildAppWrapper';
import styles from './index.module.css';

export function IndexPage() {
  return (
    <main>
      <h1>Привет на Holy JS!</h1>
      

      <h2>Вот сюда мы подключаем наш микрофронт</h2>
      <div className={styles.childAppContainer}>
        <ChildAppWrapper />
      </div>
    </main>
  );
}

export default IndexPage;
