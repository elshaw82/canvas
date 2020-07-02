const canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// //rectangle
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(255, 0, 0, 0.7)";
// c.fillRect(300, 200, 400, 100);

// //line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

// //arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'green';
// c.stroke();

// for(var i = 0; i < 20; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'yellow';
//     c.stroke();  
// }

// //arc / circle
// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'green';
// c.stroke();

var randomColours = [
    'rgb(42,156,143)', 
    'rgb(225,286,182)', 
    'rgb(244,162,97)', 
    'rgb(231,111,81)', 
    'rgb(38,69,83)' 
];

var  mouse =  {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove', function(event) {
mouse.x = event.x;
mouse.y = event.y;
});

window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
});

var maxRadius = 40;

function Circle(x, y , dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colour = randomColours[Math.floor(Math.random() * randomColours.length)];
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }
    this.update = function() {
        if(this.x + this.radius > innerWidth 
            || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
      this.x += this.dx;
      this.y += this.dy;

      //interactivity 
      if(mouse.x - this.x < 60 && mouse.x - this.x > -50
        && mouse.y - this.y < 60 && mouse.y - this.y > -50
        ) {
           if(this.radius < maxRadius) {
        this.radius += 1;
      } 
    }else if (this.radius > this.minRadius) {
          this.radius -= 1;

      }
      this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for(var i = 0; i < 300; i++){
        var radius = Math.random() * 10 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 0.5;
        var dy = (Math.random() - 0.5) * 0.5;
        circleArray.push(new Circle(x, y, dx, dy, radius));   
    }
}

function animate() {
 requestAnimationFrame(animate);  
    c.clearRect(0, 0, innerWidth, innerHeight);
        for(var i = 0; i < circleArray.length; i++){
             circleArray[i].update();
        }
}
init();
animate();