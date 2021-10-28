Vue.component('error', {
    data(){
        return {
          text: ''
        }
    },
    computed: {
      isVisible(){
          return this.text !== ''
      }
    },
    template: `
    <div class="error-block" v-if="isVisible">
        <p class="error-msg">
        <button class="close-btn" @click="text=''">&times;</button>
        {{ text }}
</p>
</div>
    `
})