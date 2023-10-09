from docker import DockerClient
from docker.errors import NotFound
from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

client = DockerClient(base_url="unix:///var/run/docker.sock")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
container_mapping = {
    "pharmacy": "pharmacy-fyp",
    "appointment": "appointment-fyp",
    "auth": "auth-fyp",
#     "users": "user-fyp",
#     "notification": "notification-scheduler-fyp"
}


def start_container(container_name):
    try:
        container = client.containers.get(container_name)
        if container.status == "exited":
            container.start()
            return f"Container {container_name} started."
        else:
            return f"Container {container_name} is already running."
    except NotFound:
        container = client.containers.run(
            container_name + "latest",
            detach=True,
            name=container_name,
            networks=["fyp-network"],  # Attach to the custom network created in step 1
        )


def stop_container(container_name):
    container = client.containers.get(container_name)
    if container.status == "running":
        container.stop()
        return f"Container {container_name} stopped."
    else:
        return f"Container {container_name} is already stopped."


def container_status(container_name):
    container = client.containers.get(container_name)
    return container.status


@app.get("/module/start/{container}")
def start_endpoint(container: str):
    container_name = container_mapping.get(container)
    if container_name:
        return start_container(container_name)
    raise HTTPException(status_code=404, detail=f"Container {container} not found.")


@app.get("/module/stop/{container}")
def stop_endpoint(container: str):
    container_name = container_mapping.get(container)
    if container_name:
        return stop_container(container_name)
    raise HTTPException(status_code=404, detail=f"Container {container} not found.")


@app.get('/module/status/{container}')
def status_endpoint(container: str):
    container_name = container_mapping.get(container)
    if container_name:
        return container_status(container_name)
    raise HTTPException(status_code=404, detail=f"Container {container} not found.")

@app.get('/module/status')
def status_endpoint():
    return [
        {"name": name,"status":  container_status(container)} for name, container in container_mapping.items()
    ]
