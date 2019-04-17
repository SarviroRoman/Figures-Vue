const express = require ('express');
const app = express();
const cors = require ('cors');

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let figures = [
  {
    id: 1,
    type: 'Circle',
    area: 314.1593,
    data: {
      radius: 10
    },
  },

  {
    id: 2,
    type: 'Square',
    area: 100,
    data: {
      length: 10
    },
  },

  {
    id: 3,
    type: 'Rectangle',
    area: 100,
    data: {
      x1: 10,
      y1: 10,
      x2: 20,
      y2: 20,
    },
  },

  {
    id: 4,
    type: 'Triangle',
    area: 6,
    data: {
      length1: 3,
      length2: 4,
      length3: 5,
    },
  },

];

app.get('/figures', (request, response) => {
  setTimeout( () =>{
    // response.status(200);
    response.send(figures);
  }, 500);
});

app.delete('/figures', (request, response) => {
  const {id} = request.query;
  figures = figures.filter(figures => figures.id !== Number(id));
  setTimeout( () =>{
    response.send({success: true});
  }, 500);

});

app.post('/figures', (request, response) => {
  const {type, area} = request.body;
  let newId = 1;

  if (figures[figures.length-1] !== undefined){
    newId = figures[figures.length-1].id + 1;
  } 

  figures.push({
    id: newId,
    type,
    area
  });

  setTimeout( () =>{
    response.send({success: true, id: newId});
  }, 500);

});

app.patch('/figures', (request, response) => {
  const {id, type, area} = request.query;
  let findFigure = figures.find(figures => figures.id === Number(id));
  findFigure.type = type || findFigure.type;
  findFigure.area = area || findFigure.area;
  figures = figures.filter(figures => figures.id !== Number(id));
  figures.push(findFigure);
  response.send(figures);
});

app.listen(7000, () => { 
  console.log('Application works on the port 7000'); 
  });
