# NYP Mobile Events Manager

A mobile events app for Nanyang Polytechnic students to browse campus events and for organisers to publish new ones. Built as a Final Year Project in 2019 with a **React** frontend, a **Laravel REST API** and a **MySQL** database.

### >>> [Try the live demo](https://pinkaig.github.io/NYP-Mobile-Events-Manager/)

The demo runs the real app inside a phone frame in your browser. There's nothing to install.

<p align="center">
  <img src="docs/screenshots/events.png" width="240" alt="Event list screen">
  &nbsp;&nbsp;
  <img src="docs/screenshots/add-event.png" width="240" alt="Create event form">
  &nbsp;&nbsp;
  <img src="docs/screenshots/users.png" width="240" alt="User directory screen">
</p>

## Features

- **Event list:** events loaded from the REST API (title, dates, venue, organiser)
- **Create events:** a form that posts a new event to the API, with a category picker (Dance, Sports, Entertainment, Cultural)
- **User directory:** registered users and their roles
- **Backend support** for event registrations, feedback and ratings, plus token-based register/login endpoints

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 16, React Router (HashRouter), Create React App |
| API | Laravel 5.8 (PHP 7), Eloquent ORM, resource routes under `/api` |
| Database | MySQL / MariaDB with 5 tables and foreign keys |

```
React app  ──JSON──▶  Laravel /api/*  ──Eloquent──▶  MySQL
(frontend/)          (backend/routes/api.php)       (database/nyp_db.sql)
```

## Data model

![Database design](database/database-design.jpg)

`users` · `categories` · `events` (→ users, categories) · `event__registers` (→ users, events) · `event__feedback` (→ users, events)

## Repository layout

```
frontend/   React app source (src/, public/, package.json)
backend/    Laravel API: app/ models + controllers, routes/api.php, migrations
database/   nyp_db.sql export and database design diagram
docs/       GitHub Pages showcase: index.html (phone frame) + app.html (live demo)
tools/      build-demo.js, which packs the React build into docs/app.html
```

## Run it locally

**Frontend** (Node.js):

```bash
cd frontend
npm install
npm start          # on Node 17+, set NODE_OPTIONS=--openssl-legacy-provider first
```

**Backend** (PHP 7.1–7.4, Composer, MySQL):

```bash
cd backend
composer install
cp .env.example .env      # set DB_DATABASE=nyp_db, DB_USERNAME, DB_PASSWORD
php artisan key:generate
mysql -u root -e "CREATE DATABASE nyp_db"
mysql -u root nyp_db < ../database/nyp_db.sql
php artisan serve
```

The frontend calls `http://nypapp.eventsmgr/api`, which was a local Apache virtual host in 2019. Point it at your API URL, for example `http://127.0.0.1:8000/api`.

## About the live demo

`docs/app.html` is the compiled React app with a small in-browser stand-in for the Laravel API. The stand-in answers the same `/api` routes, starting from the data in `nyp_db.sql`. Changes are saved in the visitor's browser only. To rebuild it:

```bash
cd frontend && npm run build && node ../tools/build-demo.js . ../docs/app.html
```

(Run with `NO_STRIP=1 STANDALONE=1` to match the published file.)

## What I'd improve next

- **Edit screen:** load the selected event and send `PUT /api/events/{id}`. The original sends `PUT /api/events` without an ID.
- **Delete route:** fix the typo in `routes/api.php` (`'events/event_id}'`).
- **Photos:** store uploaded photos on disk so event images display.
- **Config:** move the API base URL into an environment variable and enable CORS.
- **Auth:** turn on the `auth:api` route group so writes require a logged-in user.
