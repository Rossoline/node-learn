// Block 09 — Exercises
// Run tests:  node --import tsx --test "blocks/09-events/tests/*.test.ts"
import { EventEmitter } from "node:events";

// 1. Resolve with the first payload emitted for `event`. (Hint: `once` from node:events
//    resolves with an array of the emitted args — take the first.)
export async function onceValue<T>(
  emitter: EventEmitter,
  event: string,
): Promise<T> {
  void emitter;
  void event; // remove these lines once you use the parameters
  // TODO: const [value] = await once(emitter, event); return value as T;
  throw new Error("Not implemented");
}

// 2. Subscribe to `event` and return a getter for every payload received so far.
export function collectEvents(
  emitter: EventEmitter,
  event: string,
): () => unknown[] {
  void emitter;
  void event; // remove these lines once you use the parameters
  // TODO: push each payload into an array; return () => that array
  throw new Error("Not implemented");
}

// 3. A typed event bus. Each event name maps to its listener argument types.
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
    void this.emitter;
    void event;
    void listener; // remove these lines once you use them
    // TODO: delegate to this.emitter.on(event, listener)
    throw new Error("Not implemented");
  }

  emit<K extends keyof BusEvents>(event: K, ...args: BusEvents[K]): void {
    void event;
    void args; // remove these lines once you use them
    // TODO: delegate to this.emitter.emit(event, ...args)
    throw new Error("Not implemented");
  }
}
