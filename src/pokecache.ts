type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(value: number) {
    this.#interval = value;
    this.#startReapLoop();
  }

  add<T>(key: string, value: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: value,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (entry !== undefined) {
      return entry.val as T;
    }
    return undefined;
  }

  #reap(): void {
    for (const [key, value] of this.#cache) {
        if (value.createdAt >= Date.now() - this.#interval) {
            this.#cache.delete(key);
        }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}