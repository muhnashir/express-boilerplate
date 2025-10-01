# .gitignore Explanation

This document explains the rationale behind the patterns included in the `.gitignore` file.

## Dependency Directories
- `node_modules/`: Contains all npm packages - very large and can be reinstalled with `npm install`
- `package-lock.json`: Auto-generated file that can cause merge conflicts; can be regenerated

## Environment Variables
- `.env*`: Contains sensitive information like API keys, database credentials, etc.
- These files often contain environment-specific configurations that shouldn't be shared

## Logs
- `logs/` and `*.log`: Log files that are generated during runtime
- These can get very large and contain sensitive information

## Database
- `*.sqlite`, `*.sqlite3`, `*.db`: Local database files
- Database content should be managed through migrations, not version control

## Build Output
- `dist/`, `build/`, `coverage/`: Generated files that can be recreated
- These directories contain compiled code that should be built on deployment

## IDE and Editor Files
- `.idea/`, `.vscode/`, etc.: Editor-specific settings
- These are personal preferences and can vary between developers

## OS Generated Files
- `.DS_Store`, `Thumbs.db`, etc.: Files automatically created by operating systems
- These have no relevance to the project and can cause conflicts

## Temporary Files
- `tmp/`, `temp/`, `.tmp/`: Temporary files created during development
- These are not needed for the application to run

## Docker Volumes
- `mysql-data/`, `redis-data/`: Docker volume data
- Database data should be managed through migrations, not version control

## Testing
- `coverage/`, `.nyc_output/`: Test coverage reports
- These are generated files that can be recreated

## Misc
- Various configuration files for tools that are developer-specific
- These files are not needed for the application to run