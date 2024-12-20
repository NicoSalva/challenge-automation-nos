export function normalizeAndCompare(expected: string, actual: string): boolean {
    return actual.toLowerCase().includes(expected.toLowerCase());
}
