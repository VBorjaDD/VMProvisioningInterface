from pydantic import BaseModel, Field
from typing import List
import uuid

class User(BaseModel):
    username: str
    is_sudoer: bool = False

class VM(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    cpu: int
    ram: int
    disk: int
    network: str
    users: List[User]
    packages: List[str]
