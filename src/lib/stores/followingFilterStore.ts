import { writable, type Writable } from "svelte/store";

export const followingFilter : Writable<"global" | "following">= writable("global");