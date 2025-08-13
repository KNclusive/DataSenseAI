# AI-Powered Dataset Analyzer

## Introduction

The DataSenseAI is a web application that allows users to upload and analyze datasets using an AI-powered Agent pipeline. The application processes datasets in-memory during user sessions, ensuring privacy and efficiency.

## Features

- Upload and preprocess survey datasets containing numerical and demographic data.
- Generate AI-driven insights based on user queries.
- Display insights along with source context.
- Handles multiple users simultaneously without storing datasets persistently.
- User-friendly frontend interface built with React.

## Technologies

- **Backend**: Python, FastAPI
- **Frontend**: React
- **AI Models**: OpenAI GPT-4o-mini
- **Data Processing**: Pandas, NumPy
- **In-Memory Data Store**: Redis
- **Deployment**: Docker, Docker Compose

## Project Structure
```bash
AI-Powered-Dataset-Analyzer/
├── backend/
│ ├── src/
│ │ ├── Agent_prompts.py
│ │ ├── Agent_tools.py
│ │ ├── main.py
│ ├── .dockerignore
│ ├── requirements.txt
│ └── Dockerfile
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── DataChart.js
│ │ │ ├── DataTable.js
│ │ │ ├── FullScreenChartDialog.js
│ │ │ ├── Header.js
│ │ │ ├── Insights.js
│ │ │ ├── Loader.js
│ │ │ └── PreviousInsights.js
│ │ ├── pages/
│ │ │ ├── Dashboard.js
│ │ │ └── Home.js
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.css
│ │ ├── App.js
│ │ ├── index.css
│ │ ├── index.js
│ │ └── theme.js
│ ├── .dockerignore
│ ├── Dockerfile
│ ├── README.md
│ ├── nginx.conf
│ ├── package-lock.json
│ └── package.json
├── .gitignore
├── LICENSE
├── docker-compose.yml
└── README.md
```

## Setup Instructions
- [Run Instructions](#run-code)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Deployment](#deployment-setup)

## License

MIT License

## Backend Setup

1. Navigate to the `backend` directory.

   ```bash
   cd backend
   ```

2. Create virtual environment to install all dependencies.

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install requirements.txt file in your virtual environment.

   ```bash
   pip install -r requirements.txt
   ```

## Frontend Setup

1. Navigate to the `frontend` directory.
   ```bash
   cd frontend
   ```
2. Install nmp third-part dependencies and start.
   ```bash
   npm install
   npm start
   ```

## Deployment Setup

Instructions on how to deploy the application using docker are provided in docs/DEPLOYMENT.md (Comming Soon)

## Run Code

```bash
cd AI-Powered-Dataset-Analyzer
docker-compose build
docker-compose up
```
Add your API_Keys And Environment Variables in the docker-compose.yaml environment for backend and frontend and run the above code to run this project locally.
