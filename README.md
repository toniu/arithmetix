# Module Choice System

## Dependencies

- [NodeJS](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [PM2](https://pm2.io/) 

## Installation

After installing the dependencies, install the modules for both components:

```bash
cd api
npm install
cd ../vue-app
npm install
cd ..

```

### Configuration

```bash
cp .env.example .env
nano .env
```
Where the email credentials are that of a college account. If you do not wish to store the password in the config file, delete the row ```EMAIL_PASSWORD = ""``` in .env.
In the terminal:
```bash
export EMAIL_PASSWORD="YOUR PASSWORD HERE" # run this every time you restart your computer
```

### Database (dev only)

1. Start the PostgreSQL daemon if it's not already running.
   - MacOS: `brew services start postgresql`
   - GNU/Linux: `sudo systemctl start postgresql`
   - WSL: `sudo service postgresql start`
2. Run the database creation script: `./init-db.sh`
   - If you are getting errors along the lines of "Fatal: role does not exist", you need to create a new superuser role for yourself.
     - `sudo -u postgres createuser -s $USER`
   - If you are getting errors errors along the lines of "Error: permission denied" or "insufficient privileges", you must grant yourself superuser privileges.
     - `sudo -u postgres psql -c "ALTER USER $USER WITH SUPERUSER"`

### Factory reset databases

This will delete all the modules and data added to the database, then create a new one.

```sh
    ./init-db.sh reset
```
## Tips
### Editor
If using vscode, the eslint and tailwind extensions proved very helpful for development.

### Hot Reload
Hot reload can be configured for the backend, which is useful to see changes in realtime when developing.

```bash
npm i -g nodemon
cd api 
nodemon start # (instead of npm start)
```
### Testing
Edit local storage values in the browser console to test for different user types

## Usage

1. Run the API with: `cd api && npm run start`
2. Run the Vue frontend with: `cd vue-app && npm run start`

## Deployment (assumed, ubuntu. Similar steps for other environments)
* Steps 0: The server should be configured to expose the ports in the configuration file and those used by nginx (80,443). Make sure to fill in the server domain/ip in the .env file etc. see Configuration. Make sure nodejs is installed and you have ran `npm i` in the vue-app and api directories. Make sure postgres is installed, and you have ran the initialisation script `./init-db`.

* Step 1:
build the vue app
`cd vue-app && npm run build`

* Step 2:
Install ningx
```bash
sudo apt-get update
sudo apt-get -y install nginx
sudo systemctl enable nginx # tell nginx to auto start
sudo systemctl start nginx # start nginx
```
Visit the servers IP address in the web browser. You should see the default nginx splash page.

* Step 3: replace the default nginx page with the build files
```bash
nano /var/www/html/index.html # change something in the default page then visit the server IP, it should have changed
cd .. # if not already in project root
rm -rf /var/www/html # delete folder
mkdir /var/www/html # make new empty folder in same location
cp ./vue-app/build /var/www/html # copy build files
```
Visit the servers IP address in the web browser. You should see the login page.

* Step 4: 
Install PM2 and set to auto-start. If you wish to configure pm2, edit the ecosystem.config.js file.
```bash
npm install -g pm2
sudo pm2 save 
sudo pm2 startup
```
* Step 5 Start PM2:
`pm2 start`
* Step 6  Set up https (certificate + serve html on port 443 etc)  TODO !important 


## Authors

- Andrew Barraclough
- Harry Hughes
- Syd Lambert
- George Mealing
- Krystian Musial
- Aidan Storey
- Henry Russell
- Simon Yeung
- Neka Toni-Uebari
- Muhammad Mirza
- Tom Allison
- Kxiru
- vellita
- KPetkova
- mamba111

## Maintainers

- Matthew Hague
