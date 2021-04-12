# Contributing

Contributions are welcome, and they are greatly appreciated! Every little bit
helps, and credit will always be given.

## Get Started!
Ready to contribute? Here's how to set up `cdp-frontend` for local development.

* Fork the `cdp-frontend` repo on GitHub.

* Clone your fork locally:
    ```
    $ git clone --recurse-submodules git@github.com:{your_name_here}/cdp-frontend.git
    ```

* Add upstream remote:
    ```
    $ cd cdp-frontend/
    $ git remote add upstream https://github.com/CouncilDataProject/cdp-frontend.git
    $ git fetch upstream main
    ```

* Install the project:
    ```
    $ npm i
    ```

* Create a branch for local development:
    ```
    $ git checkout -b {your_development_type}/{short-description}
    ```
    Ex: feature/add-transcript-component or bugfix/handle-file-not-found<br>
    Now you can make your changes locally.<br>

* When you're done making changes, check that your changes pass linting, formatting,
tests, and that the package builds:
    ```
    $ npm run lint
    $ npm run format
    $ npm run test
    $ npm run build
    ```

* Commit your changes and push your branch to GitHub.
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
    $ git checkout {your_development_type}/{short-description}

    $ git rebase main
    or
    $ git merge main
    ```

    c. Resolve any merge conflicts and if needed run all the linting, formatting,
    tests, and build again.

    Push your branch to GitHub:
    ```
    $ git push origin {your_development_type}/{short-description}
    ```

* Build and deploy the Storybook docs to your forked repo's GitHub page for a live preview of your changes
    ```
    $ npm run build-storybook-docs
    $ npm run deploy-storybook-docs    
    ```

* Submit a pull request through the GitHub website.

* Once your branch has been merged to main, if you want to keep your fork and local
repo clean, you can delete your branch.
    ```
    $ git push origin --delete {your_development_type}/{short-description}
    $ git branch -D {your_development_type}/{short-description}
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
