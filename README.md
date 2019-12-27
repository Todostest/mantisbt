# mantisbt
Autotests for mantis bug tracker

## Settings

To start, you need to install nodejs and yarn

## Get started

1. Clone project
2. cd mantisbt
3. yarn

### Run tests

Run `all` functional tests.
```shell script
node ./e2e/testcafe.js -t all
```

Run only tests from a specified fixture with name `Tasks`.
```shell script
node ./e2e/testcafe.js -f Tasks
```

Run only a specified functional test.
```shell script
node ./e2e/testcafe.js -n "Name of the test"
```
