Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
})

// Vue.component('filtered', {
//     props: ['value'],
//     template: `<input type="text" class="search-field"
//                     v-bind:value="value"
//                     v-on:input="$emit('input', $event.target.value)">`
//
// });
//
// Vue.component('error', {
//     // props: ['notError'],
//     template: `<div> ERROR - the request to the server was failed - ERROR </div>`
//
// });