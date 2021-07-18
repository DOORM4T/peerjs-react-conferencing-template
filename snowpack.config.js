module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: [
    "@snowpack/plugin-typescript", 
    "@snowpack/plugin-react-refresh",
    '@snowpack/plugin-webpack'
  ],
  buildOptions: {
    baseUrl: "/peerjs-react-conferencing-template",
    metaUrlPath: "snowpack"
  },
}
