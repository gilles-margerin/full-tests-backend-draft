# ddd-and-cqs-level-2-implementation

### Description
* CLI wrapper for [ddd-and-cqs-level-2-implementation](https://github.com/gilles-margerin/full-tests-backend-draft/tree/main/lvl1)
* Tech used: mongoDB, commander.js

### Installation
```
npm i -g

To create a user with a default fleet number:
fleet <userId>

To register a new vehicle into an existing fleet:
fleet <fleetId> <plate>

To set a registered vehicle parking coordinates:
fleet <fleetId> <plate> <lat> <long> [alt]

Database connction's options and configuration has to be set by project's user.
```

### Issues
* Lacks bdd tests, due to lack of time learning bdd concepts from the beginning and cucumber