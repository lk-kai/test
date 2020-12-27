var appData = require('./data.json')
var list = appData.list
var list2 = appData.list2
module.exports = {
  devServer: {
    before: function (app) {
      // 可请求   api/data
      app.get('/api/list', function (req, res) {
        res.json({ code: 0, data: list })
      })
      app.get('/api/list2', function (req, res) {
        res.json({ code: 0, data: list2 })
      })
    }
  }
}
