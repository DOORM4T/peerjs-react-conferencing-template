module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-react-refresh"],
}
