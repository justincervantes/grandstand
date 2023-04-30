# spotlight

A tool web application that builds and hosts developer portfolio pages. 

## Setup and Contributing

### Setup

Preferably set up your own MySQL server locally, I've set up an AWS RDS instance for beginners to get started faster. To get started, clone the repo, run `npm install`, `npx prisma generate` then `npm run dev`. You should now see the application running at localhost:3000. Create a file called .env.local in the root of the project, and email Justin (below) for the configuration keys.

### Contributing

Contributions are welcome, in order to contribute you'll need developer configurations which can be obtained by emailing Justin (contact details below). The prod branch is main, and the development branch is dev. Do not touch main. When working on features, cut a branch off of dev called feat/name_of_feature_you_are_working_on. When you are done, make a pull request and tag Justin Cervantes or Evan Morrow to review your work. Do not push commits directly to dev. 

## To do
- [ ] Backend: create a page called showcase which has a dynamic route based on the user name, for example localhost:3000/showcase/justincervantes
  - This should capture the user slug, and load their content from the user details table, projects table, and blog
- [ ] Replace the navbar so that it optimizes for mobile first viewing (hamburger menu)
- [X] The menu should list the following sections: 1. About Me 2. Projects 3. Blog
- [X] About me should accept an image link for your profile picture, accept a name, accept a list of links (GitHub, LinkedIn, Twitter, Instagram)
- [ ] Create a component for project inputs which should enable you to set a project title, set a project description, set a project image link, set a project hosted link, set a project github link, set a project code snippet and description, set text cards that answer (what are you most proud of, what is most interesting about this, what is unique about this, why did you do this).
- [ ] Projects should show a project input form, with a button do add a new project input form for adding multiple projects
- [ ] Blogs (to be done by Evan or Justin)


Contact Information
Justin Cervantes
cervantes.jfa@gmail.com
