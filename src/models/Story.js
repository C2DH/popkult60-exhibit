export default class Story {
  constructor({
    type = '',
    title = '',
    slug = '',
    abstract = '',
  } = {}) {
    this.type = type;
    this.slug = String(slug);
    this.title = String(title);
    this.abstract = String(abstract);
  }
}
