import * as crypto from 'crypto'

// 1) decode query from url using https://www.urldecoder.org/
// const URL_DATA_QUERY = '%2BCjQaxBXMsIzK0RHD910YA%3D%3DCfT7HdoDe%2BMCsaxXHj3Q41oMs0g%2FvBZFDbQj7yv89m4%3D'
const URL_DATA_QUERY = '+CjQaxBXMsIzK0RHD910YA==CfT7HdoDe+MCsaxXHj3Q41oMs0g/vBZFDbQj7yv89m4='

const PASS = Buffer.from('JdOXYHVx6j5VIKzlheWLlg==', 'base64')
// const PASS1 = 'thisisthepa$$word'
// 'thisisthepa$$word' -> 'JdOXYHVx6j5VIKzlheWLlg=='

// Get IV from Query string
const IVPiece = URL_DATA_QUERY.slice(0, 24)
const IVPieceByte = new Buffer(IVPiece, 'base64')

// Get Encrypted data from query string
const encryptedString = URL_DATA_QUERY.slice(24)
const encryptedStringByte = Buffer.from(encryptedString, 'base64')

const algorithm = 'aes-128-cbc'

function decrypt(text, key, iv) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let dec = decipher.update(text, 'base64', 'utf8')
  dec += decipher.final()

  return dec
}

const deco = decrypt(encryptedStringByte, PASS, IVPieceByte)
console.log('deco', deco)
