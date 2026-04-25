# Adaptive Learning Assistant (Unified Cloud Run)

A single-container solution for the Adaptive Learning Assistant, combining a React frontend and Node.js backend for seamless deployment to Google Cloud Run.

## Structure
- `/client`: React frontend (Vite)
- `/server`: Node.js Express backend (serves API and static files)
- `Dockerfile`: Multi-stage build for the entire stack.

## Deployment to Cloud Run

### Option A: Using Google Cloud CLI (gcloud)
If you have `gcloud` installed locally:
1. Ensure Firestore is enabled in your GCP project.
2. Build and deploy:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/adaptive-tutor
   gcloud run deploy adaptive-tutor --image gcr.io/YOUR_PROJECT_ID/adaptive-tutor --platform managed
   ```

### Option B: Using Google Cloud Shell (Easiest)
If `gcloud` is not installed on your machine:
1. Zip the `adaptive-learning-assistant` folder.
2. Open the [Google Cloud Console](https://console.cloud.google.com/).
3. Click the **Cloud Shell** icon in the top right.
4. Upload your zip file to Cloud Shell.
5. Unzip and run the same `gcloud` commands as above. Cloud Shell has everything pre-installed!

### Option C: Install gcloud CLI locally
If you want to install it on your Mac:
1. Download the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install#mac).
2. Extract and run `./google-cloud-sdk/install.sh`.
3. Run `gcloud init` to configure your project.

## Features
- **Unified Origin**: No CORS issues since frontend and backend share the same service.
- **Adaptive AI**: Integrated with Vertex AI Gemini.
- **Persistent Stats**: Integrated with Google Cloud Firestore.
