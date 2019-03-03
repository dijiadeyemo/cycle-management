# cycle-management

## Developing application
- Edit `ormconfig.json` with your development database credentials
- Navigate to project root directory
- Run `npm install` to install dependencies
- Run `./node_modules/.bin/ts-node src/server.ts` to start the application in developement mode
- The service can be accessed on `http://localhost:3000`

### Running tests
- Edit `ormconfig.json` with your test database credentials
- Navigate to project root directory
- Run `npm install` to install dependencies
- Run `npm test` to run tests

### Decisions taken because of time constraint
- There should be a lot more unit tests to cover more scenarios
- There should API/integration tests for the application REST layer
- There should be better error handling for the application
- A service locator/dependency injection could be used when getting DTO converters
- Database credentials should be environment variables instead of a config file
- Setup and tearDown logic for test suits should be improved
- `EventService` can be further refactored to be cleaner and more maintainable
- Payload validation should be added
