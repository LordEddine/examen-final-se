/* ============================================================
   OPÉRATION BLACKOUT-Ω — Compte à rebours
   ============================================================ */

class CountdownTimer {
    constructor() {
        this.display = document.getElementById('main-timer');
        // Date limite fixe : dimanche 22 février 2026 à 08:10 (heure locale)
        this.endTime = new Date(2026, 1, 22, 8, 10, 0).getTime();
        this.interval = null;

        this.start();
    }

    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        const remaining = this.endTime - Date.now();

        if (remaining <= 0) {
            clearInterval(this.interval);
            this.display.textContent = '00:00:00';
            this.display.style.color = 'var(--red)';
            this.triggerGameOver();
            return;
        }

        const hours = Math.floor(remaining / 3600000);
        const mins = Math.floor((remaining % 3600000) / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);

        const timeStr = [
            hours.toString().padStart(2, '0'),
            mins.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');

        this.display.textContent = timeStr;

        // Color warnings
        const totalMins = remaining / 60000;
        if (totalMins <= 10) {
            this.display.style.color = 'var(--red)';
            this.display.classList.add('timer-critical');
            document.querySelector('.top-bar')?.classList.add('alert-border');
        } else if (totalMins <= 30) {
            this.display.style.color = '#ff8800';
            this.display.classList.remove('timer-critical');
        } else if (totalMins <= 60) {
            this.display.style.color = 'var(--yellow)';
            this.display.classList.remove('timer-critical');
        } else {
            this.display.style.color = 'var(--primary)';
            this.display.classList.remove('timer-critical');
        }
    }

    triggerGameOver() {
        if (typeof showGameOver === 'function') {
            showGameOver();
        }
    }

    stop() {
        clearInterval(this.interval);
    }

    static clearSaved() {
        localStorage.removeItem('blackout_timer_end');
    }
}
