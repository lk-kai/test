var appData = require('./data.json')
var list = appData.list
module.exports = {
  devServer: {
    before: function (app) {
      // 可请求   api/data
      app.get('/api/list', function (req, res) {
        res.json({ code: 0, data: list })
      })
    }
  }
}
