from docker import DockerClient
from docker.errors import NotFound
from fastapi import FastAPI, HTTPException

app = FastAPI()

client = DockerClient(base_url="unix:///var/run/docker.sock")

container_mapping = {
    "pharmacy": "pharmacy-fyp",
    "appointment": "appointment-fyp"
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
