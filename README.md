# grandstand

A tool web application that builds and hosts developer portfolio pages.

<img width="560" height="497" alt="image" src="https://github.com/user-attachments/assets/866b5bd6-2e27-49c2-b006-cba76b1b066e" />


## Local Setup (Windows)

- Download PostgresSQL using [choco](https://community.chocolatey.org/packages/postgresql). __Save the password from choco as you'll need this to access your local postgres, otherwise follow the troubleshooting guide if you missed this (see choco link). You can also set your own password using choco.__
- Update your .env file based on your credentials, for example, update your password (POSTGRES_PRISMA_URL=postgresql://postgres:<password>@localhost:5432)
- Setup the database's tables using the configurations from Prisma - npm run prismaDev
- Prior to working on the project set the node version specified in the .nvmrc file, using nvm use nvm use 18.8.0. You may have to install it with nvm install 18.8.0 on a shell with elevated permissions, ie running Power Shell with admin priviledges.

## Parking lot

-   [ ] Change the stack text input to a chip input (array of strings in the backend)
-   [ ] Drag and drop or up/down arrows to prioritize project display order
