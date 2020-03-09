let publicPath = '/';

if (process.env.PUBLIC_PATH) {
  publicPath = process.env.PUBLIC_PATH;
} else if (process.env.NODE_ENV === 'production') {
  publicPath = '/popkult60-exhibit/';
}

module.exports = {
  publicPath,
};
