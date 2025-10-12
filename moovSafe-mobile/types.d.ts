// Type fixes for Gluestack UI components
declare module '@gluestack-ui/themed' {
  import { ComponentProps } from 'react';
  import { View, Text, TouchableOpacity } from 'react-native';

  // Box component
  export interface BoxProps extends ComponentProps<typeof View> {
    className?: string;
  }

  // Text component
  export interface TextProps extends ComponentProps<typeof Text> {
    className?: string;
    size?: string;
  }

  // Button components
  export interface ButtonProps extends ComponentProps<typeof TouchableOpacity> {
    className?: string;
    variant?: string;
    size?: string;
    action?: string;
  }

  export interface ButtonTextProps extends ComponentProps<typeof Text> {
    className?: string;
  }

  // Card component
  export interface CardProps extends ComponentProps<typeof View> {
    className?: string;
    variant?: string;
    size?: string;
  }

  // Heading component
  export interface HeadingProps extends ComponentProps<typeof Text> {
    className?: string;
    size?: string;
  }

  // Stack components
  export interface HStackProps extends ComponentProps<typeof View> {
    className?: string;
    space?: string;
  }

  export interface VStackProps extends ComponentProps<typeof View> {
    className?: string;
    space?: string;
  }

  // Badge component
  export interface BadgeProps extends ComponentProps<typeof View> {
    className?: string;
    size?: string;
    action?: string;
  }

  // FAB component
  export interface FabProps extends ComponentProps<typeof TouchableOpacity> {
    className?: string;
    size?: string;
  }
}

// React Native component exports
declare module 'react-native' {
  import { ComponentType, ReactNode } from 'react';

  // Core Components
  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const ScrollView: ComponentType<ScrollViewProps>;
  export const TouchableOpacity: ComponentType<TouchableOpacityProps>;
  export const TextInput: ComponentType<TextInputProps>;
  export const Image: ComponentType<ImageProps>;
  export const FlatList: ComponentType<FlatListProps<any>>;
  export const RefreshControl: ComponentType<RefreshControlProps>;
  export const KeyboardAvoidingView: ComponentType<KeyboardAvoidingViewProps>;
  export const Modal: ComponentType<ModalProps>;
  export const Pressable: ComponentType<PressableProps>;
  export const ActivityIndicator: ComponentType<ActivityIndicatorProps>;
  export const Platform: {
    OS: 'ios' | 'android' | 'web' | 'windows' | 'macos';
    select: <T>(specifics: { ios?: T; android?: T; web?: T; default?: T }) => T;
  };
  export const Alert: {
    alert: (
      title: string,
      message?: string,
      buttons?: Array<{
        text?: string;
        onPress?: () => void;
        style?: 'default' | 'cancel' | 'destructive';
      }>,
      options?: { cancelable?: boolean; onDismiss?: () => void }
    ) => void;
    prompt: (
      title: string,
      message?: string,
      callbackOrButtons?:
        | ((text: string) => void)
        | Array<{
            text?: string;
            onPress?: (text?: string) => void;
            style?: 'default' | 'cancel' | 'destructive';
          }>,
      type?: 'default' | 'plain-text' | 'secure-text' | 'login-password',
      defaultValue?: string,
      keyboardType?: string
    ) => void;
  };

  // Props interfaces with NativeWind className support
  export interface ViewProps {
    children?: ReactNode;
    style?: any;
    className?: string;
    key?: string | number;
    testID?: string;
    accessibilityLabel?: string;
    accessible?: boolean;
    onLayout?: (event: any) => void;
    onPress?: () => void;
    hitSlop?: number | { top?: number; left?: number; bottom?: number; right?: number };
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
    removeClippedSubviews?: boolean;
    collapsable?: boolean;
    needsOffscreenAlphaCompositing?: boolean;
    renderToHardwareTextureAndroid?: boolean;
    shouldRasterizeIOS?: boolean;
    ref?: any;
    id?: string;
  }

