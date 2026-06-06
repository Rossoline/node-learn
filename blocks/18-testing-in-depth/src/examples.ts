// Block 18 — Testing in Depth: worked examples
// Run me:  npm run play blocks/18-testing-in-depth/src/examples.ts
//
// Normally you'd see these ideas in a test file; here we just show the shapes that make
// code testable: pass collaborators in so a test can replace them with a mock.
export {}; // make this a module so top-level names don't clash across blocks

// Dependency injection: getName is a parameter, not a hard-coded import.
function greetUser(id: number, getName: (id: number) => string): string {
  return `Hello, ${getName(id)}!`;
}

// A hand-rolled spy (this is essentially what node:test's mock.fn gives you).
function spy<A extends unknown[], R>(impl: (...args: A) => R) {
  const calls: A[] = [];
  const fn = (...args: A): R => {
    calls.push(args);
    return impl(...args);
  };
  return Object.assign(fn, { calls });
}

const getName = spy((id: number) => `User${id}`);
console.log(greetUser(7, getName));
console.log("getName was called with:", getName.calls); // [[7]]
