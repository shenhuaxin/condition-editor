const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy:{
      "/benAppData":{
        target:"http://127.0.01:8080/",
        ws:false,
        changeOrigin:true,
        pathRewrite:{
          "^/benAppData":"/benAppData"
        }
      }
    }
  }
})

