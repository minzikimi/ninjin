# MoNo Marketplace

A student-only marketplace for Hyper Island. Buy, sell, save items, and get notified when prices change—all within the school community.

---

## Features
- **Restricted Signup:** Only `@hyperisland.se` emails allowed (So far only managed on the front end side xD).
- **CRUD Posts:** Create, browse, edit, delete items.
- **Save Items:** Mark favorites and track them.
- **Real-time Price Alerts:** Get notifications when saved items’ prices change.
- **Profiles:** Name, location, phone, and bio.
- **UI/UX:** Tailwind CSS, orange brand color(Inspired by HI themed color and Karrot), loading spinner, simple animations.

---

## Tech Stack
- **Frontend**: Vue 3, Tailwind CSS, Pinia (state management)
- **Backend**: Supabase (Auth, Database, Storage, Realtime)
- and Real-time price alerts via Supabase Realtime & Pinia store

---

## Improvements & Next Steps
- Expand chat functionality for real-time communication.
- Profile badges/ratings for trust and verification(just like 당근).
- Accessibility improvements (alt texts, color contrast).
- Search & filter for items (categories, price range, keywords).

---

## Installation
```bash
git clone <repo-url>
cd mono
npm install
npm run dev
