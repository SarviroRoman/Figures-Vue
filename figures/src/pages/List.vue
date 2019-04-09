<template>

  <div v-if='!getFiguresIsSuccess' class="spinner-section">
    <b-spinner variant="primary" label="Loading..."></b-spinner>
  </div>

  <div v-else class="container list-section">

    <div v-if="figures.length === 0">
      <b-alert variant="info" show >
        <h5 class="d-flex justify-content-center align-content-center flex-wrap waring-text">Added figures not found - <router-link class="nav-link" to="/add">add them now</router-link></h5>
      </b-alert>
    </div>

    <div v-else class="text-center">
      <table 
        class="table table-bordered table-hover table-striped"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <caption>List added figures</caption>

        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Type figures</th>
            <th scope="col">Area</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="figure in figures.slice((currentPage-1) * perPage,(currentPage-1) * perPage + perPage)" :key="figure.id">
            <th scope="row">{{ figure.id }}</th>
            <td> {{ figure.type }} </td>
            <td> {{ figure.area }} </td>
            <td>
              <button class="btn btn-sm btn-outline-danger" @click="deleteFigure(figure.id)" :disabled="showDeleteSpinner">
                Delete
                <template v-if="showDeleteSpinner">
                  <b-spinner small type="grow"></b-spinner>
                  <span class="sr-only">Loading...</span>
                </template>
              </button>
            </td>
          </tr>
        </tbody>

      </table>

      <b-pagination v-if='figures.length>perPage'
        align="center"
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="figures-table"
      ></b-pagination>

      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        class="deleteAlert"
      >
        <p>{{deleteMessage}}</p>
        <b-progress
          variant="success"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>

    </div>
  </div>
  
  
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'list',
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      figures: [],
      getFiguresIsSuccess: false,
      showDeleteSpinner: false,
      deleteMessage: '',
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  mounted(){
    axios
    .get('http://localhost:7000/figures')
    .then(response => {
      this.figures = response.data.sort((first,second) => first.area-second.area);
      this.getFiguresIsSuccess = true;
    });
  },
  computed: {
    rows() {
      return this.figures.length;
    }
  },
  methods: {
    deleteFigure: function (id) {
      this.showDeleteSpinner = true;
      axios
      .delete(`http://localhost:7000/figures?id=${id}`)
      .then(response => {
        if(response.data.success){
          const index = this.figures.findIndex(figure => figure.id === id);
          this.figures.splice(index,1);
          this.showDeleteSpinner = false;
          this.showAlertDeleteFigure = true;
          this.deleteMessage = `Figures #${id} successfully deleted`;
          this.dismissCountDown = this.dismissSecs;

          if(this.figures.length <= (this.currentPage-1)*this.perPage){
            --this.currentPage;
          }
        }
      });

    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  }
}
</script>

<style scoped>
  .list-section{
    margin-top: 35px;   
  }
  .spinner-section{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .deleteAlert{
    margin: 0 50px;
  }
  .waring-text{
    margin-top: 8px;
  }
  .nav-link{
    padding: 0 0.5rem !important;
  }
</style>