## Project Setup Instructions

### Migration Before Application Launch

Before launching the application, it is recommended to run the migration:

```bash
npm run migrate
```

## Automatic Admin Creation During Migration

When initiating the migration process, an admin user is automatically created with the following email address: admin@admin.admin.

## Starting the Application

### To start the application, run:

```bash
npm run start
```

## Accessing the User Review Endpoint
### After starting the application, navigate to:

# http://localhost:3001/api#/Loger/UserController_addReview

## Convenient Local Login Method

The program includes a `localLogin` method designed for convenient testing and user switching. This feature is particularly useful when you don't have multiple Google accounts, simplifying the process of switching between user and admin roles during testing.

