// module.exports = {
//   // basePath: "http://localhost:3000/",
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     })
//     return config
//   },
// }

const path = require("path")

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(svg)$/,
      include: path.resolve(__dirname, "src/assets/svg-icons"),
      loader: "svg-react-loader",
    })
    return config
  },
}
