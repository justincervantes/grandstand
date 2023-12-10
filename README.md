# grandstand

A tool web application that builds and hosts developer portfolio pages.

## Local Setup (Windows)

- Download MySQL using choco
- Open a terminal and login to the MySQL root - mysql -u root -p
- Create a user, you can use the credential in the .env.local or create your own and update the .env.local DATABSE_URL to use your credentials - CREATE USER '<your_name>'@'localhost' IDENTIFIED BY 'password';
- Setup permissions to the user, this example uses the default of justin, but the name should be replaced if you used something else in step 3 - GRANT ALL PRIVILEGES ON *.* TO '<your_name>'@'localhost';
- Create the database - CREATE DATABASE grandstand;
- Exit MySQL - exit;
- Setup the database's tables using the configurations from Prisma - npm run prismaDev
- Prior to working on the project set the node version specified in the .nvmrc file, using nvm use nvm use 18.8.0. You may have to install it with nvm install 18.8.0 on a shell with elevated permissions, ie running Power Shell with admin priviledges.


## Local .env 
## Parking lot

-   [ ] Change the stack text input to a chip input (array of strings in the backend)
-   [ ] Drag and drop or up/down arrows to prioritize project display order
