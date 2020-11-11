module.exports = {
  publicPath: '/supercap',
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Supercapacitor Discharge Calculator";
            return args;
        })
  }
}