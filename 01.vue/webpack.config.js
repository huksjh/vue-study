const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
  mode: 'development', //배포 할때는 production
  devtool: 'eval', //배포할때는  hidden-source-map
  resolve: {
    //확장자 처리  import 등 할때 확장자 안붙여도 됨
    extensions: ['.js', '.vue'],
  },
  entry: {
    app: path.join(__dirname, 'main.js'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader', // use or loader 사용해도됨
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist/js'),
  },
}
