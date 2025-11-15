# Deployement

V22.11.0

## Setup the Remote Machine

1.  Install Node.js

    - https://nodejs.org/en/download/current

      - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

    - Restart the shell/terminal

      - nvm install 22.11.0
      - node -v

2.  Clone the Project

    - git clone https://github.com/rkchoudhury/devTinder.git
    - ls
      - devTinder

## Deploye Forntend Web App/Project

1. Build the project on Remote Machine

- Go to the web folder

  - cd devtinder
  - cd client-web

- Install the dependencies

  - npm install

- Build the project

  - npm run build

  - ls
    - dist (Folder contains all the code that we wat to run onto the server)
