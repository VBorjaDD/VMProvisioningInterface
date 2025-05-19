import os
import json
from .models import VM

DATA_FILE = "vm_data.json"

def load_data():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r") as f:
        try:
            raw = json.load(f)
            return {k: VM(**v) for k, v in raw.items()}
        except json.JSONDecodeError:
            return {}

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump({k: v.dict() for k, v in data.items()}, f, indent=2)

# Initial mock data (can be adjusted or replaced with fetch)
mock_package_list = [
    "nginx", "httpd", "vim", "curl", "python3", "git", "wget",
    "docker", "nodejs", "postgresql", "mysql", "redis"
]

mock_ad_users = ["alice", "bob", "carol", "dave"]
