from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import VM
from .storage import load_data, save_data, mock_ad_users, mock_package_list

app = FastAPI()

# Allow all CORS during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/vms")
def list_vms():
    return list(load_data().values())

@app.get("/vms/{vm_id}")
def get_vm(vm_id: str):
    data = load_data()
    vm = data.get(vm_id)
    if not vm:
        raise HTTPException(status_code=404, detail="VM not found")
    return vm

@app.post("/vms")
def create_vm(vm: VM):
    data = load_data()
    if vm.id in data:
        raise HTTPException(status_code=400, detail="VM already exists")
    data[vm.id] = vm
    save_data(data)
    return vm

@app.put("/vms/{vm_id}")
def update_vm(vm_id: str, updated_vm: VM):
    data = load_data()
    if vm_id not in data:
        raise HTTPException(status_code=404, detail="VM not found")
    data[vm_id] = updated_vm
    save_data(data)
    return updated_vm

@app.delete("/vms/{vm_id}")
def delete_vm(vm_id: str):
    data = load_data()
    if vm_id not in data:
        raise HTTPException(status_code=404, detail="VM not found")
    del data[vm_id]
    save_data(data)
    return {"detail": "VM deleted"}

@app.get("/mock/packages")
def get_packages():
    return mock_package_list

@app.get("/mock/ad-users")
def get_ad_users():
    return mock_ad_users
