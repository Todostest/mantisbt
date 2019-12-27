import { APP_URL } from '../config'

// Login function that will be used throughout the tests
async function login(testInstance, name, password) {
  return testInstance
    .navigateTo(`${APP_URL}/login_page.php`)
    .typeText('input#username', name)
    .click('input[type="submit"]')
    .click('label[for="secure-session"] > input#secure-session')
    .typeText('input#password', password)
    .click('input[type="submit"]')
}

async function signup(testInstance, name, email) {
  return testInstance
    .navigateTo(`${APP_URL}/signup_page.php`)
    .typeText('input[name="username"]', name)
    .typeText('input[name="email"]', email)
    .debug()
    //.click('input[type="submit"]')
    .debug()
}

export { login, signup }
