<template>
  <div class="story">
    {{
      story
    }}
  </div>
</template>

<script>
// @ is an alias to /src
import { stories } from '@/services';

export default {
  name: 'Home',
  data: () => ({
    story: null,
  }),
  mounted() {
    stories.get(this.$route.params.id).then((story) => {
      this.story = story;
    });
  },
};
</script>
