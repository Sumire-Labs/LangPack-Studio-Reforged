export type TranslationMap = Record<string, string>;

/**
 * Parses a Minecraft .lang file (key=value)
 */
export function parseLangFile(content: string): TranslationMap {
    const lines = content.split(/\r?\n/);
    const result: TranslationMap = {};

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) continue;

        const key = trimmed.substring(0, separatorIndex).trim();
        const value = trimmed.substring(separatorIndex + 1).trim();

        if (key) {
            result[key] = value;
        }
    }

    return result;
}

/**
 * Parses a Minecraft .json language file
 */
export function parseJsonFile(content: string): TranslationMap {
    try {
        const parsed = JSON.parse(content);
        // Ensure it's a flat string map (Minecraft lang json structure)
        // Although sometimes it can be nested in other contexts, standard lang files are flat.
        // We'll filter out non-string values just in case.
        const result: TranslationMap = {};
        for (const [key, value] of Object.entries(parsed)) {
            if (typeof value === 'string') {
                result[key] = value;
            }
        }
        return result;
    } catch (e) {
        console.error("Failed to parse JSON file", e);
        return {};
    }
}

/**
 * Generates a Minecraft .lang file content
 */
export function generateLangFile(data: TranslationMap): string {
    return Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
}

/**
 * Generates a Minecraft .json language file content
 */
export function generateJsonFile(data: TranslationMap): string {
    return JSON.stringify(data, null, 2);
}
