# Wish Well Automator - Deployment Guide

This guide explains how to deploy the Wish Well Automator as a full-stack application.

## 🏗️ Architecture

Because this application uses `whatsapp-web.js` (which runs a real WhatsApp browser instance), it **requires a persistent server** to stay connected to WhatsApp. It cannot run purely on Vercel Serverless Functions (which shut down after 10-60 seconds).

To "make it work" reliably in the cloud, we use a **Hybrid Architecture**:

1.  **Frontend (Dashboard)**: Hosted on **Vercel** (Serverless, fast, free).
2.  **Backend (Worker)**: Hosted on **Railway** (or Render). This runs the "server" folder 24/7 to keep WhatsApp connected and check for messages every minute.
3.  **Database**: **Supabase** (Shared by both).

---

## 🚀 Step 1: Database (Supabase)

1.  Log in to your Supabase project.
2.  Go to **Project Settings** -> **API**.
3.  Copy these keys:
    *   `Project URL`
    *   `anon` (public) key
    *   `service_role` (secret) key - **Keep this safe!**

---

## 🚀 Step 2: Deploy Backend (The WhatsApp Engine)

The backend handles the checking mechanism ("every minute"), sends messages, and maintains the WhatsApp connection.

**Recommended Host: Railway** (Easiest for Docker/Node workers)

1.  **Push your code to GitHub** (if not already there).
2.  Creating the Service:
    *   Sign up/Login to [Railway.app](https://railway.app/).
    *   Click **New Project** -> **Deploy from GitHub repo**.
    *   Select your `wish-well-automator-main` repository.
    *   **Important**: Railway might try to deploy the root. We need to deploy the `server` folder.
    *   Go to **Settings** (for the service) -> **Root Directory** -> change to `/server`.
3.  **Environment Variables**:
    *   Go to the **Variables** tab.
    *   Add the following:
        *   `SUPABASE_URL`: (Your Supabase URL)
        *   `SUPABASE_SERVICE_ROLE_KEY`: (Your `service_role` key from Supabase - *Important: Must be the service role key to bypass row level security for the bot*)
        *   `CRON_INTERVAL`: `* * * * *` (Runs every minute)
4.  **Wait for Build**: Railway will detect the `Dockerfile` (which I created for you) and build it.
5.  **Scan QR Code**:
    *   Once the deployment is "Active" (Green), click on the **View Logs** (Deployment Logs).
    *   You will see a QR Code in the logs (text-based).
    *   Open WhatsApp on your phone -> Linked Devices -> Link a Device.
    *   Scan the QR Code from the logs.
    *   You should see `✅ WhatsApp authenticated!` in the logs.

**How it works**:
*   The server runs inside a Docker container.
*   The `scheduler.js` runs a check every minute.
*   It looks for wishes in Supabase where `status = 'scheduled'` AND `scheduled_date <= NOW`.
*   If found, it sends them via the active WhatsApp connection.

---

## 🚀 Step 3: Deploy Frontend (The Dashboard)

The frontend is where you schedule the messages.

**Host: Vercel**

1.  Sign up/Login to [Vercel.com](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import the same GitHub repository (`wish-well-automator-main`).
4.  **Framework Preset**: It should verify as **Vite**.
5.  **Root Directory**: Leave it as default (`./`).
6.  **Environment Variables**:
    *   Add the following:
        *   `VITE_SUPABASE_URL`: (Your Supabase URL)
        *   `VITE_SUPABASE_PUBLISHABLE_KEY`: (Your `anon` key)
7.  Click **Deploy**.

---

## 🔄 Workflow

1.  You open the **Vercel URL** (Dashboard).
2.  You create a "Wish" -> It saves to Supabase with `status: 'scheduled'`.
3.  The **Railway Worker** (Backend) wakes up (every minute).
4.  It checks Supabase. finds the wish.
5.  It sends the wish via WhatsApp.
6.  It updates the wish status to `sent` in Supabase.
7.  Verified!

### ⚠️ Note on Vercel-Only Deployment
It is technically impossible to host the *backend worker* reliably on Vercel Free Tier because:
1.  Vercel Functions time out (10s limit). WhatsApp login takes >10s.
2.  Vercel Filesystem is Read-Only. You can't save the WhatsApp session file, so you'd have to scan the QR code *every single minute* (impossible).
3.  This is why we use Railway or a VPS for the backend.
