// Utility to handle Gluestack UI prop type issues
import type { Key } from 'react';

export type GluestackSize =
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xs'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
export type GluestackSpace = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type GluestackAction = 'primary' | 'secondary' | 'positive' | 'negative';
export type GluestackVariant = 'solid' | 'outline' | 'link';
export type GluestackBadgeAction = 'error' | 'warning' | 'success' | 'info' | 'muted';

/**
 * Normalizes size prop to valid Gluestack size
 */
export function normalizeSize(
    size: string | number | undefined,
    fallback: GluestackSize = 'md'
): GluestackSize {
    if (typeof size === 'number') return fallback;
    if (!size) return fallback;

    const validSizes: GluestackSize[] = [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xs',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
    ];
    return validSizes.includes(size as GluestackSize) ? (size as GluestackSize) : fallback;
}

/**
 * Normalizes space prop to valid Gluestack space
 */
export function normalizeSpace(
    space: string | number | undefined,
    fallback: GluestackSpace = 'md'
): GluestackSpace {
    if (typeof space === 'number') return fallback;
    if (!space) return fallback;

    const validSpaces: GluestackSpace[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    return validSpaces.includes(space as GluestackSpace) ? (space as GluestackSpace) : fallback;
}

/**
 * Safely handles key prop to avoid null values
 */
export function safeKey(key: Key | null | undefined): string | number | undefined {
    if (key === null || key === undefined) return undefined;
    return typeof key === 'string' || typeof key === 'number' ? key : undefined;
}

/**
 * Creates safe props object removing problematic values
 */
export function createSafeProps<T extends Record<string, any>>(
    props: T
): Omit<T, 'key'> & { key?: string | number } {
    const { key, ...otherProps } = props;
    const safeProps = { ...otherProps } as Omit<T, 'key'> & { key?: string | number };

    if (key !== null && key !== undefined) {
        safeProps.key = safeKey(key);
    }

    return safeProps;
}
