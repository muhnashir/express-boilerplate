# Command Line Interface Documentation

This document provides information about the command-line tools available in the application.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Available Commands](#available-commands)
  - [Server Commands](#server-commands)
  - [Database Commands](#database-commands)
  - [User Management Commands](#user-management-commands)
  - [Development Commands](#development-commands)
- [Configuration](#configuration)
- [Examples](#examples)

## Introduction

The application provides a set of command-line tools to help with various tasks such as starting the server, managing the database, creating users, and more. These tools are designed to simplify common tasks and automate repetitive processes.

## Installation

The command-line tools are included with the application. To use them, you need to have Node.js and npm installed on your system.

```bash
# Install dependencies
npm install

# Make the CLI executable
chmod +x ./bin/cli.js

# Create a symlink to use the CLI globally (optional)
npm link
```

## Available Commands

### Server Commands

#### `start`

Starts the application server.

```bash
npm start
# or
node src/main.js
```

#### `dev`

Starts the application server in development mode with automatic reloading.

```bash
npm run dev
# or
nodemon src/main.js
```

### Database Commands

#### `db:migrate`

Runs database migrations to update the database schema.

```bash
npm run db:migrate
# or
node bin/cli.js db:migrate
```

#### `db:seed`

Seeds the database with initial data.

```bash
npm run db:seed
# or
node bin/cli.js db:seed
```

#### `db:reset`

Resets the database by dropping all tables and running migrations and seeds.

```bash
npm run db:reset
# or
node bin/cli.js db:reset
```

### User Management Commands

#### `user:create`

Creates a new user.

```bash
node bin/cli.js user:create --username=admin --email=admin@example.com --password=password --role=admin
```

#### `user:list`

Lists all users.

```bash
node bin/cli.js user:list
```

#### `user:reset-password`

Resets a user's password.

```bash
node bin/cli.js user:reset-password --email=user@example.com --password=newpassword
```

### Development Commands

#### `generate:model`

Generates a new model.

```bash
node bin/cli.js generate:model --name=User --attributes="name:string,email:string,password:string"
```

#### `generate:controller`

Generates a new controller.

```bash
node bin/cli.js generate:controller --name=User --actions="index,show,create,update,delete"
```

#### `generate:migration`

Generates a new migration.

```bash
node bin/cli.js generate:migration --name=create-users-table
```

## Configuration

The command-line tools use the same configuration as the application. You can configure them using environment variables or by editing the `.env` file.

```bash
# Example .env configuration
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=express_boilerplate
DB_USER=postgres
DB_PASSWORD=postgres
```

## Examples

### Starting the Server

```bash
# Start the server in production mode
NODE_ENV=production npm start

# Start the server in development mode with automatic reloading
npm run dev
```

### Managing the Database

```bash
# Run migrations
npm run db:migrate

# Seed the database
npm run db:seed

# Reset the database (drop all tables and run migrations and seeds)
npm run db:reset
```

### Managing Users

```bash
# Create a new admin user
node bin/cli.js user:create --username=admin --email=admin@example.com --password=password --role=admin

# List all users
node bin/cli.js user:list

# Reset a user's password
node bin/cli.js user:reset-password --email=user@example.com --password=newpassword
```

### Generating Code

```bash
# Generate a new model
node bin/cli.js generate:model --name=Product --attributes="name:string,description:text,price:decimal,category:string"

# Generate a new controller
node bin/cli.js generate:controller --name=Product --actions="index,show,create,update,delete"

# Generate a new migration
node bin/cli.js generate:migration --name=create-products-table
```