  export interface TextProps {
    children?: ReactNode;
    style?: any;
    className?: string;
    numberOfLines?: number;
    onPress?: () => void;
    allowFontScaling?: boolean;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    lineBreakMode?: 'head' | 'middle' | 'tail' | 'clip';
    selectable?: boolean;
    selectionColor?: string;
    suppressHighlighting?: boolean;
    testID?: string;
    adjustsFontSizeToFit?: boolean;
    minimumFontScale?: number;
    maxFontSizeMultiplier?: number;
    ref?: any;
  }

  export interface ScrollViewProps {
    children?: ReactNode;
    style?: any;
    className?: string;
    contentContainerStyle?: any;
    horizontal?: boolean;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    pagingEnabled?: boolean;
    scrollEnabled?: boolean;
    bounces?: boolean;
    bouncesZoom?: boolean;
    alwaysBounceVertical?: boolean;
    alwaysBounceHorizontal?: boolean;
    centerContent?: boolean;
    automaticallyAdjustContentInsets?: boolean;
    decelerationRate?: 'fast' | 'normal' | number;
    directionalLockEnabled?: boolean;
    canCancelContentTouches?: boolean;
    keyboardDismissMode?: 'none' | 'on-drag' | 'interactive';
    keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
    maximumZoomScale?: number;
    minimumZoomScale?: number;
    onContentSizeChange?: (w: number, h: number) => void;
    onScroll?: (event: any) => void;
    onScrollBeginDrag?: (event: any) => void;
    onScrollEndDrag?: (event: any) => void;
    onMomentumScrollBegin?: (event: any) => void;
    onMomentumScrollEnd?: (event: any) => void;
    refreshControl?: ReactNode;
    removeClippedSubviews?: boolean;
    scrollEventThrottle?: number;
    scrollIndicatorInsets?: { top?: number; left?: number; bottom?: number; right?: number };
    scrollsToTop?: boolean;
    snapToAlignment?: 'start' | 'center' | 'end';
    snapToInterval?: number;
    snapToOffsets?: number[];
    stickyHeaderIndices?: number[];
    endFillColor?: string;
    overScrollMode?: 'auto' | 'always' | 'never';
    scrollPerfTag?: string;
    DEPRECATED_sendUpdatedChildFrames?: boolean;
    ref?: any;
  }

  export interface TouchableOpacityProps {
    children?: ReactNode;
    style?: any;
    className?: string;
    key?: string | number;
    activeOpacity?: number;
    disabled?: boolean;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    onLongPress?: () => void;
    delayLongPress?: number;
    delayPressIn?: number;
    delayPressOut?: number;
    hitSlop?: number | { top?: number; left?: number; bottom?: number; right?: number };
    pressRetentionOffset?: { top?: number; left?: number; bottom?: number; right?: number };
    testID?: string;
    accessibilityLabel?: string;
    accessible?: boolean;
    ref?: any;
  }

  export interface TextInputProps {
    style?: any;
    className?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    editable?: boolean;
    keyboardType?:
      | 'default'
      | 'numeric'
      | 'email-address'
      | 'phone-pad'
      | 'url'
      | 'number-pad'
      | 'name-phone-pad'
      | 'decimal-pad'
      | 'twitter'
      | 'web-search'
      | 'ascii-capable'
      | 'numbers-and-punctuation';
    returnKeyType?:
      | 'done'
      | 'go'
      | 'next'
      | 'search'
      | 'send'
      | 'none'
      | 'previous'
      | 'default'
      | 'emergency-call'
      | 'google'
      | 'join'
      | 'route'
      | 'yahoo';
    maxLength?: number;
    multiline?: boolean;
    numberOfLines?: number;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    autoCompleteType?: string;
    autoFocus?: boolean;
    blurOnSubmit?: boolean;
    caretHidden?: boolean;
    contextMenuHidden?: boolean;
    defaultValue?: string;
    selectTextOnFocus?: boolean;
    selection?: { start: number; end?: number };
    selectionColor?: string;
    onBlur?: (event: any) => void;
    onFocus?: (event: any) => void;
    onChange?: (event: any) => void;
    onChangeText?: (text: string) => void;
    onContentSizeChange?: (event: any) => void;
    onEndEditing?: (event: any) => void;
    onSelectionChange?: (event: any) => void;
    onSubmitEditing?: (event: any) => void;
    onKeyPress?: (event: any) => void;
    testID?: string;
    ref?: any;
  }

