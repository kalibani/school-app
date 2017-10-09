var crypto = require('crypto');

//step bawaan dari crypto
function randomString(length) {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}

function createHash(password, secret) {
  let hash = crypto.createHmac('sha256', secret).update(password).digest('hex');

  return hash;
}

module.exports = {
  randomString,
  createHash
};
