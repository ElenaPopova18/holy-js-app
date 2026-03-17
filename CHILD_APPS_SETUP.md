# Подключение Child Apps в Holy JS App

Этот документ описывает процесс подключения child apps из репозитория `holy-js-childs` в приложение `holy-js-app`.

## Структура проекта

```
/Users/e.y.popova/
├── holy-js-app/           # Основное Tramvai приложение
│   ├── src/
│   │   ├── constants/
│   │   │   └── childApps.ts
│   │   ├── shared/
│   │   │   └── child-app/
│   │   │       └── ChildAppWrapper.tsx
│   │   ├── routes/
│   │   │   └── index.tsx
│   │   └── index.ts
│   └── env.development.js
│
└── holy-js-childs/        # Репозиторий с child apps
    └── child-apps/
        └── holy-js-childs/
            ├── index.ts
            └── components/
```

## Шаг 1: Установка зависимости

В `package.json` основного приложения добавлена зависимость:

```json
{
  "dependencies": {
    "@tramvai/module-child-app": "^6.79.33"
  }
}
```

Выполните установку:
```bash
cd /Users/e.y.popova/holy-js-app
yarn install
```

## Шаг 2: Конфигурация child app

### Файл констант: `src/constants/childApps.ts`

```typescript
export const HOLY_JS_CHILDS_APP = 'holy-js-childs';
export const HOLY_JS_CHILDS_APP_TOGGLE_NAME = 'childApp/holyJsChilds';
```

### Регистрация в приложении: `src/index.ts`

```typescript
import { ChildAppModule, CHILD_APP_RESOLUTION_CONFIGS_TOKEN } from '@tramvai/module-child-app';

createApp({
  name: 'holy-js-app',
  modules: [
    // ... другие модули
    ChildAppModule,
  ],
  providers: [
    {
      provide: CHILD_APP_RESOLUTION_CONFIGS_TOKEN,
      useFactory: ({ environmentManager }) => {
        return [
          {
            name: 'holy-js-childs',
            toggle: 'childApp/holyJsChilds',
            baseUrl: environmentManager.get('CHILD_APPS_BASE_URL') || 'http://localhost:3001/',
            byTag: { latest: { version: '0.0.0-stub' } },
          },
        ];
      },
      deps: {
        environmentManager: ENV_MANAGER_TOKEN,
      },
    },
  ],
});
```

## Шаг 3: Компонент для рендеринга child app

### `src/shared/child-app/ChildAppWrapper.tsx`

```typescript
import React from 'react';
import { ChildApp } from '@tramvai/module-child-app';
import { HOLY_JS_CHILDS_APP } from '~constants/childApps';

const FallbackComponent = () => <div>Loading child app...</div>;

export const ChildAppWrapper: React.FC<{ fallback?: React.ComponentType }> = ({ fallback }) => {
  return (
    <ChildApp
      name={HOLY_JS_CHILDS_APP}
      props={{}}
      fallback={fallback || FallbackComponent}
    />
  );
};
```

## Шаг 4: Использование в страницах

### `src/routes/index.tsx`

```typescript
import { ChildAppWrapper } from '~shared/child-app/ChildAppWrapper';

export function IndexPage() {
  return (
    <main>
      <h1>Welcome to Holy JS App!</h1>
      
      <h2>Child App Integration</h2>
      <div className={styles.childAppContainer}>
        <ChildAppWrapper />
      </div>
    </main>
  );
}
```

## Шаг 5: Настройка переменных окружения

### `env.development.js`

```javascript
module.exports = {
  CHILD_APPS_BASE_URL: 'http://localhost:3001/',
};
```

## Запуск приложения

### 1. Запуск child app

В репозитории `holy-js-childs`:

```bash
cd /Users/e.y.popova/holy-js-childs
yarn install
yarn start:holy-js-childs  # или команда для запуска child app
```

Child app должен быть доступен на порту `3001` (или другом, указанном в конфигурации).

### 2. Запуск основного приложения

В репозитории `holy-js-app`:

```bash
cd /Users/e.y.popova/holy-js-app
yarn install
yarn start
```

## Альтернативный способ: Подключение через файловую систему

Для локальной разработки можно использовать путь к файловой системе:

```javascript
// env.development.js
module.exports = {
  CHILD_APPS_BASE_URL: 'file:///Users/e.y.popova/holy-js-childs/child-apps/holy-js-childs/dist/',
};
```

**Важно:** Убедитесь, что child app собран в директорию `dist/`.

## Контракты между host и child app

Для взаимодействия через контракты используйте `CHILD_APP_CONTRACT_MANAGER`:

```typescript
import { CHILD_APP_CONTRACT_MANAGER } from '@tramvai/module-child-app';

{
  provide: SOME_TOKEN,
  useFactory: async ({ childContractManager }) => {
    const service = await childContractManager.getChildProvidedContract(
      'holy-js-childs',
      SOME_CONTRACT_TOKEN
    );
    return service;
  },
  deps: {
    childContractManager: CHILD_APP_CONTRACT_MANAGER,
  },
}
```

## Feature Toggles

Для управления видимостью child app через feature toggles:

1. Добавьте toggle в конфигурацию
2. Используйте `useDCOFeatureToggle` или аналогичный хук для проверки состояния

## Отладка

### Логи в консоли

Включите подробное логирование Tramvai:

```bash
DEBUG=@tramvai/* yarn start
```

### Проверка загрузки child app

1. Откройте DevTools браузера
2. Перейдите на вкладку Network
3. Проверьте, что запросы к child app возвращают статус 200
4. Проверьте консоль на наличие ошибок

## Возможные проблемы

### 1. Child app не загружается

- Проверьте, что child app запущен на правильном порту
- Убедитесь, что CORS настроен правильно
- Проверьте baseUrl в конфигурации

### 2. Ошибки TypeScript

- Убедитесь, что пути в `tsconfig.json` настроены правильно
- Выполните `yarn install` для обновления типов

### 3. Конфликты версий

- Убедитесь, что версии `@tramvai/*` пакетов совпадают в host и child app
