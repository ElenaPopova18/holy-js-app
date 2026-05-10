import { createApp } from '@tramvai/core';
import { CommonModule, ENV_MANAGER_TOKEN } from '@tramvai/module-common';
import { SpaRouterModule } from '@tramvai/module-router';
import { RenderModule } from '@tramvai/module-render';
import { ServerModule } from '@tramvai/module-server';
import { ErrorInterceptorModule } from '@tramvai/module-error-interceptor';
import { SeoModule } from '@tramvai/module-seo';
import {
  ChildAppModule,
  CHILD_APP_RESOLUTION_CONFIGS_TOKEN,
} from '@tramvai/module-child-app';
import {
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot,
} from '@tramvai/tokens-render';
import { HeaderModule } from '~shared/header';

createApp({
  name: 'holy-js-app',
  modules: [
    CommonModule,
    SpaRouterModule,
    RenderModule.forRoot({ 
      useStrictMode: true,
      renderMode: 'ssr',
    }),
    SeoModule,
    ServerModule,
    ErrorInterceptorModule,
    HeaderModule,
    ChildAppModule,
  ],
  providers: [
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.HEAD_META,
        payload:
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
    },
    {
      provide: CHILD_APP_RESOLUTION_CONFIGS_TOKEN,
      useFactory: ({ environmentManager }) => {
        return [
          {
            name: 'holy-js-childs',
            toggle: 'childApp/holyJsChilds',
            // Путь к child app - для локальной разработки используем относительный путь
            baseUrl:
              environmentManager.get('CHILD_APPS_BASE_URL') ||
              'http://localhost:4041/',
            byTag: { latest: { version: '0.0.0-stub' } },
          },
          {
            name: 'big-conf-mf',
            toggle: 'childApp/bigConfMf',
            baseUrl:
              environmentManager.get('BIG_CONF_MF_BASE_URL') ||
              'http://localhost:4043/',
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
