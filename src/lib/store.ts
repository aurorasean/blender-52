import { writable } from 'svelte/store';

// Create a writable store with an initial value of false
export const boolStore = writable(false);