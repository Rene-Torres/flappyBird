var canvas =document.getElementById('mainGame');
var ctx = canvas.getContext('2d');

//ctx.fillRect(0,0,canvas.width,canvas.height);
//todas las cosas en la pantalla son un objeto

//clases
        function Board(){
          this.x = 0;
          this.y = 0;
          this.width =canvas.width;
          this.height=canvas.height;
          this.img = new Image ();
          this.img.src = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png";
          this.score = 0;
          this.music = new Audio();
          this.music.src = "assets/audio.mp3";
          //metodo principal de cualquier clase es el metodo draw
          this.draw = function(){
            this.move();
            ctx.drawImage(this.img, this.x,this.y,this.width,this.height);
            //segunda imagen, la x de la primer imagen mas el ancho del canvas para que aparezca detras de la primer imagen
            ctx.drawImage(this.img, this.x + canvas.width, this.y,this.width,this.height);
  //cambiar el estilo del texto
          ctx.font = "50px Avenir";
          ctx.fillStyle = "peru";
          ctx.fillText(this.score,this.width/2, this.y+50);

  }
    //dibuja imagen, origen de imagen (x,y), ancho de imagen(ancho del canvas)
    //se usa el this para no tener que cambiar cada propiedad por separado
    //si una funcion tiene dos puntos requiere bind() porque esta en el siguiente nivel de la funcion
    //si se trabaja en otro nivel se requiere el bind()
          this.img.onload = function(){
      //llama la funcion this.draw() una vez que la imagen carga(por peso)
          this.draw();
          }.bind(this)
//para mover el fondo, se usan dos imagenes una reemplaza a la otra una vez que se a desplazado
          this.move = function(){
            this.x --;
            if(this.x < -canvas.width) this.x = 0;
          }
  
}
//creando la segunda clase--- Flappy
          function Flappy(){
            this.x = 150;
            this.y = 150;
            this.width =50;
            this.height=50;
            this.img = new Image();
            this.img.src = "https://lh3.googleusercontent.com/k6c5BYhnp-C9e3tROiI9twKZp6bYKLPtR06V4jZ8KnsrkpDTMAF4duTtTTh0eq4uIPSiYfzw-_68ELOn_71c7g=s400";
            this.img.onload = function(){
              this.draw();
            }.bind(this);
            this.draw = function(){
              //gravedad para flappy
              this.y += .4;
            ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
            };
            this.move = function(){
              this.y -=60;} 
          }
//TERCER CLASE   CLASE PIPE UNO OBJETO DE UNA CLASE

          function Pipe(y, height){
            this.x = canvas.width - 10;// para poder verlas 
            this.y = y;
            this.width = 50;
            this.height = height;
            this.draw = function(){
              this.x --;
              ctx.fillStyle="green";
              ctx.fillRect(this.x,this.y,this.width,this.height);
            }
          }
          

//declaraciones
//Es un objeto que hace referencia a la clase Board, va en minusculas para diferenciar que es objeto
          var board = new Board();
          var flappy = new Flappy();
//se crea para que sea global, y para usarlo adelante en las funciones
          var intervalo;
//cuantas veces se esta ejecutando
          var frames=100;
//Arreglo Para guardar los pipes
var pipes = [];


// Funciones Auxiliares  Aux functions

function generatePipes(){
  if(!(frames % 400 === 0))return;
  var ventanita = 100;
  var randomHeight = Math.floor(Math.random()* 200)+50;
var pipe = new Pipe(0, randomHeight);
var pipe2 = new Pipe(randomHeight + ventanita, canvas.height-(randomHeight+ventanita));
pipes.push(pipe);
pipes.push(pipe2);

}

function drawPipes(){
  pipes.forEach(function(pipe){
    pipe.draw();
  })
}





//main functions
//update es la unica funcion encargada del movimiento

//principal tarea de update será dibujar las cosas
function update(){
          generatePipes()
          frames++;
          console.log(frames);
          //para crear el efecto de animacion borra y dibuja repetidamente, con clearRect se realiza el ciclo borrar dibujar, recomendado borrar todo el canvas con (0,0)
          ctx.clearRect(0,0, canvas.width, canvas.height);
          //llama a board para que se dibuje solo
          board.draw();
          flappy.draw();
          drawPipes();

}

//en star se pueden poner las funciones stop y reset para escribir menos codigo, o las funciones pueden ir por separado
//requiere un intervalo para llamar a update
//al presionar el boton star el ciclo comienza, ejecuta update

function start(){
  board.music.play();
  //si ya esta corriendo el boton, se agrega un if para que no se active de nuevo
  //if()return
  //se pueden colocar aqui extras que requieran inicializar
         if(intervalo > 0) return;
          intervalo = setInterval(function(){
            update();
          }, 1000/60);//fps a 60
        }

  function stop(){
    board.music.pause();
    clearInterval(intervalo);
    intervalo = 0;
  }        



//listeners (observadores);

        document.getElementById('startButton').addEventListener('click', start);

        document.getElementById('pauseButton').addEventListener('click', stop);

  addEventListener('keydown', function(e){
    if(e.keyCode ===32 ){
      flappy.move();
    }
  })



        // para mover flappy; se requiere un metodo para mover flappy y un listener para que detecte la tecla y se mueva