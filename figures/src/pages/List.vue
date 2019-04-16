<template>
  
  <Spinner v-if='!getFiguresIsSuccess'></Spinner>

  <div v-else class="container list-section">

    <NoFiguresAlert v-if="figures.length === 0"></NoFiguresAlert>

    <div v-else class="text-center">
      <b-table 
        bordered
        striped
        hover
        fixed
        caption-top
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        :items='figures'
      >
        <template slot="table-caption">List added figures</template>

        <template slot="actions" slot-scope="data">

          <button class="btn btn-sm btn-outline-danger" @click="openDelModal(data.item.id)" :disabled="showDeleteSpinner">
            Delete
            <ButtonSpinner v-if="showDeleteSpinner"></ButtonSpinner>
          </button>

          <button class="btn edit-btn btn-sm btn-outline-warning" @click="data.toggleDetails">
            Edit
          </button>

        </template>

        <template slot="row-details" slot-scope="data">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>area:</b></b-col>
            <b-col>{{ data.item.area }}</b-col>
          </b-row>
          <button class="btn btn-sm btn-outline-dark" @click="data.toggleDetails">Close</button>
        </b-card>
      </template>

      </b-table>

      <b-pagination v-if='figures.length>perPage'
        class="list-pagination"
        align="center"
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="figures-table"
      ></b-pagination>

      <b-alert v-model="showDeleteAlert" variant="success" class="deleteAlert" dismissible>
        <p class="text-center">{{ deleteMessage }}</p>
      </b-alert>

      <b-modal 
        centered 
        title="Figure deletion" 
        ref="delModalRef" 
        ok-variant="outline-danger"
        ok-title='Delete' 
        @ok="deleteFigure()" 
      >

        <p class="my-3">
          <strong>Are you sure you want to delete this figure?</strong>
          <br />
          All information associated to this figure will be permanently deleted.
          <br />
          <span class="text-danger">This operation can not be undone.</span>
        </p>

      </b-modal>

    </div>
  </div>
  
  
  
</template>

<script>
import axios from 'axios'
import Spinner from '@/components/Spinner'
import NoFiguresAlert from '@/components/NoFiguresAlert'
import ButtonSpinner from '@/components/ButtonSpinner'
import { APP } from '../application-constants'


export default {
  name: 'list',
  components: {
    Spinner,
    NoFiguresAlert,
    ButtonSpinner
  },
  data() {
    return {
      APP,
      perPage: 5,
      currentPage: 1,
      figures: [],
      getFiguresIsSuccess: false,
      showDeleteSpinner: false,
      deleteMessage: '',
      showDeleteAlert: false,
      currentIdDeleteFigure: Number,
      fields: [
        {
          key: 'id',
          sortable: true
        },
        {
          key: 'type',
          label: 'Figure type',
          sortable: true
        },
        {
          key: 'area',
          sortable: true,
        },
        {
          key: 'actions',
          sortable: false
        }
      ]
    }
  },
  mounted(){
    axios
    .get(`${APP.endpoints.baseUrl}${APP.endpoints.figures}`)
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
    openDelModal: function(id){
      this.currentIdDeleteFigure = id;
      this.$refs.delModalRef.show();
    },
    deleteFigure: function () {
      const id = this.currentIdDeleteFigure;
      this.showDeleteSpinner = true;
      axios
      .delete(`${APP.endpoints.baseUrl}${APP.endpoints.figures}?id=${id}`)
      .then(response => {
        if(response.data.success){
          const index = this.figures.findIndex(figure => figure.id === id);
          this.figures.splice(index,1);
          this.showDeleteSpinner = false;
          this.showAlertDeleteFigure = true;
          this.deleteMessage = `Figures #${id} successfully deleted`;
          this.showDeleteAlert = true;

          if(this.figures.length <= (this.currentPage-1)*this.perPage){
            --this.currentPage;
          }
        }
      });
    },
  }
}
</script>

<style scoped>
  .list-section{
    margin-top: 15px;   
  }
  .deleteAlert{
    margin: 25px 50px;
  }
  .list-pagination{
    margin-top: 25px;
  }
  .deleteAlert p{
    margin-bottom: 0px;
  }
  .edit-btn{
    margin-left: 10px;
  }
</style>