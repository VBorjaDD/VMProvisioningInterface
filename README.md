---

# 🖥️ VM Provisioning Interface

A simple full-stack web application for creating, editing, listing, and deleting virtual machines — complete with user and package management. This is a mock system using in-memory and file-based storage, designed to demonstrate RESTful API design, React integration, and practical UI design with Material UI (MUI).

---

## 📦 Features

* Create, edit, and delete VMs
* Assign users (normal or sudoers) from a mock Active Directory
* Select installed RPM packages from a predefined list
* View all VMs in a structured, interactive table
* Responsive, modern UI using Material UI (MUI v6+)
* Fully mocked backend — **no real VMs are provisioned**
* Data persisted to a local `vm_data.json` file

---

## 🚀 Getting Started

### ✅ Prerequisites

* Python 3.8+
* Node.js 18+
* npm 9+

---

### 📁 Project Structure

```
vm-provisioning/
├── backend/
│   ├── main.py           # FastAPI app
│   ├── models.py         # Pydantic data models
│   ├── storage.py        # File-based storage and mock data
│   └── vm_data.json      # JSON file where VM data is saved
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── VMFormModal.js
│   │   └── VMList.js
│   └── package.json
│
├── requirements.txt
└── README.md
```

---

## 🧰 Tools & Libraries Used

### Backend (Python)

* [FastAPI](https://fastapi.tiangolo.com/)
* [Pydantic](https://pydantic-docs.helpmanual.io/)
* [Uvicorn](https://www.uvicorn.org/) (ASGI server)

### Frontend (React)

* [React](https://reactjs.org/)
* [Axios](https://axios-http.com/) (HTTP requests)
* [Material UI](https://mui.com/) (UI components)

---

## ⚙️ Installation

### Backend

```bash
cd vm-provisioning  # Project root
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r ../requirements.txt
uvicorn main:app --reload
```
> ⚠️ **Important:** Do not run `uvicorn` from inside the `backend/` folder, or you'll get a relative import error. Always run from the project root and use `backend.main:app`.


The API will be available at:
**[http://localhost:8000](http://localhost:8000)**

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will open at:
**[http://localhost:3000](http://localhost:3000)**

---

## 🔗 API Overview

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | `/vms`           | List all VMs              |
| GET    | `/vms/{id}`      | Get a VM by ID            |
| POST   | `/vms`           | Create a new VM           |
| PUT    | `/vms/{id}`      | Update a VM by ID         |
| DELETE | `/vms/{id}`      | Delete a VM by ID         |
| GET    | `/mock/ad-users` | Mock AD user list         |
| GET    | `/mock/packages` | Mock list of RPM packages |

---

## 🧠 Design Notes

* The backend simulates a virtualization and user management environment.
* No external services are used. Data is loaded from and saved to `vm_data.json`.
* The UI includes a modal form for both **create** and **edit**, with:

  * dropdowns for CPU, RAM, Disk
  * multi-select checklists for users and packages
* User entries include `is_sudoer` support, toggleable from the UI
* Form field layouts follow MUI v6+ grid specifications (`size={{ xs: 12, sm: 6 }}`)

---

## 🧪 Mocked Interfaces

* **Users** are mocked as normal or sudoers from a simulated "Active Directory"
* **Packages** come from a simulated repository
* **VM provisioning** is stubbed — no actual VM is created

All interfaces are fake but follow realistic structures for integration with real services.

---


