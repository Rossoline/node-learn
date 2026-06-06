// Block 09 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { EventEmitter, once } from "node:events";

export async function onceValue<T>(
  emitter: EventEmitter,
  event: string,
): Promise<T> {
  const [value] = await once(emitter, event);
  return value as T;
}

export function collectEvents(
  emitter: EventEmitter,
  event: string,
): () => unknown[] {
  const received: unknown[] = [];
  emitter.on(event, (payload: unknown) => received.push(payload));
  return () => received;
}

export type BusEvents = {
  message: [text: string];
  count: [n: number];
};

export class TypedBus {
  private emitter = new EventEmitter();

  on<K extends keyof BusEvents>(
    event: K,
    listener: (...args: BusEvents[K]) => void,
  ): void {
    // The wrapper keeps the public API typed; the inner emitter is untyped.
    this.emitter.on(event, listener as (...args: unknown[]) => void);
  }

  emit<K extends keyof BusEvents>(event: K, ...args: BusEvents[K]): void {
    this.emitter.emit(event, ...args);
  }
}

// Notes:
// - `once(emitter, event)` resolves with an ARRAY of the emitted args; we take [0].
// - collectEvents closes over a private array, exposing only a read-only getter.
// - TypedBus maps each event name to its argument tuple, so `emit("count", 5)` is checked
//   and `emit("count", "x")` is a compile error — safety a bare EventEmitter lacks.
