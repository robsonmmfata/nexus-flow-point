#!/usr/bin/env bash
set -euo pipefail
source /workspace/pgadmin-venv/bin/activate
export PGADMIN_SETUP_EMAIL="admin@example.com"
export PGADMIN_SETUP_PASSWORD="admin123"
export PGADMIN_PORT=5050
python -m pgadmin4
