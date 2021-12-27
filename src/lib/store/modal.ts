import { writable } from 'svelte/store';

const {subscribe, update, set} = writable(false);

export const modalOpen = {subscribe};
export const toggle = () => update(v => !v);
export const open = () => set(true);
export const close = () => set(false);
