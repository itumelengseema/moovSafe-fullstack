// Utility functions to fix Gluestack UI type issues

export type GluestackSize =
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
export type GluestackButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GluestackBadgeSize = 'sm' | 'md' | 'lg';
export type GluestackStackSpace = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type GluestackFabSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xs';
export type GluestackFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Safely converts a size value to a valid Gluestack size
 */
export function normalizeSize(
    size: string | number | undefined,
    validSizes: readonly string[]
): string | undefined {
    if (size === undefined || size === null) return undefined;

    const sizeStr = String(size);
    if (validSizes.includes(sizeStr)) {
        return sizeStr;
    }

    // Fallback to 'md' for most components
    return 'md';
}

/**
 * Safely converts a flex direction value
 */
export function normalizeFlexDirection(direction: any): GluestackFlexDirection {
    if (
        typeof direction === 'string' &&
        ['row', 'column', 'row-reverse', 'column-reverse'].includes(direction)
    ) {
        return direction as GluestackFlexDirection;
    }
    return 'row';
}

// Common size arrays for normalization
export const BUTTON_SIZES: readonly string[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const BADGE_SIZES: readonly string[] = ['sm', 'md', 'lg'];
export const TEXT_SIZES: readonly string[] = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '2xs',
];
export const HEADING_SIZES: readonly string[] = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
];
export const STACK_SPACES: readonly string[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
export const FAB_SIZES: readonly string[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xs'];
