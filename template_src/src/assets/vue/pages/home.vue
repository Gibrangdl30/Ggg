<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>
      <div class="title">Framework7-Vue</div>
      <f7-nav-right>
        
        <f7-link
          class="searchbar-enable"
          data-searchbar=".searchbar-components"
          icon="fas fa-search"
        ></f7-link>
      </f7-nav-right>
      <f7-searchbar
        class="searchbar-components"
        search-container=".components-list"
        search-in="a"
        expandable
      ></f7-searchbar>
    </f7-navbar>
    <f7-block-title>Introduction test</f7-block-title>
    <f7-block inner>
      <p>This is template for Framework75, Vue and Phonegap.</p>
    </f7-block>
    {{ 123456 | number('0,0') }}
    <f7-block-title class="searchbar-found">Links</f7-block-title>
    <f7-list class="components-list searchbar-found">
      <f7-list-item link="/about/" title="About" panel-close>
        <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/form/" title="Form" panel-close>
        <f7-icon slot="media" icon="fas fa-id-card-alt fa-fw"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/dynamic-route/blog/11/post/23/" title="Dynamic Route" panel-close>
        <f7-icon slot="media" icon="fas fa-rss fa-fw"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/chat/" title="Chat" panel-close>
        <f7-icon slot="media" icon="fas fa-user fa-fw"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/vuex/" title="Vuex" panel-close>
        <f7-icon slot="media" icon="fas fa-battery-empty fa-fw"></f7-icon>
      </f7-list-item>
    </f7-list>
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-block-title class="searchbar-hide-on-search">Themes</f7-block-title>
    <f7-list class="searchbar-hide-on-search">
      <f7-list-item title="iOS Theme" external link="./index.html?theme=ios"></f7-list-item>
      <f7-list-item title="Material (MD) Theme" external link="./index.html?theme=md"></f7-list-item>
      <f7-list-item title="Color Themes" link="/color-themes/"></f7-list-item>
      <f7-list-item title="Github" external link="https://github.com/kevinqqnj"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  components: {}
};
</script>
