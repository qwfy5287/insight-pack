import './vue.common.js'

import { action } from '@storybook/addon-actions'
// import { linkTo } from "@storybook/addon-links";

import MyButton from '../components/MyButton.vue'

import InsTemplate from '../components/ins-capi/InsTemplate.vue'

export default {
  title: 'Topbar',
}

export const withInsTemplate = () => ({
  components: { InsTemplate },
  template: '<InsTemplate></InsTemplate>',
  // methods: { action: action("clicked") },
})

export const withText = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') },
})

// export const withJSX = () => ({
//   render() {
//     return (
//       <MyButton onClick={linkTo("Button", "With Some Emoji")}>
//         With JSX
//       </MyButton>
//     );
//   },
// });

// export const withSomeEmoji = () => ({
//   components: { MyButton },
//   template: "<my-button>😀 😎 👍 💯</my-button>",
// });
