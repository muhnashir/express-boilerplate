# Helper Functions Documentation

This document provides information about the helper functions available in the application.

## Table of Contents

- [Introduction](#introduction)
- [String Helpers](#string-helpers)
- [Date Helpers](#date-helpers)
- [Object Helpers](#object-helpers)
- [Validation Helpers](#validation-helpers)
- [File Helpers](#file-helpers)
- [Security Helpers](#security-helpers)

## Introduction

Helper functions are utility functions that provide common functionality used throughout the application. They are designed to be reusable and to simplify common tasks.

## String Helpers

### `formatString(str, ...args)`

Formats a string by replacing placeholders with provided arguments.

**Parameters:**
- `str` (String): The string containing placeholders (e.g., `{0}`, `{1}`, etc.)
- `args` (Any): Values to replace placeholders

**Returns:**
- (String): Formatted string

**Example:**
```javascript
const formatted = formatString('Hello, {0}! Welcome to {1}.', 'John', 'our platform');
// Result: "Hello, John! Welcome to our platform."
```

### `slugify(str)`

Converts a string to a URL-friendly slug.

**Parameters:**
- `str` (String): The string to convert

**Returns:**
- (String): URL-friendly slug

**Example:**
```javascript
const slug = slugify('Hello World! This is a test');
// Result: "hello-world-this-is-a-test"
```

## Date Helpers

### `formatDate(date, format = 'YYYY-MM-DD')`

Formats a date according to the specified format.

**Parameters:**
- `date` (Date|String): The date to format
- `format` (String, optional): The format string (default: 'YYYY-MM-DD')

**Returns:**
- (String): Formatted date string

**Example:**
```javascript
const formatted = formatDate(new Date(), 'DD/MM/YYYY');
// Result: "01/10/2025" (if today is October 1, 2025)
```

### `addDays(date, days)`

Adds the specified number of days to a date.

**Parameters:**
- `date` (Date): The base date
- `days` (Number): Number of days to add

**Returns:**
- (Date): New date

**Example:**
```javascript
const newDate = addDays(new Date('2025-10-01'), 5);
// Result: Date object representing October 6, 2025
```

## Object Helpers

### `pick(obj, keys)`

Creates a new object with only the specified keys from the original object.

**Parameters:**
- `obj` (Object): The source object
- `keys` (Array): Array of keys to pick

**Returns:**
- (Object): New object with only the specified keys

**Example:**
```javascript
const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const publicUser = pick(user, ['id', 'name', 'email']);
// Result: { id: 1, name: 'John', email: 'john@example.com' }
```

### `omit(obj, keys)`

Creates a new object without the specified keys from the original object.

**Parameters:**
- `obj` (Object): The source object
- `keys` (Array): Array of keys to omit

**Returns:**
- (Object): New object without the specified keys

**Example:**
```javascript
const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const safeUser = omit(user, ['password']);
// Result: { id: 1, name: 'John', email: 'john@example.com' }
```

## Validation Helpers

### `isEmail(str)`

Checks if a string is a valid email address.

**Parameters:**
- `str` (String): The string to check

**Returns:**
- (Boolean): True if the string is a valid email address, false otherwise

**Example:**
```javascript
const isValid = isEmail('user@example.com');
// Result: true
```

### `isStrongPassword(str)`

Checks if a string is a strong password.

**Parameters:**
- `str` (String): The string to check

**Returns:**
- (Boolean): True if the string is a strong password, false otherwise

**Example:**
```javascript
const isStrong = isStrongPassword('P@ssw0rd123');
// Result: true
```

## File Helpers

### `getFileExtension(filename)`

Gets the extension of a file.

**Parameters:**
- `filename` (String): The filename

**Returns:**
- (String): File extension

**Example:**
```javascript
const ext = getFileExtension('document.pdf');
// Result: "pdf"
```

### `formatFileSize(bytes)`

Formats a file size in bytes to a human-readable string.

**Parameters:**
- `bytes` (Number): File size in bytes

**Returns:**
- (String): Formatted file size

**Example:**
```javascript
const size = formatFileSize(1048576);
// Result: "1 MB"
```

## Security Helpers

### `hashPassword(password)`

Hashes a password using bcrypt.

**Parameters:**
- `password` (String): The password to hash

**Returns:**
- (Promise<String>): Hashed password

**Example:**
```javascript
const hashedPassword = await hashPassword('mySecurePassword');
// Result: "$2b$10$..."
```

### `comparePassword(password, hash)`

Compares a password with a hash.

**Parameters:**
- `password` (String): The password to check
- `hash` (String): The hash to compare against

**Returns:**
- (Promise<Boolean>): True if the password matches the hash, false otherwise

**Example:**
```javascript
const isMatch = await comparePassword('mySecurePassword', hashedPasswordFromDatabase);
// Result: true or false
```