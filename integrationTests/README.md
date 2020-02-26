This folder contains a self-contained sets of integration tests that can be used to test Jahia 8 Navigation.

# Pre-requisites

To run the full suite of tests, you need the following:

-   docker
-   docker-compose
-   access to the Jahia organization on Docker Hub

Docker Hub is used to save the state of a modified Jahia instance and restart from that state, limiting the need of frequently configuring an instance. Docker hub is not an absolute requirement to write or execute tests, it is only there to avoid having to configure Jahia every time.

# Get started (quickly)

You can get started quickly by running the following:

```bash
export DOCKERHUB_LOGIN=YOUR_USERNAME
export DOCKERHUB_PASSWORD=YOUR_PASSWORD
bash build-run.sh
```

The build-run script spins-up Jahia and run an initial series of tests.

_Note: This bash script was built on a Mac, and hasn't been tested on another operating system._

# How to add more tests ?

The tests are built using jest and puppeteer, the entire test suite can be executed towards a running & configured Jahia instance:

```bash
TEST_URL="http://localhost:8080" JAHIA_USERNAME=root JAHIA_PASSWORD=root yarn run test:integration:ci --ci --runInBand --reporters=default --reporters=jest-junit
```

Simply add more tests to the `integrationTests` folder. You only to run the bash script `build-run.sh` once to spin-up and prepare Jahia, once done, you can simply build and run more tests on the running docker containers.

```bash
TEST_URL="http://localhost:8080" JAHIA_USERNAME=root JAHIA_PASSWORD=root TESTRAIL_URL=https://jahia.testrail.net TESTRAIL_USERNAME=REPLACE TESTRAIL_PASSWORD=REPLACE  TESTRAIL_MILESTONE="Jahia-7.3.4.1" yarn run test:integration:ci --ci --runInBand adminMenuOrder.test.js
```

# Environment variables

The following environment variables can be used

| Variable | Default | Description |
| --- | --- | --- |
| TEST_URL | n/a | URL to the graphQL endpoint |
| JAHIA_USERNAME | n/a | Jahia Username |
| JAHIA_PASSWORD | n/a | Jahia Password |
| TESTRAIL_USERNAME | n/a | Testrail Username |
| TESTRAIL_PASSWORD | n/a | Testrail Password |
| TESTRAIL_URL | n/a | Testrail URL |
| TESTRAIL_MILESTONE | Default | Testrail milestone for the run |
| TESTRAIL_RUNDESCRIPTION | This jest run was manually triggered | Description for the run in testrail |
| IGNORE_TESTS | n/a | Not used |
| SNAPSHOTS_DIR | n/a | Not used |
