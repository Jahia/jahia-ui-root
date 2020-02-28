<!--
    Template for Readmes, see alternatives/examples here: https://github.com/matiassingers/awesome-readme
-->
<a href="https://www.jahia.com/">
    <img src="https://www.jahia.com/modules/jahiacom-templates/images/jahia-3x.png" alt="Jahia logo" title="Jahia" align="right" height="60" />
</a>

<!--
    Project name can either be the full length project name (if there is one) or just the repo name. For example: Digital Experience Manager.
-->

# Jahia UI Root

<!--
    A one-liner about the project, like a subtitle. For example: Jahia Digital Experience Manager Core
-->
<p align="center">From version 8, Jahia is getting a new navigation, this repo contains the React App </p>

<!--
    A short technical description (not more than one paragraph) about the project, eventually with tech/tools/framework used.
-->
<p align="center">This new navigation was designed to rethink the way our users navigate within Jahia. Two levels of navigation are available: Level 1 to navigate at a platform level, between apps and platform features, Level 2 to navigate within one of the app (jContent, jExperience). The navigation has been built to be extensible, adding elements to it by deploying modules. </p>

<p align="center">
  <a href="https://www.jahia.com" target="_blank"><img alt="Navigation" title="Jahia Navigation menu" src="./img/jahia-navigation.png" height="640" /></a>
</p>

<!--
    Open Source badges, see https://shields.io/
-->

## Table of content

- [Presentation](#presentation)
- [Dev Environment](#dev-environment)
- [Build](#build)
- [Installation](#installation)
- [Links](#links)

<!--
    Not all sections are relevant for all projects. It's up to the team to decide what sections makes most sense. Objective of the readme is to serve as a technical introduction to faciliate onboarding for technical ppl (developers).
    License and contributions are detailed in their own files, no need to add too many details in the Readme.
    If the project has technical documentation stored in another location (such as a website), effort should be made not to duplicate content (since it will become outdated at some point). In that case, keep the readme instructions very brief (such as a set of CLI commands).
-->

## Presentation

<!--
    (Optional) Technical presentation of the project
-->

## Dev environment

<!--
    Instructions to help a new developer get its environment setup and understands contraints and dependencies and run tests
-->

Note that the jahia-ui-root, moonstone, jahia-dashboard etc. ecosystem will work only with `yalc` yarn linking will not work.

To build:

1. In `@jahia/moonstone` run `yalc publish`.
2. In `dx-commons-webpack` run `yalc add @jahia/moonstone` and then run `yarn`
3. Deploy `dx-commons-webpack` to Jahia
4. In `jahia-ui-root` run `yalc add @jahia/moonstone` and then run `yarn`
5. Deploy `jahia-ui-root` to Jahia.
6. Repeat 4-5 for every other module used in navigation (`jahia-dashboard` etc.) 

##Unit testing

You can execute unit test by running:

`yarn tests:unit`

## Build

<!--
    Instructions to build
-->

## Installation

<!--
    Instructions to install
-->

## Links

<!--
    Relevant links
-->
