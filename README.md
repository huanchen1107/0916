# AIoT 2026: Interactive Personal Dashboard & Real-Time Telemetry Interface
> **Assignment**: DIC 1 (Do In Class 1) — Personal Page & Live Time System  
> **Author**: Huan Chen (陳煥)  
> **Course**: Artificial Intelligence of Things (AIoT 2026)  
> **Repository**: [https://github.com/huanchen1107/0916](https://github.com/huanchen1107/0916)

---

## 🔗 Live Demonstration

👉 **Live Demo**: [https://huanchen1107.github.io/0916/](https://huanchen1107.github.io/0916/)

![Live Demo Preview](demo_preview.png)

---

## 📖 Project Overview & Objectives

This project is a modern, high-performance personal dashboard created for **DIC 1 (Do In Class 1)**. It bridges real-time temporal telemetry with front-end interactive design, reflecting the identity and focus areas of an AIoT engineer.

### Key Objectives:
1. **Dynamic Identity**: Display author name (**Huan Chen / 陳煥**) with inline customization backed by browser `localStorage`.
2. **Real-Time Clock Telemetry**: Implement a live ticking digital clock with 12H/24H toggling, full calendar date, timezone detection, and day progress tracking.
3. **Context-Aware Experience**: Adapt page greetings based on the visitor's local hour.
4. **Rich Cyberpunk Aesthetics**: Apply frosted glassmorphism (`backdrop-filter: blur`), glowing ambient aura, and interactive HTML5 particle canvas physics.
5. **DevOps & Cloud Hosting**: Maintain disciplined Git version control and deploy continuously on GitHub Pages.

---

## 🚀 Core Features

- ⏱️ **Real-Time Hero Clock**: Updates hours, minutes, and seconds every 1,000 ms with smooth transitions.
- 🔄 **12H / 24H Format Switcher**: Instant toggle between 12-hour AM/PM and 24-hour military format, remembered across sessions.
- 🌅 **Dynamic Greeting Engine**: Contextual greetings that adjust to the time of day (`Good morning`, `Good afternoon`, `Good evening`, `Night mode active`).
- 📋 **Copy Timestamp Tool**: One-click export of ISO and local timestamps to clipboard with animated toast notification.
- 🌌 **Interactive Particle Canvas**: Custom HTML5 canvas particle network reacting to cursor movement and calculating node proximity lines.
- 🧠 **AIoT 2026 Curriculum Grid**: Showcases research pillars (TinyML, Sensor Telemetry, Intelligent Automation), technical arsenal tags, and simulated live node diagnostics.
- ✏️ **Profile Customizer Modal**: Enables in-browser editing of display name and title with persistent state.

---

## 🛠️ Technology Stack

| Layer | Technology | Description & Usage |
| :--- | :--- | :--- |
| **Structure** | HTML5 Semantic Elements | Accessible document layout (`<header>`, `<main>`, `<article>`, `<canvas>`, `<footer>`) |
| **Styling** | Vanilla CSS3 | Cyberpunk palette, glassmorphism, responsive grid & flexbox, keyframe glow animations |
| **Typography** | Google Fonts | `Outfit` (clock/headings), `Inter` (body copy), `JetBrains Mono` (badges/code) |
| **Logic** | Vanilla JavaScript (ES6+) | Real-time interval clock, canvas particle simulation, clipboard API, `localStorage` |
| **Hosting & CI/CD** | GitHub Pages & Git | Source version control and automated static cloud hosting |

---

## 📊 Project Workflow

```mermaid
flowchart TD
    %% Phase 1
    subgraph P1["Phase 1: Requirements & Design Definition"]
        A["Course Assignment (DIC 1)"] --> B["Interactive Alignment (Grill-Me)"]
        B --> C1["Theme: Cyberpunk Glassmorphism"]
        B --> C2["Hero Widget: Live Real-Time Clock"]
        B --> C3["Content: AIoT 2026 Focus Pillars"]
        B --> C4["Dynamic Canvas: Particle Network"]
    end

    %% Phase 2
    subgraph P2["Phase 2: Frontend Engineering"]
        C1 & C2 & C3 & C4 --> D["index.html (Semantic Structure)"]
        D --> E["style.css (Glassmorphism & Neon Glow)"]
        D --> F["app.js (Clock Loop & Canvas Physics)"]
    end

    %% Phase 3
    subgraph P3["Phase 3: State & Interactivity"]
        F --> G1["Real-Time Loop (1000ms Interval)"]
        F --> G2["12H / 24H Toggle (localStorage)"]
        F --> G3["Context-Aware Greeting (Hour-Based)"]
        F --> G4["Profile Customizer Modal (localStorage)"]
        F --> G5["Copy Timestamp to Clipboard"]
    end

    %% Phase 4
    subgraph P4["Phase 4: Local Verification"]
        G1 & G2 & G3 & G4 & G5 --> H["Local Server (Python HTTP :5173)"]
        H --> I["Visual & Interactive Verification"]
    end

    %% Phase 5
    subgraph P5["Phase 5: DevOps & Deployment"]
        I --> J["Git Init & Structured Commits"]
        J --> K["Link Remote Origin (GitHub: huanchen1107/0916)"]
        K --> L["Git Push to 'main' Branch"]
        L --> M["GitHub Pages Live Deployment"]
        M --> N["Documentation (README.md & Snapshot)"]
    end

    classDef phase fill:#0c132c,stroke:#00f0ff,stroke-width:2px,color:#fff;
    classDef step fill:#162447,stroke:#a855f7,stroke-width:1.5px,color:#e2e8f0;
    class P1,P2,P3,P4,P5 phase;
    class A,B,C1,C2,C3,C4,D,E,F,G1,G2,G3,G4,G5,H,I,J,K,L,M,N step;
```

### Phase Breakdown:
1. **Requirements & Alignment**: Clarified personal branding (**Huan Chen / 陳煥**), cyberpunk aesthetic, and dynamic timekeeping goals.
2. **Frontend Construction**: Built semantic `index.html`, responsive glassmorphism styles in `style.css`, and modular JS in `app.js`.
3. **State Management**: Integrated `localStorage` to save user profile and clock format preferences.
4. **Local Verification**: Tested responsiveness, animations, and real-time clock loops via a local development server.
5. **Cloud Deployment**: Pushed code to GitHub repository and enabled GitHub Pages for global access.

---

## 📦 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/huanchen1107/0916.git
   cd 0916
   ```

2. **Open directly**:
   - Double-click `index.html` to open in any web browser.

3. **Or serve via Python**:
   ```bash
   python -m http.server 5173
   ```
   Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Repository Structure

```
.
├── .gitignore          # Git exclusion rules
├── README.md           # Comprehensive project documentation & workflow
├── app.js              # Clock logic, greeting engine, canvas particle animation
├── demo_preview.png    # Live preview snapshot of the web application
├── index.html          # Semantic HTML5 layout and modal structures
└── style.css           # Cyberpunk styling, glassmorphic panels, and animations
```

---

© 2026 **Huan Chen (陳煥)** • AIoT Laboratory
