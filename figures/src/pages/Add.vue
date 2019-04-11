<template>
  <div class="container">
    <div class="add-figures-section">
      <div class="row">
        <div class="col-3">
          <b-list-group class="text-center">
            <b-list-group-item router-link to="/AddFigures/Circle">Circle</b-list-group-item>
            <b-list-group-item router-link to="/AddFigures/Square">Square</b-list-group-item>
            <b-list-group-item router-link to="/AddFigures/Rectangle">Rectangle</b-list-group-item>
            <b-list-group-item router-link to="/AddFigures/Triangle">Triangle</b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-9 text-center">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'add',
}
</script>

<style scoped>
  .add-figures-section{
    margin-top: 35px;   
  }
</style>
