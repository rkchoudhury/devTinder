## nodemon Configuration

Install nodemon in global level

    npm install -g nodemon

### Run the app using the nodemon command

    nodemon src/app.js

### Run the app using the script command

1.  We can add the nodemon starting command in the package.json file

    package.json (under "script")

        "dev": "nodemon src/app.js"

2.  Run the app using the script command

        npm run dev

### Notes:

- In windows, if any error comes related to nodemon.ps1 cannot be loaded because running scripts is disabled

  - `Solution`: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

    [https://stackoverflow.com/questions/63423584/how-to-fix-error-nodemon-ps1-cannot-be-loaded-because-running-scripts-is-disabl]
