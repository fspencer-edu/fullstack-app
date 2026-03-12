# Full stack production

## STACK

- Frontend: React

- Backend: Node.js / Express

- Database: PostgreSQL

- Cache / sessions / queues: Redis

- Reverse proxy / ingress: NGINX Ingress

- CI/CD: Jenkins

- Containers: Docker

- Orchestration: Kubernetes

- Registry: Docker Hub / GHCR / private registry

- Monitoring: Prometheus + Grafana

- Logs: Loki or EFK

- Secrets: Kubernetes Secrets / external secret manager

- Load balancing + scaling: Kubernetes Services + HPA

## Production Workflow

- Developer creates a feature branch in Git

- Code is developed locally with Docker Compose

- Unit and integration tests run locally

- Code is pushed to GitHub/GitLab

- Jenkins detects the push

- Jenkins runs:

    linting

    unit tests

    integration tests

    frontend build

    backend build

    Docker image builds

    vulnerability scanning

- If successful, Jenkins pushes versioned Docker images to a registry

- Jenkins deploys automatically to staging

- End-to-end tests run against staging

- After approval, Jenkins deploys to production

- Kubernetes handles:

- rolling updates

- load balancing

- horizontal scaling

- health checks

- self-healing

- Monitoring and logs are collected continuously