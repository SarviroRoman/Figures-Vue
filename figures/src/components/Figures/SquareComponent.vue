<template>
  <div class="container row">
    <div class="col-md-12 mb-12">

      <TitleMessage typeFigures='Square'></TitleMessage>

      <div class="row form-content">

        <Form class='col-md-6 mb-6'>
          inputs
        </Form>
        
        <div class="col-md-6 mb-6 text-center">
          <FiguresInformation formula='S=a²' imageName='square.jpg'></FiguresInformation>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
import TitleMessage from '@/components/Figures/TitleMessage'
import FiguresInformation from '@/components/Figures/FiguresInformation'

export default {
  name: 'Square',
  components: {
    TitleMessage,
    FiguresInformation,
  }
}
</script>

<style>

</style>
