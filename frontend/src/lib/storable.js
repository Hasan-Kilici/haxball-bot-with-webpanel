import { writable } from 'svelte/store';

export function storable(key, initialValue) {
    const isBrowser = typeof window !== 'undefined';
    const storedValue = isBrowser ? localStorage.getItem(key) : null;
    const initialData = storedValue ? JSON.parse(storedValue) : initialValue;

    const store = writable(initialData);
    const { subscribe, set, update } = store;

    if (isBrowser) {
        subscribe(current => {
            localStorage.setItem(key, JSON.stringify(current));
        });
    }

    return {
        subscribe,
        set,
        update
    };
}