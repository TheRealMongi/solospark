# Contributing to SoloSpark

Thank you for considering contributing to SoloSpark! This document outlines the process for contributing to the project.

## Development Process

### 1. Setting Up the Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/solospark.git`
3. Install dependencies: `npm install`
4. Copy the environment variables: `cp .env.example .env`
5. Set up your local environment variables
6. Run the development server: `npm run dev`
7. Start the worker in a separate terminal: `node scripts/start-worker.js`

### 2. Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Ensure code quality with linting: `npm run lint`
4. Test your changes locally

### 3. Submitting a Pull Request

1. Push your changes to your fork: `git push origin feature/your-feature-name`
2. Create a pull request against the main repository
3. Describe your changes in detail
4. Reference any related issues

## Code Style Guidelines

- Follow the ESLint and Prettier configurations
- Write descriptive commit messages
- Include comments for complex logic
- Write tests for new features

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the .env.example file if you've added new environment variables
3. The PR will be merged once it has been reviewed and approved

## Branch Naming Convention

- `feature/`: New features or enhancements
- `fix/`: Bug fixes
- `docs/`: Documentation changes
- `refactor/`: Code refactoring without changing functionality
- `test/`: Adding or modifying tests

## Commit Message Guidelines

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## Code of Conduct

- Be respectful and inclusive
- Focus on the project's goals
- Provide constructive feedback

## Questions?

If you have any questions about contributing, please reach out to the project maintainers.
