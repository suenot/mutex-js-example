class Mutex {
    constructor() {
        this.locked = false;
        this.queue = [];
    }

    lock() {
        const promise = new Promise((resolve) => {
            if (!this.locked) {
                this.locked = true;
                resolve();
            } else {
                this.queue.push(resolve);
            }
        });
        return promise;
    }

    unlock() {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            next(); // Разблокируем следующий
        } else {
            this.locked = false;
        }
    }
}

// Пример использования
const mutex = new Mutex();
let sharedResource = 0;

async function increment() {
    await mutex.lock();
    try {
        sharedResource++;
        console.log(`Incremented: ${sharedResource}`);
    } finally {
        mutex.unlock();
    }
}

async function main() {
    const tasks = [];
    for (let i = 0; i < 10; i++) {
        tasks.push(increment());
    }
    await Promise.all(tasks);
    console.log(`Final Result: ${sharedResource}`);
}

main();