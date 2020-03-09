import axios from 'axios';
import Story from '../models/Story';

const instance = axios.create({
  baseURL: 'https://c2dh.github.io/popkult60/assets/data/',
  timeout: 1000,
});

const errorHandler = (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  throw error;
};

const stories = {
  find() {
    return instance.get('/stories.json')
      .then(({ data }) => data)
      .then(({ total, data }) => ({
        total,
        data: data.map((d) => new Story(d)),
      }))
      .catch(errorHandler);
  },
  get(id) {
    return instance.get('/stories.json')
      .then(({ data }) => data)
      .then(({ data }) => new Story(data.find((d) => d.slug === id)))
      .catch(errorHandler);
  },
};
const documents = {
  find() {
    return instance.get('/documents.json').catch(errorHandler);
  },
};

export {
  stories,
  documents,
};
