# Express.js Boilerplate

A comprehensive Express.js boilerplate application with a well-structured architecture, ready for building robust and scalable web applications.

## Features

- **Modern JavaScript** - ES6+ syntax
- **Well-organized Directory Structure** - Modular and scalable architecture
- **Database Integration** - Sequelize ORM with MySQL
- **API Documentation** - Swagger/OpenAPI
- **Authentication** - JWT-based authentication
- **Validation** - Request validation with Joi
- **Error Handling** - Centralized error handling
- **Logging** - Request logging and error logging
- **Health Checks** - Comprehensive health monitoring system
- **Testing** - Unit and integration testing setup
- **Docker Support** - Containerization with Docker and Docker Compose
- **CI/CD** - GitHub Actions workflow

## Directory Structure

```
├── config/                  # Configuration files
│   └── msg.yaml             # Message templates
├── database/                # Database related files
│   └── migrations/          # Database migrations
├── deployment/              # Deployment related files
│   └── dockerfiles/         # Docker configuration
├── docs/                    # Documentation
│   ├── clid.md              # CLI documentation
│   └── helper.md            # Helper functions documentation
├── github/                  # GitHub related files
│   └── workflows/           # GitHub Actions workflows
├── src/                     # Source code
│   ├── app/                 # Application code
│   │   ├── appctx/          # Application context
│   │   ├── entity/          # Database models
│   │   ├── factory/         # Business logic
│   │   ├── helper/          # Helper functions
│   │   ├── middleware/      # Express middleware
│   │   ├── presentation/    # Request/response entities
│   │   ├── repositories/    # Data access layer
│   │   ├── router/          # Route definitions
│   │   └── ucase/           # Use cases (controllers)
│   ├── bootstrap/           # Application bootstrap
│   ├── cmd/                 # Command line tools
│   ├── config/              # Configuration loader
│   ├── consts/              # Constants
│   ├── handler/             # Request handlers
│   ├── interceptor/         # Request/response interceptors
│   ├── pkg/                 # Third-party packages
│   ├── swagger/             # API documentation
│   ├── transport/           # Transport layer
│   └── main.js              # Application entry point
├── .env.example             # Environment variables example
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL (or Docker for containerized database)

## Installation

### Using npm

```bash
# Clone the repository
git clone https://github.com/yourusername/express-boilerplate.git
cd express-boilerplate

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the application
npm run dev
```

### Using Docker

```bash
# Clone the repository
git clone https://github.com/yourusername/express-boilerplate.git
cd express-boilerplate

# Copy environment variables
cp .env.example .env

# Start with Docker Compose
docker-compose -f deployment/dockerfiles/docker-compose.yml up
```

## Usage

### Development

```bash
# Start the development server with hot reloading
npm run dev
```

### Production

```bash
# Start the production server
npm start
```

### Database

```bash
# Run database migrations
npm run db:migrate

# Seed the database
npm run db:seed

# Reset the database (drop all tables and run migrations)
npm run db:reset
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Linting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It is generated using Swagger/OpenAPI.

## Documentation

- [Getting Started Guide](GETTING_STARTED.md) - Comprehensive guide to set up and run the application
- [Health Check Documentation](docs/health-check.md) - Information about health monitoring endpoints
- [CLI Documentation](docs/clid.md) - Command-line interface documentation
- [Helper Functions](docs/helper.md) - Utility functions documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Joi](https://joi.dev/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [GitHub Actions](https://github.com/features/actions)