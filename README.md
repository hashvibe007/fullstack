# fullstack
Fullstack Application template - ReactJS &amp; FastAPI

<!-- Setup -->
Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

<!-- Run -->
<!-- backend -->
uv venv
source .venv/bin/activate from backend folder
uvicorn app.api.main:app --reload
<!-- frontend -->
npm start