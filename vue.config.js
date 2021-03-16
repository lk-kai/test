var appData = require('./data.json')
var list = appData.list
var list2 = appData.list2
const path = require('path')
const axios = require('axios')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
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
      app.get('/api/getTopBanner', function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        const jumpPrefixMap = {
          10002: 'https://y.qq.com/n/yqq/album/',
          10014: 'https://y.qq.com/n/yqq/playlist/',
          10012: 'https://y.qq.com/n/yqq/mv/v/'
        }
        axios.get(url, {
          headers: {
            referer: 'https://u.y.qq.com/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          response = response.data
          if (response.code === 0) {
            const slider = []
            const content = response.focus.data && response.focus.data.content
            if (content) {
              for (let i = 0; i < content.length; i++) {
                const item = content[i]
                const sliderItem = {}
                const jumpPrefix = jumpPrefixMap[item.type || 10002]
                sliderItem.id = item.id
                sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html'
                sliderItem.picUrl = item.pic_info.url
                slider.push(sliderItem)
              }
            }
            res.json({
              code: 0,
              data: {
                slider
              }
            })
          } else {
            res.json(response)
          }
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  },
  configureWebpack:{
    plugins:[
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        // threshold: 10240,
        deleteOriginalAssets: false
      })
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    optimization:{
      minimizer:[
        new TerserPlugin({
          terserOptions:{
            ecma:undefined,
            warnings:false,
            parse:{},
            compress:{
              drop_console:true,
              drop_debugger:false,
              pure_funcs:['console.log']
            }
          }
        })
      ]
    }
  }
}
