# Deployement Steps

## 0. Create AWS Account

--

## 1. Create EC2 Instance

--

## 2. Connect to AWS Instance

- Locate your private key file (devtinder-secrete.pem). This key is used to launch the instance. Open the terminal at that location.

  - chmod 400 "devtinder-secrete.pem"
  - ssh -i "devtinder-secrete.pem" ubuntu@ec2-16-170-133-198.eu-north-1.compute.amazonaws.com

- Now you will be able to access AWS machine's terminal

## 3. Setup the Remote Machine

1.  Install Node.js

    - https://nodejs.org/en/download/current

      - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

    - Restart the shell/terminal

      - nvm install 22.11.0
      - node -v

    - For Restart follow the following steps

      - exit
      - ssh -i "devtinder-secrete.pem" ubuntu@ec2-16-170-133-198.eu-north-1.compute.amazonaws.com

2.  Clone the Project

    - git clone https://github.com/rkchoudhury/devTinder.git
    - ls
      - devTinder

## 4. Deploye Forntend Web App/Project

1. Build the project on Remote Machine

   - Go to the web folder

     - ls
     - cd devTinder/client-web

   - Install the dependencies

     - npm install

   - Build the project

     - npm run build

     - ls
       - dist (Folder contains all the code that we want to run onto the server)

2. Deploye Web App using `nginx`

   - We are inside the client-web folder

     - cd devTinder/client-web

   - Install the nginx

     - sudo apt update
     - sudo apt install nginx

   - Start & Enable nginx onto our system

     - sudo systemctl start nginx

     - sudo systemctl enable nginx

   - Copy code from dist(build files) to the nginx's http server (/var/www/html/)

     - `sudo scp -r dist/* /var/www/html/`

3. Enable port :80 of our instance on AWS Site

   > Go to AWS instance

   - > Security
     - > Security Groups
       - Inbound rules
         - Edit inbound rules
         - Add rule
         - Set port range to 80 & source to 0.0.0.0/0
         - Save rules

   -> Now hit the public IP Address on the browser

   -> The frontend web app now deployed to the public IP addess of the Instance.

   -> We can access the public IP Address anywhere on the internet

## 5. Deploye Backend Node.js App/Project

--
