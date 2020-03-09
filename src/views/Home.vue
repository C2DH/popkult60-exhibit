<template>
  <div class="home">
    <div v-for="(story, i) in stories" :key="i">
      <h1>
        <router-link :to="{ name: 'Story', params: { id: story.slug }}">
          {{ story.title }}
        </router-link>
      </h1>
    </div>

    <div class="rellax-wrapper">
      <div class="rellax">
        I’m slow and smooth
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { stories } from '@/services';
import Rellax from 'rellax';

export default {
  name: 'Home',
  data: () => ({
    stories: [],
  }),
  mounted() {
    stories.find().then(({ data, total }) => {
      this.total = total;
      this.stories = data;
    });
    Rellax('.rellax', {
      center: true,
    });
  },
};
</script>
<style>
.rellax-wrapper{
  height: 4000px;
}
</style>
