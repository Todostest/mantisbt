/*
Global constants useful for the functional tests
 */

export const APP_URL = process.env.APP_URL || 'https://mantisbt.org/bugs'

// Password to access the test gmail account
export const MAILBOX_EMAIL_PASSWORD = ''

// Setting separated the email prefix and provider so that we can add custom sufixes after prefix
export const TEST_EMAIL_PREFIX = ''
export const TEST_EMAIL_PROVIDER = ''

export const TEST_USER_NAME = `JOHN+${new Date().getTime()}${TEST_EMAIL_PROVIDER}`
export const TEST_ACCOUNT_EMAIL = `${TEST_EMAIL_PREFIX}+${new Date().getTime()}${TEST_EMAIL_PROVIDER}`
export const TEST_ACCOUNT_PASSWORD = ''

// Temporary credentails until email is not integrated

export const TEST_ACCOUNT_EMAIL2 = ''
export const TEST_ACCOUNT_PASSWORD2 = 'testtest12'
export const TEST_USER_NAME2 = 'justforlulz'
/*
Routes
 */
export const SIGNUP_ROUTE = `${APP_URL}/signup_page.php`
export const LOGIN_ROUTE = `${APP_URL}/login_page.php?return=%2Fbugs%2Fmy_view_page.php`
