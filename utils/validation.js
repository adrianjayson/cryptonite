const isRequired = input => input === '' ? 'API key cannot be blank.' : true;

module.exports = { isRequired };