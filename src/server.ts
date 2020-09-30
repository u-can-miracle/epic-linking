import axios from 'axios'

const USERNAME = 'CARECLIX'
const PASS = 's4hr#cFgkCzFfMRjhyp+'
const AUTH_CREDS = `emp$${USERNAME}:${PASS}`
const NON_PROD_CLIENT_ID = '7b3ba072-afc5-4c30-b1a3-29584e109bed'
const basicAuthToken = encodeToBase64(AUTH_CREDS)
const url = getSetConnectionStatusUrl({
  ConferenceID: 1853,
  ExternalID: 19,
  ExternalIDType: 2,
  VendorName: 'Telehealth Vendor',
  ConnectionStatus: 1,
})
axios.get(url, {
  headers: {
    'Authorization': `Basic ${basicAuthToken}`,
    'Epic-Client-ID': NON_PROD_CLIENT_ID,
  },
})
.then(result => console.log('result', result.data))
.catch(err => console.log('err', err))

/***  Functions declarations  ***/

function encodeToBase64(data) {
  const buff = new Buffer(data)
  const base64data = buff.toString('base64')

  return base64data
}

function getSetConnectionStatusUrl({
  ConferenceID,
  ExternalID,
  ExternalIDType,
  VendorName,
  ConnectionStatus,
}) {
  // @ts-ignore:disable-next-line
  // https://apporchard.epic.com/interconnect-aocurprd-username/api/epic/2018/Telehealth/ContextLinking/SetExternalConnectionStatus?ConferenceID={ConferenceID}&ExternalID={ExternalID}&ExternalIDType={ExternalIDType}&VendorName={VendorName}&ConnectionStatus={ConnectionStatus}

  const BASE_URL = 'https://apporchard.epic.com/interconnect-aocurprd-username'
  const EXTERNAL_CONNECTION_STATUS = '/api/epic/2018/Telehealth/ContextLinking/SetExternalConnectionStatus'
  const apiUrl = BASE_URL +
    EXTERNAL_CONNECTION_STATUS + '?' +
    `ConferenceID=${ConferenceID}&` +
    `ExternalID=${ExternalID}&` +
    `ExternalIDType=${ExternalIDType}&` +
    `VendorName=${VendorName}&` +
    `ConnectionStatus=${ConnectionStatus}`

  return apiUrl
}
