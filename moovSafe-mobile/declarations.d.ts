declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// Fix for React Native types
/// <reference types="react-native" />

// Fix for web components JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      span: any;
      script: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      h5: any;
      h6: any;
    }
  }
}

// Extend Gluestack UI types to be more flexible
declare module '@gluestack-ui/themed' {
  interface BadgeIconProps {
    size?: string | number;
    key?: any;
  }
  
  interface ButtonTextProps {
    size?: string | number;
  }
  
  interface ButtonIconProps {
    size?: string | number;
  }
  
  interface ButtonGroupProps {
    space?: string | number;
    flexDirection?: any;
  }
  
  interface FabIconProps {
    size?: string | number;
  }
  
  interface HeadingProps {
    size?: string | number;
  }
  
  interface TextProps {
    size?: string | number;
  }
  
  interface HStackProps {
    space?: string | number;
  }
  
  interface VStackProps {
    space?: string | number;
  }
}
