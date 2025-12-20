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

0. Login to ASW Console & connect to the Instance

1. Install Dependencies

   - Go to the server folder

     - ls
     - cd devTinder/server

   - Install the dependencies

     - npm install

2. Start the server

   - npm start

   - Error:

     - Database could not be connected.

   - Reason:

     - As we are trying to access database from the remote machine.
     - We have to allow/whitelist the remote machine from the MongoDB site.

   - Solution:

     - MongoDB Atlas -> Security -> Database & Network Access -> IP Access List
     - Add IP Address -> Add public IP Address of AWS EC2 Instance -> Confirm
     - Wait for the Active State

   - Re-run the server from the terminal
     - npm start
       - Database connected successfully.
       - Server is running at 7000

3. Now let's hit the AWS Public IP Address of the instance with the server port

   - 51.21.171.84:7000

     - Still it 404 error is coming as we haven't enable port 7000 from the ASW site

   - Enable port :7000 of our instance on AWS Site

   - Then hit the url again

     - 51.21.171.84:7000
       - Hello from Server!
     - 51.21.171.84:7000/feed
       - Hello from Server!

4. Issue: `npm start` is not reliable. We have to some how run this command in the background forever on the server

5. To run the server `24*7` on server we will use `pm2` process manager

   - Install pm2 process manager globally

     - `npm install pm2 -g`

   - Now start the server using pm2.
     - `pm2 start npm --name "devtinder-backend" -- start`

Now backend is deployed on the server which is running `24*7` by pm2 process manager

    - 51.21.171.84:7000
        - Hello from Server!
    - 51.21.171.84:7000/feed
        - Hello from Server!

## 6. Connect Backend with Frontend

Now the fontend and backend are deployed.

    Frontend -> http://51.21.171.84
    Backend -> http://51.21.171.84:7000

Once we purchases the domain and map it with 51.21.171.84. Our url will look like this

    Frontend -> http://devtinder.com
    Backend -> http://devtinder.com:7000

But the best practice, we should make our url like this,

    Frontend -> http://devtinder.com
    Backend -> http://devtinder.com/api/

### `nginx` configuration to map `/api` to `:7000`

1. Edit the nginx configuration file:

   - sudo nano /etc/nginx/sites-available/default

2. Edit the file carefully

```
server {
  server_name 51.21.171.84; # Put the public IP Address of ASW Instance / domain name (devtinder.com)

  location /api/ {
    proxy_pass http://localhost:7000/; # Change the port number to the Node.js starting port number
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

3. Restart nginx

   - sudo systemctl restart nginx

4. Check the url in the browser

   - http://51.21.171.84/api
     - Hello from Server!
   - http://51.21.171.84/api/feed
     - Hello from Server!

### Modify the BASE_URL of the Frontend Project (DevTinder Web App)

- from `"http://localhost:7000"` to `/api`

### Prerequisite

- Before deployement, run the build locally to verify if the build is happening or not.

  - cd client-web
  - npm run build


### Now re-deploy the Frontend Web Project

- Go to the devTinder project

  - cd devTinder

- Pull the latest change

  - git fetch
  - git pull

- Go to the web project & build the project

  - cd client-web
  - npm run build

- Copy code from dist(build files) to the nginx's http server (/var/www/html/)

  - `sudo scp -r dist/* /var/www/html/`

- Now nginx will start serving the new file to us

- Hit the url on the browser & we will see, the devTinder UI with all the features integrated to it.
  - http://51.21.171.84/

### Now re-deploy the Backend Node.js App

- Go to the devTinder project

  - cd devTinder

- Pull the latest change

  - git fetch
  - git pull

- Go to the node.js project & do npm install

  - cd server
  - npm install

- Update the .env file if there is any changes. Copy paste the content into .env file

  - sudo nano .env

- List down the pm processes that are currently running
  
  - pm2 list

- Restart the process using process name/id

  - pm2 restart 0

- Flush all the existing logs

  - pm2 flush

- Check the logs if there any logs

  - pm2 logs