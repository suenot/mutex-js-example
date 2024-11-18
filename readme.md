# Mutex Implementation in JavaScript

This repository contains a simple implementation of a `Mutex` class in JavaScript, which is used to synchronize access to shared resources. A mutex ensures that only one process or thread can access a critical section of code at any given time, preventing race conditions.

## Features
- **Simple Mutex Mechanism**: Implements locking and unlocking functionality.
- **Queue Management**: Handles queued tasks in a first-come, first-served order.
- **Asynchronous Support**: Designed to work seamlessly with `async/await`.

## Usage

### How to Use the `Mutex` Class
1. **Create a Mutex Instance**:
   Instantiate the `Mutex` class to create a lock mechanism.

2. **Lock the Mutex**:
   Use the `lock()` method before accessing the shared resource. This ensures that only one task can access the critical section at a time.

3. **Unlock the Mutex**:
   Always release the lock with the `unlock()` method after completing the operation.

4. **Queueing**:
   Tasks that attempt to lock the mutex while it's already locked will be queued and processed in order.

### Example Code
The following example demonstrates how to use the `Mutex` class to increment a shared resource safely:

```javascript
const mutex = new Mutex();
let sharedResource = 0;

async function increment() {
    await mutex.lock(); // Acquire the lock
    try {
        sharedResource++; // Safely modify the shared resource
        console.log(`Incremented: ${sharedResource}`);
    } finally {
        mutex.unlock(); // Release the lock
    }
}

async function main() {
    const tasks = [];
    for (let i = 0; i < 10; i++) {
        tasks.push(increment());
    }
    await Promise.all(tasks); // Wait for all tasks to complete
    console.log(`Final Result: ${sharedResource}`);
}

main();
```

### Output
When you run the code, you'll see an incrementing sequence followed by the final result:
```
Incremented: 1
Incremented: 2
Incremented: 3
Incremented: 4
Incremented: 5
Incremented: 6
Incremented: 7
Incremented: 8
Incremented: 9
Incremented: 10
Final Result: 10
```

## Installation
To use this code, simply copy the `Mutex` class into your project. No additional libraries or dependencies are required.

## Benefits
- Prevents race conditions when accessing shared resources.
- Ensures fairness by serving tasks in the order they request the lock.
- Easy to integrate with existing JavaScript projects.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.