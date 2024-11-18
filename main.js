class Mutex {
  constructor() {
      this.locked = false; // Indicates if the lock is currently held
      this.queue = []; // Queue to store waiting promises
  }

  lock() {
      // Returns a promise that resolves when the lock is acquired
      const promise = new Promise((resolve) => {
          if (!this.locked) {
              // If not locked, immediately acquire the lock
              this.locked = true;
              resolve(); // Resolve the promise so the caller can proceed
          } else {
              // If already locked, add the resolve function to the queue
              this.queue.push(resolve);
          }
      });
      return promise;
  }

  unlock() {
      // Releases the lock and resolves the next promise in the queue
      if (this.queue.length > 0) {
          const next = this.queue.shift(); // Get the next waiting resolve function
          next(); // Resolve it to allow the next task to proceed
      } else {
          // If the queue is empty, set the lock to available
          this.locked = false;
      }
  }
}

// Example usage
const mutex = new Mutex();
let sharedResource = 0; // Shared resource that needs synchronized access

async function increment() {
  await mutex.lock(); // Acquire the lock before accessing the shared resource
  try {
      sharedResource++; // Safely increment the shared resource
      console.log(`Incremented: ${sharedResource}`);
  } finally {
      mutex.unlock(); // Always release the lock, even if an error occurs
  }
}

async function main() {
  const tasks = [];
  for (let i = 0; i < 10; i++) {
      tasks.push(increment()); // Create multiple tasks that increment the resource
  }
  await Promise.all(tasks); // Wait for all tasks to complete
  console.log(`Final Result: ${sharedResource}`); // Log the final result
}

main();
