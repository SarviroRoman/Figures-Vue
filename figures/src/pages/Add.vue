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
          <!-- <keep-alive> -->
            <router-view v-on:addFigures='addFigures' :responseIsSuccess='responseIsSuccess'></router-view>
          <!-- </keep-alive> -->

          <b-alert
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            class="deleteAlert"
          >
            <p class="text-center">{{textAlertMessage}}</p>
            <b-progress
              variant="success"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add',
  data() {
    return {
      responseIsSuccess: false,
      textAlertMessage: String,
      showAlert: false,
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  methods: {
    addFigures(type, area){
      this.responseIsSuccess = true;
      const newFigure = {
        type: type,
        area: area
      };

      axios
      .post(`http://localhost:7000/figures`, newFigure)
      .then(response => {
        if(response.data.success){
          this.responseIsSuccess = false;
          this.textAlertMessage = `${type} #${response.data.id} with ${area} area successfully added`;
          this.dismissCountDown = this.dismissSecs;        
          }
      })
    },
        countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  }
}
</script>

<style scoped>
  .add-figures-section{
    margin-top: 35px;   
  }
</style>
