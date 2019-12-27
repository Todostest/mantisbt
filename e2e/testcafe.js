const createTestCafe = require('testcafe')
const selfSignedSertificate = require('openssl-self-signed-certificate')
const program = require('commander')

program
  .option(
    '-t, --target [target]',
    'target to test (all|app)',
    /^(all|app)$/i,
    'all'
  )
  .option('-n, --test-name [testname]', 'name of a test to run')
  .option('-f, --fixture [fixturename]', 'name of a fixture to run')
  .option('-s, --speed [speed]', 'test speed', /^(0(\.[0-9]+)?|1)$/, 1)
  .option('-p, --test-path [path]', 'tests path glob pattern')
  .option('-m, --mode [mode]', 'mode to run chrome browser', /^(headless|ui)$/i, 'ui')
  .parse(process.argv)

let { target, testName, fixture, testPath, speed, mode } = program

let src

if (testName || fixture) {
  target = 'all'
}

if (testPath) {
  src = testPath
} else {
  switch (target) {
    case 'app':
      src = './app/**/*.test.js'
      break
    default:
      src = './**/*.test.js'
  }
}

if (fixture) {
  console.log(`Running tests for fixture '${fixture}' within ${src}`)
} else if (testName) {
  console.log(`Running tests '${testName}' within ${src}`)
} else {
  console.log(`Running tests ${src}`)
}

let testcafe = null
let runner = null

const sslOptions = {
  key: selfSignedSertificate.key,
  cert: selfSignedSertificate.cert
}

const chromeBrowser = `chrome${mode === 'headless' ? ':headless' : ''}`

createTestCafe('localhost', 3031, 3032, sslOptions)
  .then(tc => {
    testcafe = tc
    runner = testcafe.createRunner()
  })
  .then(() => {
    return runner
      .src(src)
      .filter((tName, fixtureName) => {
        if (fixture) {
          return fixtureName === fixture
        } else {
          return testName ? tName === testName : true
        }
      })
      .browsers(
        `${chromeBrowser} --allow-insecure-localhost --use-fake-device-for-media-stream --selector-timeout 20000`
      )
      .run({
        skipJsErrors: true,
        speed
      })
  })
  .then(() => {
    if (testcafe) testcafe.close()
  })
  .catch(e => {
    console.error(e)
    if (testcafe) testcafe.close()
  })
