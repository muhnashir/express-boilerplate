# Health Check Documentation

This document provides information about the health check endpoints available in the application.

## Overview

Health checks are essential for monitoring the status and performance of your application. They provide information about the application's health, including its dependencies like databases and caches. Health checks are commonly used by:

- Load balancers to determine if a service is available
- Monitoring tools to track application status
- Orchestration systems (like Kubernetes) to manage container lifecycle
- DevOps teams to diagnose issues

## Available Endpoints

The application provides two health check endpoints:

### 1. Basic Health Check

**Endpoint:** `GET /api/v1/health`

This endpoint provides basic information about the application's health status.

**Example Response:**
```json
{
  "status": "SUCCESS",
  "message": "Health check successful",
  "data": {
    "status": "ok",
    "timestamp": "2025-10-01T14:38:00.000Z",
    "uptime": 3600.45,
    "environment": "development"
  },
  "timestamp": "2025-10-01T14:38:00.000Z"
}
```

### 2. Detailed Health Check

**Endpoint:** `GET /api/v1/health/detailed`

This endpoint provides comprehensive information about the application's health, including:
- System information (memory, CPU, platform)
- Database connection status
- Redis connection status (if configured)
- Overall health status based on all checks

**Example Response:**
```json
{
  "status": "SUCCESS",
  "message": "Detailed health check successful",
  "data": {
    "status": "ok",
    "timestamp": "2025-10-01T14:38:00.000Z",
    "uptime": 3600.45,
    "environment": "development",
    "system": {
      "memory": {
        "total": "16.32 GB",
        "free": "8.16 GB",
        "usage": "50%"
      },
      "cpu": {
        "cores": 8,
        "model": "Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz",
        "load": [1.2, 1.5, 1.7]
      },
      "platform": {
        "type": "Linux",
        "release": "5.15.0-58-generic",
        "architecture": "x64"
      }
    },
    "services": {
      "database": {
        "status": "ok",
        "responseTime": "5ms",
        "connection": "active"
      },
      "redis": {
        "status": "ok",
        "responseTime": "2ms",
        "connection": "active"
      }
    }
  },
  "timestamp": "2025-10-01T14:38:00.000Z"
}
```

## Status Codes

The health check endpoints use the following status codes:

- `ok`: The service is healthy and operating normally
- `warning`: The service is experiencing issues but is still operational
- `critical`: The service has critical issues and may not be functioning properly

## Testing Health Checks

You can test the health check endpoints using the provided test script:

```bash
node src/test-health.js
```

This script will make requests to both health check endpoints and display the results.

## Integration with Monitoring Tools

### Prometheus

To integrate with Prometheus, you can use the `/api/v1/health/detailed` endpoint with a metrics exporter that converts the health data to Prometheus format.

### Kubernetes

For Kubernetes, you can configure liveness and readiness probes using the health check endpoints:

```yaml
livenessProbe:
  httpGet:
    path: /api/v1/health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /api/v1/health/detailed
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

### Docker

For Docker health checks, you can use:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/v1/health || exit 1
```

## Customizing Health Checks

You can customize the health checks by modifying the following files:

- `src/app/ucase/health.controller.js`: Contains the health check logic
- `src/app/router/health.js`: Defines the health check routes

To add additional service checks (e.g., for external APIs), modify the `getDetailedHealth` function in the health controller.