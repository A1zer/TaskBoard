export function load<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

export function save<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
}
