class DatabaseManager {
    constructor() {
        this.dbName = 'ThermoQuizDB';
        this.dbVersion = 1;
    }

    async initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (event) => {
                reject('Database error: ' + event.target.error);
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create Questions store
                const questionsStore = db.createObjectStore('questions', { keyPath: 'id' });
                questionsStore.createIndex('unit', 'unit', { unique: false });
                questionsStore.createIndex('topic', 'topic', { unique: false });
                questionsStore.createIndex('difficulty_level', 'difficulty_level', { unique: false });

                // Create Users store
                const usersStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                usersStore.createIndex('email', 'email', { unique: true });
                usersStore.createIndex('username', 'username', { unique: true });

                // Create Scores store
                const scoresStore = db.createObjectStore('scores', { keyPath: 'id', autoIncrement: true });
                scoresStore.createIndex('user_id', 'user_id', { unique: false });
                scoresStore.createIndex('date_played', 'date_played', { unique: false });

                // Create Categories store
                const categoriesStore = db.createObjectStore('categories', { keyPath: 'id' });
                categoriesStore.createIndex('name', 'name', { unique: true });

                // Create Units store
                const unitsStore = db.createObjectStore('units', { keyPath: 'id' });
                unitsStore.createIndex('category_id', 'category_id', { unique: false });

                // Create Topics store
                const topicsStore = db.createObjectStore('topics', { keyPath: 'id' });
                topicsStore.createIndex('unit_id', 'unit_id', { unique: false });
            };
        });
    }

    async addUser(userData) {
        const db = await this.initDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.add(userData);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getUserByEmail(email) {
        const db = await this.initDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const index = store.index('email');
            const request = index.get(email);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

export const dbManager = new DatabaseManager();
