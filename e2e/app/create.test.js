import { APP_URL, TEST_USER_NAME2, TEST_ACCOUNT_PASSWORD2 } from '../config'
import { login } from '../utils/auth'
import { Selector } from 'testcafe'

// eslint-disable-next-line
fixture`Tasks`.page`${APP_URL}`

const categorySelect = Selector('select#category_id');
const categoryOption = categorySelect.find('option');
const testSummary = `summary+${new Date().getTime()}`;
const testDescription = `description+${new Date().getTime()}`;

test('Create new task', async t => {
  await login(t, TEST_USER_NAME2, TEST_ACCOUNT_PASSWORD2)

  await t
    .click(Selector('button#menu-toggler'))
    .click(Selector('a[href-hammerhead-stored-value="/bugs/bug_report_page.php"]'))
    .click(categorySelect)
    .click(categoryOption.withText('code cleanup'))
    .typeText('input#summary', testSummary)
    .typeText('textarea#description', testDescription)
    .click('input[type="submit"]')

  await t
    .navigateTo(APP_URL)
    .expect(Selector('a').withText(testSummary).exists).ok()
})