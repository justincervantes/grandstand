# spotlight

A tool web application that builds and hosts developer portfolio pages. 

## Setup and Contributing

### Setup

Preferably set up your own MySQL server locally, I've set up an AWS RDS instance for beginners to get started faster. To get started, clone the repo, run `npm install`, `npx prisma generate` then `npm run dev`. You should now see the application running at localhost:3000. Create a file called .env.local in the root of the project, and email Justin (below) for the configuration keys.

### Contributing

Contributions are welcome, in order to contribute you'll need developer configurations which can be obtained by emailing Justin (contact details below). The prod branch is main, and the development branch is dev. Do not touch main. When working on features, cut a branch off of dev called feat/name_of_feature_you_are_working_on. When you are done, make a pull request and tag Justin Cervantes or Evan Morrow to review your work. Do not push commits directly to dev.  Once a feature is complete put an x in the todo item [X] to mark it off. Also, if starting a work item, put your name beside it in the readme.

## To do


- Reset the cloud password for AWS RDS root (Justin) and provide contributors with a getting started MySQL local guide (see kakoandmirai readme)
Blog
- Style a table of content in the customer side (reference Monica Lent and Medium)
- Each blog article must be its own page  
- Work on rendering blog content in the customer side so that we use Tailwind Typography plugin
- slugs to be lowercase-trim (not set, we do this on the backend on update), need a slug column
- We need a published state (new column)
- We need to enforce title, slug, picture link, etc and validate in order to publish
- Add a counter on views to track how many views each article has (new column)
- In the getServerSide props of the article page, we need to increment views whenever the page loads
- Fix colors in admin side

Projects
- Style into a table format (again look at Monica Lent and Medium) and highlight name, description, tech stack, what you're proud of, thumbnail?
- Style the code snippets using Typography in customer side
- Add a slug for each project (title should be unique on each project to a user) (new col)
- Each project should be its own page
- Dropdown to select on mobile UI in admin side
- Review on UX of sidebar in admin side
- New column for views (increment in getServerSideProps)

NavBar
- Better UI for navigating home or to other pages for customer page

Main page
- We have to stop showing icons if something does not exist (no LI url)
- Enable optional links that still get validates (check formik docs)


    
## Parking lot
- [ ] Change the stack text input to a chip input (array of strings in the backend)
- [ ] Drag and drop or up/down arrows to prioritize project display order
- [ ] Carousel for displaying projects for higher resolution viewers - https://www.material-tailwind.com/docs/react/carousel

Contact Information
Justin Cervantes
cervantes.jfa@gmail.com
