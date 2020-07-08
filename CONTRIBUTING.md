# Contributing

Contributions are welcome, and they are greatly appreciated! Every little bit
helps, and credit will always be given.

## Get Started!
Ready to contribute? Here's how to set up `cdp-instance` for local development.

* Fork the `cdp-instance` repo on GitHub.

* Clone your fork locally:
    ```
    $ git clone --recurse-submodules git@github.com:{your_name_here}/cdp-instance.git
    ```

* Add upstream remote:
    ```
    $ cd cdp-instance/
    $ git remote add upstream https://github.com/CouncilDataProject/cdp-instance.git
    $ git fetch upstream master
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
    If there are new commits from upstream's master since your last git pull, you need
    to merge the latest commits from upstream's master into your branch and resolve any
    merge conflicts locally. If there are no new commits from upstream's master, you
    can skip step a, b, and c.

    a. Get the latest commits:
    ```
    $ git checkout master
    $ git pull --rebase upstream master
    ```

    b. Merge the latest commits into your branch:
    ```
    $ git checkout {your_development_type}/{short-description}

    $ git rebase master
    or
    $ git merge master
    ```

    c. Resolve any merge conflicts and if needed run all the linting, formatting,
    tests, and build again.

    Push your branch to GitHub:
    ```
    $ git push origin {your_development_type}/{short-description}
    ```


* Submit a pull request through the GitHub website.

* Once your branch has been merged to master, if you want to keep your fork and local
repo clean, you can delete your branch.
    ```
    $ git push origin --delete {your_development_type}/{short-description}
    $ git branch -D {your_development_type}/{short-description}
    ```

    Keep your local and fork repo's master up-to-date with upstream's master:
    ```
    $ git checkout master
    $ git pull --rebase upstream master
    $ git push origin master
    ```

## Deploying

A reminder for the maintainers on how to deploy.
Make sure all your changes are committed.

The following commands should only ever be ran from the most up-to-date `master` branch.
```bash
git checkout master
git fetch origin
git pull origin master
```

Run:

```bash
npm version {major | minor | patch}
git push
git push --tags
git branch -D stable
git checkout -b stable
git push --set-upstream origin stable -f
```

This will release a new package version on Git + GitHub and publish to npm.
