import { ChildApp } from '@tramvai/module-child-app';
import { BIG_CONF_MF_APP } from '~constants/childApps';
import styles from '../index.module.css';

function FallbackComponent() {
  return <div>Loading big-conf-mf...</div>;
}

export function AboutPage() {
  return (
    <main>
      <h1>О проекте</h1>
      <p>Это вторая страница приложения Holy JS</p>
      
      <h2>Микрофронт Big Conf MF</h2>
      <div className={styles.childAppContainer}>
        <ChildApp
          name={BIG_CONF_MF_APP}
          props={{}}
          fallback={FallbackComponent}
        />
      </div>
    </main>
  );
}

export default AboutPage;
