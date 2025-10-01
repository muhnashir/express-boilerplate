# Getting Started with Express.js Boilerplate

This guide will help you set up, configure, and run the Express.js Boilerplate application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (usually comes with Node.js)
- **MySQL** (v5.7 or higher)
- **Git** (for cloning the repository)

Optional:
- **Docker** and **Docker Compose** (for containerized deployment)
- **Redis** (for job queue and caching, optional)

## Installation

### Option 1: Standard Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/express-boilerplate.git
   cd express-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your configuration (see [Configuration](#configuration) section).

### Option 2: Docker Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/express-boilerplate.git
   cd express-boilerplate
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file if needed (Docker Compose will use its own environment variables for services).

## Configuration

The application uses environment variables for configuration. Copy the `.env.example` file to `.env` and modify the values as needed:

### Essential Configuration

```bash
# Application
NODE_ENV=development  # 'development', 'production', or 'test'
PORT=3000             # Port the application will run on
API_PREFIX=/api/v1    # API endpoint prefix

# Database
DB_HOST=localhost     # Database host
DB_PORT=5432          # Database port
DB_NAME=express_boilerplate  # Database name
DB_USER=postgres      # Database user
DB_PASSWORD=postgres  # Database password
```

### Optional Configuration

```bash
# Authentication
JWT_SECRET=your-secret-key  # Secret for JWT tokens
JWT_EXPIRES_IN=1d           # JWT expiration time

# Redis (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Email (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=your-password
SMTP_FROM=noreply@example.com
```

## Running the Application

### Development Mode

Run the application with hot-reloading for development:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 3000).
Access the application at: http://localhost:3000

### Production Mode

For production deployment:

```bash
npm start
```

### Using Docker

Start all services using Docker Compose:

```bash
docker-compose -f deployment/dockerfiles/docker-compose.yml up
```

This will start:
- The Express.js application
- MySQL database
- Redis cache
- Adminer (database management tool, available at http://localhost:8080)

To run in detached mode:

```bash
docker-compose -f deployment/dockerfiles/docker-compose.yml up -d
```

To stop all services:

```bash
docker-compose -f deployment/dockerfiles/docker-compose.yml down
```

## Database Setup

### Running Migrations

The application uses Sequelize for database ORM. To set up your database:

1. Ensure your database connection is configured in the `.env` file.

2. Run database migrations:
   ```bash
   npm run db:migrate
   ```

3. (Optional) Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

### Reset Database

To reset the database (drop all tables and run migrations again):

```bash
npm run db:reset
```

## Testing

Run tests using Jest:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## API Documentation

The API documentation is available via Swagger UI when the application is running:

- Access Swagger UI: http://localhost:3000/api-docs

### Health Check Endpoints

The application provides health check endpoints:

- Basic health check: http://localhost:3000/api/v1/health
- Detailed health check: http://localhost:3000/api/v1/health/detailed

## Deployment

### Standard Deployment

1. Set up a production server with Node.js and MySQL.
2. Clone the repository and install dependencies.
3. Configure environment variables for production.
4. Run database migrations.
5. Start the application with `npm start`.
6. Consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start src/main.js --name express-boilerplate
   ```

### Docker Deployment

1. Build and push the Docker image:
   ```bash
   docker build -t express-boilerplate -f deployment/dockerfiles/Dockerfile .
   ```

2. Deploy using Docker Compose or Kubernetes.

### CI/CD

The repository includes GitHub Actions workflows in the `.github/workflows` directory for continuous integration and deployment.

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure MySQL is running
   - Verify database credentials in `.env`
   - Check network connectivity to the database server

2. **Port Already in Use**
   - Change the PORT in `.env`
   - Check for other applications using the same port

3. **Missing Dependencies**
   - Run `npm install` to ensure all dependencies are installed

4. **Environment Variables Not Loading**
   - Ensure `.env` file exists in the project root
   - Verify the format of the `.env` file

### Logs

Check application logs for more detailed error information:

- Development mode: Logs are printed to the console
- Production mode: Check your server's log files or configured log destinations

### Getting Help

If you encounter issues not covered here:

1. Check the project documentation in the `docs` directory
2. Open an issue on the GitHub repository
3. Contact the project maintainers

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Docker Documentation](https://docs.docker.com/)