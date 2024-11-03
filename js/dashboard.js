import { dbManager } from './database.js';

class DashboardManager {
    constructor() {
        this.currentUser = null;
    }

    async initialize() {
        try {
            // Get current user from storage
            const user = await new Promise(resolve => {
                chrome.storage.local.get('currentUser', (result) => {
                    resolve(result.currentUser);
                });
            });

            if (!user) {
                window.location.href = 'login.html';
                return;
            }

            this.currentUser = user;
            await this.loadUserProfile();
            await this.loadBadges();
            await this.loadRecentActivity();
            this.setupEventListeners();

        } catch (error) {
            console.error('Dashboard initialization failed:', error);
        }
    }

    async loadUserProfile() {
        const userAvatar = document.getElementById('userAvatar');
        const username = document.getElementById('username');
        const userPoints = document.getElementById('userPoints');

        userAvatar.src = `../assets/avatar/avatar${this.currentUser.avatar}.png`;
        username.textContent = this.currentUser.username;
        userPoints.textContent = this.currentUser.points || 0;
    }

    async loadBadges() {
        const badgeContainer = document.getElementById('badgeContainer');
        const scores = await dbManager.getUserScores(this.currentUser.id);

        const badges = {
            gold: scores.filter(score => score.gold_badge).length,
            silver: scores.filter(score => score.silver_badge).length,
            copper: scores.filter(score => score.copper_badge).length
        };

        badgeContainer.innerHTML = `
            <div class="badge">
                <img src="../assets/badges/gold.png" alt="Gold Badge">
                <p>${badges.gold}</p>
            </div>
            <div class="badge">
                <img src="../assets/badges/silver.png" alt="Silver Badge">
                <p>${badges.silver}</p>
            </div>
            <div class="badge">
                <img src="../assets/badges/copper.png" alt="Copper Badge">
                <p>${badges.copper}</p>
            </div>
        `;
    }

    async loadRecentActivity() {
        const activityList = document.getElementById('activityList');
        const scores = await dbManager.getUserScores(this.currentUser.id);
        
        const recentScores = scores
            .sort((a, b) => new Date(b.date_played) - new Date(a.date_played))
            .slice(0, 5);

        activityList.innerHTML = recentScores.map(score => `
            <div class="activity-item">
                <p>Quiz completed on ${new Date(score.date_played).toLocaleDateString()}</p>
                <p>Score: ${score.score}%</p>
                <p>Correct Answers: ${score.correct_answers}</p>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.getElementById('startQuiz').addEventListener('click', () => {
            window.location.href = 'quiz_selection.html';
        });

        document.getElementById('viewHistory').addEventListener('click', () => {
            // Implement history view
        });

        document.getElementById('settings').addEventListener('click', () => {
            window.location.href = 'settings.html';
        });
    }
}

const dashboard = new DashboardManager();
document.addEventListener('DOMContentLoaded', () => dashboard.initialize());
