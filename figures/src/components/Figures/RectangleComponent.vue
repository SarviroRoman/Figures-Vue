<template>
  <div class="container row">
    <div class="col-md-12 mb-12">

      <TitleMessage typeFigures='Rectangle'></TitleMessage>

      <div class="row form-content">

        <Form class='col-md-6 mb-6'>
          inputs
        </Form>
        
        <div class="col-md-6 mb-6 text-center">
          <FiguresInformation formula='S=a·b' imageName='rectangle.png'></FiguresInformation>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
import TitleMessage from '@/components/Figures/TitleMessage'
import FiguresInformation from '@/components/Figures/FiguresInformation'

export default {
  name: 'Rectangle',
  components: {
    TitleMessage,
    FiguresInformation,
  }
}
</script>

<style scope>
  .form-content{
    margin: 25px;
  }
</style>