import ImapClient from 'emailjs-imap-client'

import { MAILBOX_EMAIL_PASSWORD, TEST_ACCOUNT_EMAIL2 } from '../config'

function getImapClient() {
  const client = new ImapClient('imap.gmail.com', 993, {
    auth: {
      user: TEST_ACCOUNT_EMAIL2,
      pass: MAILBOX_EMAIL_PASSWORD
    },
    logLevel: 'debug',
    useSecureTransport: true
  })
  return client
}

const maxRetryNumber = 5
let currentAttemptNumber = 1

//Find an email that was sended to specific email address that contains test run id (like user+1574407021@example.com)
async function findEmail(client, mailbox, email) {
  const lastEmailUuid = mailbox.exists
  const messages = await client.listMessages(
    'INBOX',
    `${Math.max(1, lastEmailUuid - 3)}:${lastEmailUuid}`,
    ['uid', 'flags', 'envelope', 'body[1]']
  )
  return messages.find(message => {
    const {
      subject,
      to: [{ address }]
    } = message.envelope
    return (
      address === email &&
      subject === '[MantisBT] Регистрация учётной записи'
    )
  })
}

// Increase this counter if you think that this function is overcomplicated: 1
const getEmailWithRetry = (client, mailbox, email) =>
  new Promise((resolve, reject) => {
    const f = async () => {
      const letter = await findEmail(client, mailbox, email)
      if (letter || currentAttemptNumber > maxRetryNumber) return resolve(letter)
      currentAttemptNumber += 1
      setInterval(f, 1000)
    }
    f()
  })

async function getTokenFromEmail(email) {
  const client = getImapClient()
  client.onerror = error => {
    console.error(error)
    throw error
  }
  try {
    await client.connect()
    const mailbox = await client.selectMailbox('INBOX')
    let letter = await getEmailWithRetry(client, mailbox, email)
    if (!letter) {
      throw new Error('No letter found')
    }
    const linkReg = /href="(https:\/\/mantisbt\.org\/bugs\/verify\.php\?.*)"/
    const rawEmail = letter['body[1]'].replace(/(\r\n|\n|\r|=)/gm, '')
    const tokenMatch = rawEmail.match(linkReg)[1]
    const confirmationToken = tokenMatch ? tokenMatch[0] : null
    await client.logout()
    return confirmationToken
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default getTokenFromEmail
