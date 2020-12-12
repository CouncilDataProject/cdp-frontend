# cdp-frontend

[![Build Status](https://github.com/CouncilDataProject/cdp-frontend/workflows/Build%20Main/badge.svg)](https://github.com/CouncilDataProject/cdp-frontend/actions)
[![Documentation](https://github.com/CouncilDataProject/cdp-frontend/workflows/Documentation/badge.svg)](https://CouncilDataProject.github.io/cdp-frontend)

React components and the CDP web app itself to be used by CDP instances.

---

## About

Council Data Project is an open-source project dedicated to providing journalists,
activists, researchers, and all members of each community we serve with the tools they
need to stay informed and hold their Council Members accountable.

By combining and simplifying sources of information on Council meetings and actions,
CDP ensures that everyone is empowered to participate in local government.

Each municipality that CDP supports (_a CDP instance_) has open source maintainers
which write code to gather municipality meeting information and compile them into a
single resource to then be processed, stored, and made accessible by our general CDP
tooling.

## Contributing

- [cdp-backend](https://github.com/CouncilDataProject/cdp-backend): Contains
  all the database models, data processing pipelines, and infrastructure-as-code for CDP
  deployments. Contributions here will be available to all CDP instances. Entirely
  written in Python.
- [cdp-frontend](https://github.com/CouncilDataProject/cdp-frontend): This repo.
  Contains all of the components used by the web apps to be hosted on GitHub Pages.
  Contributions here will be available to all CDP instances. Entirely written in
  TypeScript and React.
- [cookiecutter-cdp-deployment](https://github.com/CouncilDataProject/cookiecutter-cdp-deployment):
  A template to be used by the Python `cookiecutter` package to create an entirely new
  deployment repository. This is where `cdp-backend` and `cdp-frontend` are imported and
  used. If you would like to create a new deployment under the
  `councildataproject.github.io` domain please
  [log a GitHub issue](https://github.com/CouncilDataProject/councildataproject.github.io/issues).
  If you want to utilize a different domain, simply use the template like any other
  `cookiecutter`.
- [councildataproject.github.io](https://github.com/CouncilDataProject/councildataproject.github.io):
  Our landing page! Contributions here should largely be text changes and admin updates.

## Documentation

For full package documentation please visit [CouncilDataProject.github.io/cdp-frontend](https://CouncilDataProject.github.io/cdp-frontend).

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for information related to development of this
repository.

### Styling

In developing new components, please first see the
[recommendations from our UX team](https://docs.google.com/presentation/d/15rkic20QV6GU0_nL-8zHIgcw8-o1bCQIiYMsY2j6qFg/edit?usp=sharing)
for guidance. Additionally, we utilize Mozilla's [Protocol](https://github.com/mozilla/protocol/)
for styling each component, please try to use `protocol` wherever possible.

**Free software: MIT license**
