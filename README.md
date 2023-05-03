# spotlight

A tool web application that builds and hosts developer portfolio pages. 

## Setup and Contributing

### Setup

Preferably set up your own MySQL server locally, I've set up an AWS RDS instance for beginners to get started faster. To get started, clone the repo, run `npm install`, `npx prisma generate` then `npm run dev`. You should now see the application running at localhost:3000. Create a file called .env.local in the root of the project, and email Justin (below) for the configuration keys.

### Contributing

Contributions are welcome, in order to contribute you'll need developer configurations which can be obtained by emailing Justin (contact details below). The prod branch is main, and the development branch is dev. Do not touch main. When working on features, cut a branch off of dev called feat/name_of_feature_you_are_working_on. When you are done, make a pull request and tag Justin Cervantes or Evan Morrow to review your work. Do not push commits directly to dev.  Once a feature is complete put an x in the todo item [X] to mark it off. Also, if starting a work item, put your name beside it in the readme.

## To do
- [X] Re-introduce the hamburger menu
- [] Delete the UserActions model and get everything regression functional
- [] Update userDetails model to only require 2 links: LinkedIn and GitHub 
- [] Update the About Me page to match the links from above
- [] Update the Projects page to have a create new project functionality, perhaps expandable
- [] Update the frontend validation rules for About Me and Projects (install yup, see npmjs.com)
- [] Create a projects model which has a 1-m relationship to users
- [] Reset the cloud password for AWS RDS root (Justin) and provide contributors with a getting started MySQL local guide (see kakoandmirai readme)
- [] Add a slug to About Me (spotlight.dev/<slug> (investigate Next JS Dynamic Routing)
- [] Update color scheme (Light and Dark - https://iansutherland.ca/) and remove the logo
- [] Create a new logo
- [] Create a component for project inputs which should enable you to set a project title, set a project description, set a project image link, set a project hosted link, set a project github link, set a project code snippet and description, set text cards that answer (what are you most proud of, what is most interesting about this, what is unique about this, why did you do this).
- [] Projects should show a project input form, with a button do add a new project input form for adding multiple projects
- [] Blogs (to be done by Evan or Justin)


Contact Information
Justin Cervantes
cervantes.jfa@gmail.com
