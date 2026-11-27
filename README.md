# EMT Skills Testing Tracker

Skills-testing tracker for EMT psychomotor exams.

- `index.html` — lead instructor's tracker (Google sign-in, owner only)
- `station.html` — instructor station screen (enter a station code; no account needed)
- `sheets.js` — NREMT EMT psychomotor skill sheets as digital forms
- `firebase-config.js` — Firebase project identifiers (not secrets)
- `firestore.rules` — security rules template (the deployed copy names the owner's account)

No student data is stored in this repository; it lives in Firebase and is protected by the security rules.