  export interface RefreshControlProps {
    refreshing: boolean;
    onRefresh?: () => void;
    colors?: string[];
    enabled?: boolean;
    progressBackgroundColor?: string;
    progressViewOffset?: number;
    size?: 'default' | 'large';
    tintColor?: string;
    title?: string;
    titleColor?: string;
  }

  export interface KeyboardAvoidingViewProps {
    children?: ReactNode;
    style?: any;
    className?: string;
    behavior?: 'height' | 'position' | 'padding';
    contentContainerStyle?: any;
    enabled?: boolean;
    keyboardVerticalOffset?: number;
    ref?: any;
  }

  export interface ImageProps {
    source?: any;
    style?: any;
    className?: string;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    onLoad?: (event: any) => void;
    onError?: (event: any) => void;
    onLoadStart?: (event: any) => void;
    onLoadEnd?: (event: any) => void;
    testID?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    ref?: any;
  }

  export interface FlatListProps<T> {
    data: T[] | null | undefined;
    renderItem: ({ item, index }: { item: T; index: number }) => ReactNode;
    keyExtractor?: (item: T, index: number) => string;
    style?: any;
    className?: string;
    contentContainerStyle?: any;
    horizontal?: boolean;
    numColumns?: number;
    columnWrapperStyle?: any;
    getItemLayout?: (data: any, index: number) => { length: number; offset: number; index: number };
    initialNumToRender?: number;
    initialScrollIndex?: number;
    inverted?: boolean;
    ItemSeparatorComponent?: ComponentType<any>;
    ListEmptyComponent?: ComponentType<any> | ReactNode;
    ListFooterComponent?: ComponentType<any> | ReactNode;
    ListHeaderComponent?: ComponentType<any> | ReactNode;
    onEndReached?: (info: { distanceFromEnd: number }) => void;
    onEndReachedThreshold?: number;
    onRefresh?: () => void;
    refreshing?: boolean;
    removeClippedSubviews?: boolean;
    scrollEnabled?: boolean;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    ref?: any;
  }

  export interface ModalProps {
    children?: ReactNode;
    animationType?: 'none' | 'slide' | 'fade';
    transparent?: boolean;
    visible?: boolean;
    onRequestClose?: () => void;
    onShow?: (event: any) => void;
    onDismiss?: () => void;
    presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
    supportedOrientations?: (
      | 'portrait'
      | 'portrait-upside-down'
      | 'landscape'
      | 'landscape-left'
      | 'landscape-right'
    )[];
    onOrientationChange?: (event: any) => void;
    statusBarTranslucent?: boolean;
    hardwareAccelerated?: boolean;
    ref?: any;
  }

  export interface PressableProps {
    children?:
      | ReactNode
      | ((state: { pressed: boolean; hovered?: boolean; focused?: boolean }) => ReactNode);
    style?: any;
    className?: string;
    disabled?: boolean;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    onLongPress?: () => void;
    delayLongPress?: number;
    hitSlop?: number | { top?: number; left?: number; bottom?: number; right?: number };
    pressRetentionOffset?: { top?: number; left?: number; bottom?: number; right?: number };
    testID?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    ref?: any;
  }

  export interface ActivityIndicatorProps {
    style?: any;
    className?: string;
    animating?: boolean;
    color?: string;
    hidesWhenStopped?: boolean;
    size?: 'small' | 'large' | number;
    ref?: any;
  }
}
