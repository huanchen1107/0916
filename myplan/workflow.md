# Taiwan Weather Forecast — Project Workflow

## 1. Project Goal

Build a beginner-friendly Taiwan weather web application using **CWA OpenData**, **Python**, **SQLite/SQL**, and **Streamlit**, with the source code stored on **GitHub** and deployed automatically through **Streamlit Community Cloud**.

The project is designed as a complete learning workflow rather than a one-off demo. Students move from API data acquisition to JSON parsing, database storage, visualization, deployment, and later extension toward machine learning and AI-assisted weather analysis.

---

## 2. Core Technology Stack

- **CWA OpenData** — Taiwan weather data source
- **Python** — data processing and application logic
- **requests / httpx** — call CWA API
- **JSON** — API data format
- **pandas** — data cleaning and tabular processing
- **SQLite** — lightweight local database
- **SQL** — query weather observations
- **Streamlit** — interactive web application
- **Folium / Streamlit map components** — Taiwan weather visualization
- **GitHub** — source-code repository and version control
- **Streamlit Community Cloud** — deployment and automatic redeployment
- **Antigravity** — AI-assisted coding / Vibe Coding workflow

---

## 3. Main Learning Flow

```text
CWA OpenData
    ↓
API Request
    ↓
JSON
    ↓
Python
    ↓
Data Cleaning / pandas
    ↓
SQLite
    ↓
SQL Query
    ↓
Streamlit
    ↓
Charts / Tables / Taiwan Map
    ↓
GitHub
    ↓
Streamlit Community Cloud
    ↓
Auto Deploy
```

The key principle is:

> **Code first lives in GitHub, then Streamlit Community Cloud deploys directly from the GitHub repository.**

---

## 4. Development Workflow

### Step 1 — Create GitHub Repository

Create or use the repository:

```text
huanchen1107/0916
```

GitHub is the single source of truth for the project source code.

---

### Step 2 — Connect Antigravity to GitHub

Use Antigravity to clone or connect to the repository.

```text
GitHub Repository
      ↓
Antigravity IDE
      ↓
AI Vibe Coding
```

Use AI to help generate, explain, test, and improve the application, but keep all important source code under Git version control.

---

### Step 3 — Build the CWA API Module

The application obtains Taiwan weather data from CWA OpenData.

Example responsibility:

```text
CWA API
  ↓
HTTP Request
  ↓
JSON Response
  ↓
Extract useful fields
```

Typical fields may include:

- location / station name
- date / observation time
- temperature
- minimum temperature
- maximum temperature
- humidity
- rainfall
- wind information

The exact fields depend on the selected CWA dataset.

---

### Step 4 — Parse and Clean JSON Data

Python converts the raw CWA JSON response into a cleaner internal structure.

Typical processing steps:

```text
Raw JSON
   ↓
Locate records
   ↓
Extract fields
   ↓
Convert values to numbers
   ↓
Handle missing values
   ↓
Create pandas DataFrame
```

The frontend should not contain complicated raw-JSON parsing logic. Data processing should be kept in reusable Python functions or modules.

---

## 5. Store Weather Data in SQLite

Instead of only displaying API data temporarily, store useful weather records in SQLite.

A simple first table can be:

```sql
CREATE TABLE TemperatureForecasts (
    id INTEGER PRIMARY KEY,
    regionName TEXT,
    dataDate TEXT,
    min REAL,
    max REAL
);
```

For a more advanced version, separate station metadata and weather observations.

Example:

```text
Station
├── station_id
├── station_name
├── county
├── town
├── latitude
└── longitude

WeatherObservation
├── id
├── station_id
├── observed_at
├── temperature
├── humidity
├── rainfall
├── wind_speed
└── wind_direction
```

This lets students practice real database concepts such as primary keys, repeated observations, and historical time-series data.

---

## 6. Query Data with SQL

Use SQL to retrieve useful weather information.

Examples:

```sql
SELECT DISTINCT regionName
FROM TemperatureForecasts;
```

```sql
SELECT *
FROM TemperatureForecasts
WHERE regionName = '中部地區';
```

Later queries can support:

- hottest regions
- coolest regions
- regional averages
- date-based filtering
- historical trends

---

## 7. Build the Streamlit App

Streamlit is the main web UI framework for the first version of this project.

Recommended functions:

1. Region selector
2. Date selector
3. Weather summary
4. Data table
5. Min / Max temperature chart
6. Taiwan map
7. Last-update information
8. Refresh control

Example UI flow:

```text
User selects region
      ↓
SQL query
      ↓
DataFrame
      ↓
Streamlit
      ↓
Table + Chart + Map
```

---

## 8. Recommended Project Structure

```text
0916/
├── app.py
├── requirements.txt
├── README.md
├── myplan/
│   └── workflow.md
├── .gitignore
├── src/
│   ├── cwa_api.py
│   ├── database.py
│   └── weather.py
├── data/
│   └── weather.db
└── .streamlit/
    └── config.toml
```

Possible responsibilities:

