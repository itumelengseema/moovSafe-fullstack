/// <reference types="nativewind/types" />

declare module 'react-native-css-interop' {
  import { ComponentType } from 'react';

  export function jsxs<T extends ComponentType<any>>(
    component: T,
    props: React.ComponentProps<T>,
    key?: React.Key
  ): React.ReactElement;

  export function jsx<T extends ComponentType<any>>(
    component: T,
    props: React.ComponentProps<T>,
    key?: React.Key
  ): React.ReactElement;
}
