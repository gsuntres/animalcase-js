const core = require('@animalcase-js/core')

module.exports = expressMiddleware

function expressMiddleware() {
  return (req, res, next) => {
    if(req.is('json') === 'json') {
      core.convertToCamelCase(req.body)
    }

    if(req.accepts('json') === 'json') {
      const send = res.send
      res.send = function(o) {
        core.convertToSnakeCase(o)
        send.call(this, o)
      }
    }

    next()
  }
}