- `app.py` — Streamlit UI
- `src/cwa_api.py` — CWA API access and JSON parsing
- `src/database.py` — SQLite operations
- `src/weather.py` — weather processing / analysis logic
- `requirements.txt` — Python dependencies
- `myplan/workflow.md` — project architecture and development workflow

---

## 9. Local Development

Run the project locally before deployment.

```bash
pip install -r requirements.txt
streamlit run app.py
```

Verify that:

- the CWA API returns data
- JSON is parsed correctly
- SQLite reads / writes successfully
- Streamlit launches without errors
- charts and maps render correctly

---

## 10. Git Workflow

After each meaningful change:

```bash
git add .
git commit -m "Describe the change"
git push
```

Recommended workflow:

```text
Antigravity
   ↓
Modify / Test Code
   ↓
Git Commit
   ↓
GitHub Push
```

Avoid keeping important project code only on the local computer.

---

# 11. Streamlit Auto Deployment

This is the required deployment model for the project.

```text
GitHub Repository
      ↓
Streamlit Community Cloud
      ↓
Select Repository
      ↓
Select Branch: main
      ↓
Main file: app.py
      ↓
Deploy
```

After the initial deployment:

```text
Modify Code
    ↓
Commit
    ↓
Push to GitHub
    ↓
Streamlit detects update
    ↓
Application automatically redeploys
```

Therefore, the operational workflow becomes:

> **Antigravity → GitHub → Streamlit Auto Deploy**

No manual file upload to Streamlit should be required for normal updates.

---

## 12. Secrets Management

Do **not** write the CWA API key directly inside `app.py` or commit it to GitHub.

Local development may use a local secrets file.

Example:

```toml
# .streamlit/secrets.toml
CWA_API_KEY = "your-key"
```

Access it in Streamlit with:

```python
import streamlit as st

api_key = st.secrets["CWA_API_KEY"]
```

For Streamlit Community Cloud, configure the secret in the application settings.

Important:

```text
Source Code        → GitHub
API Secret         → Streamlit Secrets
Never commit key   → GitHub
```

Also add private secret files to `.gitignore`.

---

# 13. Project Milestones

## Phase 1 — Working Weather App

Goal: prove that the complete data path works.

```text
CWA API
→ JSON
→ Python
→ Streamlit
```

Minimum features:

- retrieve CWA data
- choose a region
- show weather values
- display a table

---

## Phase 2 — Database Version

Add:

```text
Python
→ SQLite
→ SQL
→ Streamlit
```

Students learn how data can persist beyond a single API call.

---

## Phase 3 — Visualization Dashboard

Add:

- temperature line chart
- min/max temperature comparison
- data table
- regional filtering
- Taiwan weather map

The system becomes a full weather dashboard.

---

## Phase 4 — GitHub + Streamlit Deployment

Complete the software-delivery workflow:

```text
Code
→ GitHub
→ Streamlit Community Cloud
→ Public Web App
```

Successful deployment is part of the project, not an optional final step.

---

## Phase 5 — Advanced Extension

Possible future additions:

- historical weather storage
- hottest / coolest station ranking
- rainfall visualization
- county average temperature
- weather alerts
- Folium Taiwan visualization
- automatic data refresh
- multiple CWA datasets

---

## Phase 6 — Data Analytics / Machine Learning

The same project can later become the data source for CRISP-DM and machine learning lessons.

```text
Historical Weather Data
        ↓
Data Understanding
        ↓
Data Preparation
        ↓
Feature Engineering
        ↓
Machine Learning
        ↓
Evaluation
        ↓
Weather Intelligence
```

Possible projects:

- temperature prediction
- weather classification
- rainfall analysis
- regional weather clustering
- anomaly detection

---

## Phase 7 — AI Weather Agent

A later version can allow natural-language questions such as:

```text
今天台灣哪裡最熱？
```

The AI should not invent weather information. It should obtain real data through the project database / tools.

```text
User Question
      ↓
AI Agent
      ↓
SQL / Weather Data
      ↓
Structured Result
      ↓
Natural-language Answer
```

This turns the original dashboard into a **Taiwan Weather Intelligence Platform**.

---

# 14. Final End-to-End Workflow

```text
CWA OpenData
      ↓
API
      ↓
JSON
      ↓
Python
      ↓
pandas / Data Cleaning
      ↓
SQLite
      ↓
SQL
      ↓
Streamlit
      ↓
Charts / Table / Taiwan Map
      ↓
GitHub
      ↓
Streamlit Community Cloud
      ↓
AUTO DEPLOY
      ↓
Historical Data
      ↓
CRISP-DM / Machine Learning
      ↓
AI Weather Agent
```

---

# 15. Core Principle

The project should always preserve this simple engineering workflow:

> **BUILD → TEST → PUSH → AUTO DEPLOY**

```text
Antigravity
   ↓
Build / Modify
   ↓
Local Test
   ↓
GitHub Push
   ↓
Streamlit Auto Deploy
   ↓
Verify Web App
```

This workflow allows the project to remain simple enough for beginners while still teaching a realistic modern software-development process.
