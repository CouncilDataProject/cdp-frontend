# Contributing

Contributions are welcome, and they are greatly appreciated! Every little bit
helps, and credit will always be given.

Ready to contribute? Here's how to set up `cdp-frontend` for local development.

## Your Environment

To set up your environment you'll need to install:

- The latest stable version of [NodeJS](https://nodejs.org/en/download/) 
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Your Fork

- Fork the `cdp-frontend` repo on GitHub.

- Clone your fork locally:
    ```
    $ git clone --recurse-submodules git@github.com:{your_name_here}/cdp-frontend.git
    ```

- Add upstream remote:
    ```
    $ cd cdp-frontend/
    $ git remote add upstream https://github.com/CouncilDataProject/cdp-frontend.git
    $ git fetch upstream main
    ```

- Install the project depedencies:
    ```
    $ npm ci
    ```

- Create a branch for local development:
    ```
    $ git checkout -b {development_type}/{short-description}
    ```
    Ex: feature/add-transcript-component or bugfix/handle-file-not-found<br>

## Your Work

Now you can make your changes locally.

Use `npm run storybook` to see your changes to individual components as you work. 

If you are creating new components, add new Storybook files to accompany them.

If your work is integrated into the example app, use `npm run start:app` to see your changes in the app as you work. Optionally, use `npm run preview:app` to see your changes in production mode.

## Checking Your Work

- When you're done making changes, check that your changes pass linting, formatting,
tests, and that the package builds:
    ```
    $ npm run lint
    $ npm run format
    $ npm run test
    $ npm run build
    $ npm run localize
    ```

## Deploying Your Storybook Docs Site or Example App

You can also build and deploy the Storybook docs website or the example app to your forked repo's GitHub Pages for a live preview of your changes that can be shared with others.

_Note: If you're working on component features or bug fixes we will ask for this link to view your work._

```
npm run build-storybook-docs
npm run deploy-storybook-docs
```

If your work is on components that is integrated into the example app, you can build and deploy the example app instead of the Storybook docs website.

```
npm run build:app
npm run deploy:app
```

Once deployed, the site or app should be viewable at the following link: https://{your-github-username}.github.io/cdp-frontend/

The first time you deploy the docs site, navigating to this link will likely result in a 401 error. This is because GitHub Pages defaults to private visibility. To change this:

-   Navigate to the "Settings" page of your forked repo
-   Click the "Pages" sidebar tab
-   Find the "GitHub Pages visibility" dropdown settings option and change it to "Public"
-   Complete the confirmation popup dialog
-   The site should now be publicly viewable!

## Your Pull Request

- Commit your changes and push your branch to GitHub.
    ```
    $ git add .
    $ git commit -m "Resolves gh-###. Your detailed description of your changes."
    ```
    If there are new commits from upstream's main since your last git pull, you need
    to merge the latest commits from upstream's main into your branch and resolve any
    merge conflicts locally. If there are no new commits from upstream's main, you
    can skip step a, b, and c.

    a. Get the latest commits:
    ```
    $ git checkout main
    $ git pull --rebase upstream main
    ```

    b. Merge the latest commits into your branch:
    ```
    $ git checkout {development_type}/{short-description}

    $ git rebase main
    or
    $ git merge main
    ```

    c. Resolve any merge conflicts and if needed run all the linting, formatting,
    tests, and build again.

    Push your branch to GitHub:
    ```
    $ git push origin {development_type}/{short-description}
    ```


- Submit a pull request through the GitHub website.

## Keep Up To Date

- Once your branch has been merged to main, if you want to keep your fork and local
repo clean, you can delete your branch.
    ```
    $ git push origin --delete {development_type}/{short-description}
    $ git branch -D {development_type}/{short-description}
    ```

    Keep your local and fork repo's main up-to-date with upstream's main:
    ```
    $ git checkout main
    $ git pull --rebase upstream main
    $ git push origin main
    ```

## Deploying

A reminder for the maintainers on how to deploy.
Make sure all your changes are committed.

The following commands should only ever be ran from the most up-to-date `main` branch.

```bash
git checkout main
git fetch origin
git pull origin main
```

Run:

```bash
npm run bumpversion-{major | minor | patch}
git push
git push --tags
```

After all tests pass on GitHub a job will automatically run to
release a new package version on GitHub and publish to npm.
