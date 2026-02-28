/**
 * tactical_hud.js
 * Handles the "Console Log" typewriter effect in the hero section.
 */

export function initConsole() {
    const consoleElement = document.getElementById('hero-console');
    if (!consoleElement) return;

    // Define an array of message sequences to loop through.
    const logSequences = [
        [
            "PROJECT: CFD-Informed UAV Navigation",
            "PLANNER: Hybrid Bezier–A*",
            "COST_MAP: CFD Wind-Field Aware",
            "RESULT: -49.5% P95 (Crosswind)",
            "STACK: Python | FluidX3D",
            "CONTROLLER: Lee Position Controller",
            "STATUS: Validated on Crazyflie 2.1"
        ],
        [
            "PROJECT: Energy-Aware Language-Conditioned Manipulation",
            "POLICY: SAC + Sentence-BERT",
            "OBJECTIVE: Success + Energy + Smoothness",
            "RESULT: ENERGY: -30% | JERK: -40% | SUCCESS: Maintained",
            "TRAINING: 8x throughput",
            "STATUS: Stable in Simulation"
        ],
        [
            "PROJECT: Robust Kalman Filter for Object Tracking",
            "ALGORITHM: Robust Outlier Detection using Online EM learning",
            "RESULT: 79.8% Improvment in Tracking Accuracy",
            "STACK: Raspberry Pi 4B | ROS2 | Python",
            "STATUS: Completed"
        ]
    ];

    let sequenceIndex = 0;
    let messageIndex = 0;
    let charIndex = 0;
    const typingSpeed = 15;
    const lineDelay = 300;
    const sequenceDelay = 3000;

    let lineElements = [];
    let cursor = document.querySelector('.console-cursor');
    if (!cursor) {
        cursor = document.createElement('span');
        cursor.className = 'console-cursor';
    }

    function startSequence() {
        if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        consoleElement.innerHTML = '';
        const currentSequence = logSequences[sequenceIndex];

        lineElements = [];

        // Pre-create all lines for the sequence
        for (let i = 0; i < currentSequence.length; i++) {
            const line = document.createElement('div');
            line.className = 'console-line';

            const prefix = document.createElement('span');
            prefix.className = 'console-prefix';
            prefix.textContent = '> ';
            line.appendChild(prefix);

            const content = document.createElement('span');
            content.className = 'console-text';
            line.appendChild(content);

            consoleElement.appendChild(line);
            lineElements.push({ lineDiv: line, textSpan: content });
        }

        messageIndex = 0;
        charIndex = 0;
        typeLine();
    }

    function typeLine() {
        const currentSequence = logSequences[sequenceIndex];

        if (messageIndex >= currentSequence.length) {
            // Sequence complete. Wait, clear, and loop.
            setTimeout(() => {
                sequenceIndex = (sequenceIndex + 1) % logSequences.length;
                startSequence();
            }, sequenceDelay);
            return;
        }

        const currentLineInfo = lineElements[messageIndex];
        const currentContent = currentLineInfo.textSpan;
        const currentMessage = currentSequence[messageIndex];

        // Move cursor to active line
        if (cursor) {
            currentLineInfo.lineDiv.appendChild(cursor);
        }

        function typeChar() {
            if (charIndex < currentMessage.length) {
                currentContent.textContent += currentMessage[charIndex];
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                charIndex = 0;
                messageIndex++;
                setTimeout(typeLine, lineDelay);
            }
        }

        typeChar();
    }

    startSequence();
}
