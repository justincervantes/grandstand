# kakoandmirai

A content management system which leverages the Tailwind CSS Typography plugin to write and view content. Kako and Mirai is a name given for Past and Future in Japanese, and is inspired by the movie title 'Mirai of the Future'.

![image](https://user-images.githubusercontent.com/34464082/221435988-58b6ef56-ae9c-4167-870b-e6798685131a.png)

# To do

-   [ ] Refactor LifetimeStats and RecentActivity to use the new ArticleUserActions table 
-   [ ] Check session serverSide to prevent a flash of login requirement on the github logo when refreshing a page (try, if not don't keep going)
-   [ ] Style the dashboard
-   [ ] Bottom border is missing from the article editor

-   [X] Add scroll bar to the user activity widget on the dashboard
-   [X] ~~Add a modal which shows an article with styling in full screen, see article actions commented button~~
-   [X] Use server side data fetching for organizations on the organizations page to stop a flash of data when it first loads (see articles)
-   [X] Use the cache on last selected articles to track the last selected article for each organization
-   [X] When you create an article set the cache's selected article to the newly created article
-   [X] Verify all delete, create, update fills correct metadata around authoring stamps
-   [X] Update API calls to use axios in article-editor.tsx and organizations.tsx
-   [X] Show a list of all post activity from a user and list it in table format in the recent activity dashboard div, columns should be title (linked to article), date created, date updated, updated by (name)
-   [X] In the modals, detect enter keypress to trigger the action, esc should close the modal (cancel)
-   [X] Remove all calls to get the email in an API, we'll do this from base service constructors
-   [X] ~~Add a body parsing middleware so you don't have to use .json() on every response from the server~~ Swap fetch for axios
-   [X] Implement a services pattern with the base service constructor grabbing the session token and fetching the userId, and move all current API route logic to services
-   [X] Add the toasts component and use it to advise the user of successful or unsuccessful API requests
-   [X] Add validation check on whether a user has permission to perform a certain action, ie you cannot delete an org unless you are a member, and you can't invite a user to an org you are not a part of yourself, you cannot delete an org you're not a member of, you cannot edit an organization that you are a member of.
-   [x] Change the article content type to @db.Text to get longer content
-   [x] Add a div to the dashboard page which shows a list of organizations the user belongs to and the date of their last updated post
-   [x] > Create a MarkdownPreview component for parsed markdown, this should have an Edit button
-   [x] > Create an Editor component (refactor MarkdownInput) which has a mirror of textarea and preview
-   [x] > Create a parent component for the MarkdownPreview and MarkdownInput components that manages what is being rendered
-   [x] Add local storage caching to both articles and organizations pages - the last selected organization should be automatically open the next time the user visits the page
-   [x] Update articles page to only fetch articles for selected organization
-   [x] Create a help request in the tailwind typography plugin discussions around '- [ ]' and '- [X]' generating a checkbox plus bullet point for li
-   [x] Use Chart.js to populate the dashboard lifetime statistics div by showing number of posts per month
-   [x] Refactor the components to dry out the displays on: 1. no orgs, 2. no org selected, 3. org selected, 4. no articles
-   [x] Refactor the white buttons to a generic button (white button that matches the dropdown, reducing redundant code)
-   [x] Resolve the multiple database connections, we need one instance of the database
-   [x] Stop spawning multiple database connections, leverage the lib db.ts file
-   [x] Add a global toast context
-   [x] ~~Add AirBNB linting rules~~ Explored Next linting and airbnb, both proved to be cumbersome
-   [x] Remove the border on the delete button
-   [x] Add a confirm to deleting the organization on the orgs page
-   [x] Create an endpoint for each organization that will get their articles
-   [x] We have to add a title to the head
-   [x] Update the findUnique call on an organization / user to findUniqueOrThrow (if we are expecting an entity but do not receive it, throw)
-   [x] Hide the create user modal once you create a user
-   [x] Remove the border on the user table inside of the organization table
-   [x] If there are no organizations, display a mesage that tells the user that they need to make one

# Epics:

-   [X] Basic CRUD on organizations, users and dashboard
-   [ ] Style the application and ensure UX flow is smooth
-   [ ] Deployment with CI/CD pipelines, attach dns
-   [ ] Stripe payment integrations
-   [ ] S3 AWS buckets, enable linking


# Tools

-   TypeScript
-   TailwindCSS
-   Next JS
-   NextAuth
-   Marked
-   DOMPurify

# Local Setup and Initial Migration

1. Download MySQL using [choco](https://community.chocolatey.org/packages/)
2. Open a terminal and login to the MySQL root - `mysql -u root -p`
3. Create a user, you can use the credential in the .env.local or create your own and update the .env.local DATABSE_URL to use your credentials - `CREATE USER 'justin'@'localhost' IDENTIFIED BY 'Canada1234!';`
4. Setup permissions to the user, this example uses the default of justin, but the name should be replaced if you used something else in step 3 - `GRANT ALL PRIVILEGES ON *.* TO 'justin'@'localhost';`
5. Create the database - `CREATE DATABASE cms;`
6. Exit MySQL - `exit;`
7. Setup the database's tables using the configurations from Prisma - `npm run prismaDev`
8. Prior to working on the project set the node version specified in the .nvmrc file, using nvm use `nvm use 18.8.0`. You may have to install it with `nvm install 18.8.0` on a shell with elevated permissions, ie running Power Shell with admin priviledges.

# Next JS API Routes

To avoid multiple repos, we are leveraging Next JS' API Routes, which enables this repository to act as both the frontend and backend. Our endpoints are stored in `pages/api`. Read more about API Routes in the official [documentation](https://nextjs.org/docs/api-routes/introduction).

# Protecting Pages

As we use next-auth, we need a way to protect pages. In order to avoid flashing unauthorized users authorized pages, we use getServerSideProps and check the cookie in order to validate pages. This may seem a bit redundant as we add the same ~10-line code block to each protect page, however attempting this with a custom hook proved not to work as any client side authentication checking yields a flash of data to the client given [how](https://prismic.io/blog/making-fetch-happen-different-methods-for-data-fetching#getserversideprops) Next works.

# Major Packages

-   prisma: An open source ORM which helps to make database management and migrations easier. Migrations can be run using the script `npm run prismaDev`
-   dotenv-cli: A tool used to run a prisma migration. By default, prisma looks for .env, however Next JS uses .env.local, and does not recommend storing secrets in the .env file. In order to overcome this, we use dotenv-cli to specify which file to read as the .env file. This is ultimately used in the package.json script prismaDev.
