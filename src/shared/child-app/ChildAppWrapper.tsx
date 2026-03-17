import React from 'react';
import { ChildApp } from '@tramvai/module-child-app';
import { HOLY_JS_CHILDS_APP } from '~constants/childApps';

function FallbackComponent() {
  return <div>Loading child app...</div>;
}

interface ChildAppWrapperProps {
  fallback?: React.ComponentType;
}

export function ChildAppWrapper({ fallback }: ChildAppWrapperProps) {
  return (
    <ChildApp
      name={HOLY_JS_CHILDS_APP}
      props={{}}
      fallback={fallback || FallbackComponent}
    />
  );
}
