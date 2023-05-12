# spotlight

A tool web application that builds and hosts developer portfolio pages. 

## Setup and Contributing

### Setup

Preferably set up your own MySQL server locally, I've set up an AWS RDS instance for beginners to get started faster. To get started, clone the repo, run `npm install`, `npx prisma generate` then `npm run dev`. You should now see the application running at localhost:3000. Create a file called .env.local in the root of the project, and email Justin (below) for the configuration keys.

### Contributing

Contributions are welcome, in order to contribute you'll need developer configurations which can be obtained by emailing Justin (contact details below). The prod branch is main, and the development branch is dev. Do not touch main. When working on features, cut a branch off of dev called feat/name_of_feature_you_are_working_on. When you are done, make a pull request and tag Justin Cervantes or Evan Morrow to review your work. Do not push commits directly to dev.  Once a feature is complete put an x in the todo item [X] to mark it off. Also, if starting a work item, put your name beside it in the readme.

## To do
- [ ] Create a home page with vector images which can be toggled based on theme instead of using a picture of a logo
- [ ] Reset the cloud password for AWS RDS root (Justin) and provide contributors with a getting started MySQL local guide (see kakoandmirai readme)
- [ ] Design a sample user's website
- [ ] Change the color theme of articles pages and components to black / gray
- [ ] Wrap the whole application in a theme context to switch between two pallettes and add a button to toggle between themes (light/dark)
- [ ] Add a preview field for the code snippet in projects (requires installation of tailwind typography plugin)
- [ ] Have a validation in the backend and or frontend which stops a user from saving 'home', 'about-me', 'projects', or 'blog' as their slug  
  
- [X] Add a slug to About Me (spotlight.dev/<slug> (investigate Next JS Dynamic Routing) - In Progress  
- [X] Projects should show a project input form, with a button do add a new project input form for adding multiple projects
- [X] Update frontend validation rules for projects (use yup)
- [X] Blogs (to be done by Evan or Justin)
- [X] Create a component for project inputs which should enable you to set a project title, set a project description, set a project image link, set a project hosted link, set a project github link, set a project code snippet and description, set text cards that answer (what are you most proud of, what is most interesting about this, what is unique about this, why did you do this).
- [X] Update the frontend validation rules for About Me (install yup, see npmjs.com)
- [X] Update color scheme (Light and Dark - https://iansutherland.ca/) and remove the logo
- [X] Create a new logo
- [X] Create a projects model which has a 1-m relationship to users
- [X] Re-introduce the hamburger menu
- [X] Delete the UserActions model and get everything regression functional
- [X] Update userDetails model to only require 2 links: LinkedIn and GitHub 
- [X] Update the About Me page to match the links from above
- [X] Update the Projects page to have a create new project functionality, perhaps expandable
    
## Parking lot
- [ ] Change the stack text input to a chip input (array of strings in the backend)

Contact Information
Justin Cervantes
cervantes.jfa@gmail.com
