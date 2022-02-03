<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition mode="out-in">
        <keep-alive>
          <suspense>
            <component :is="Component"></component>
            <template #fallback>
              <Spinner />
            </template>
          </suspense>
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<script>
import Spinner from './components/Spinner/Spinner.vue';

export default {
  name: 'App',
  components: {
    Spinner
  }
};
</script>
