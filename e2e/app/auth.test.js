import {
  APP_URL,
  TEST_ACCOUNT_EMAIL,
  TEST_ACCOUNT_PASSWORD,
  TEST_USER_NAME,
  TEST_USER_NAME2,
  TEST_ACCOUNT_PASSWORD2
} from '../config'
import { login, signup } from '../utils/auth'
import getTokenFromEmail from '../utils/getTokenFromEmail'
import { Selector } from 'testcafe'

// eslint-disable-next-line
fixture`Auth`.page`${APP_URL}/`

/*test('Signup new account for user', async t => {
  await signup(t, TEST_USER_NAME, TEST_ACCOUNT_EMAIL)
})

test('E-mail confirmation', async t => {
  const confirmationUrl = await getTokenFromEmail(TEST_ACCOUNT_EMAIL)
  await t
    .navigateTo(confirmationUrl)
    .expect(Selector('.Toastify__toast-body').textContent)
    .eql('Your email was successfully verified', 'Account was successfully verified')
})*/

test('Sign in for regular user', async t => {
  
  await login(t, TEST_USER_NAME2, TEST_ACCOUNT_PASSWORD2)

  await t
   .expect(Selector('span.user-info').withText('TestUser123').exists).ok()
})