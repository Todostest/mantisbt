# mantisbt
Autotests for mantis bug tracker

## Settings

To start, you need to install nodejs and yarn

## Get started

1. Clone project
2. cd mantisbt
3. yarn

### Run tests

Run only `app` functional tests.
```shell script
node ./e2e/testcafe.js -t app
```

Run only tests from a specified fixture with name `Displays`.
```shell script
node ./e2e/testcafe.js -f Displays
```

Run only a specified functional test.
```shell script
node ./e2e/testcafe.js -n "Name of the test"
```
