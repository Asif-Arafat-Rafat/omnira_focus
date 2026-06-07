# Omnira

Omnira is a Chrome extension that gives users fine-grained control over web interfaces by enabling or disabling specific UI elements such as the home feed, sidebar, recommendations, and comments.

It works as a lightweight **UI control layer** for distraction-free browsing across modern websites.

---

## 🚀 Features

- Toggle Home Page content
- Enable/disable Sidebar
- Control Recommendations feed
- Hide or show Comments section
- Works on dynamic SPA websites (like YouTube)
- Lightweight and fast performance
- Persistent settings using Chrome Storage API

---

## 🧠 Concept

Omnira acts as a **unified control layer** over web interfaces.

Instead of modifying websites permanently, it observes page changes in real time using `MutationObserver` and applies user-defined rules dynamically.

This allows Omnira to work even on modern single-page applications (SPAs).

---

## ⚙️ Tech Stack

- JavaScript (Vanilla)
- HTML + CSS (Popup UI)
- Chrome Extension Manifest V3
- MutationObserver API
- Chrome Storage API

---

## 📦 Installation

### 1. Download the project
Click the green **Code** button on this repository and select **Download ZIP**.

Extract the ZIP file to a folder on your computer.

---

### 2. Open Chrome Extensions page
Go to:
chrome://extensions/

---

### 3. Enable Developer Mode
Turn ON **Developer mode** (top-right corner).

---

### 4. Load the extension
Click **Load unpacked** and select the extracted project folder.

---

### 5. Done 🎉
Omnira is now active in your browser.

Click the extension icon to open the control panel and customize your browsing experience.

---

## 🎯 Use Cases

- Focus mode for studying or work
- Removing distractions from YouTube
- Cleaner browsing experience
- Minimal UI control across modern web apps

---

## 🧩 Future Improvements

- Multi-site support (Netflix, X/Twitter, Instagram, etc.)
- Rule-based UI control engine
- Focus presets (Study Mode, Work Mode, Relax Mode)
- Performance optimizations for SPA-heavy websites
- Advanced filtering system


