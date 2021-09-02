let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.9;
let context = canvas.getContext("2d");


class Circle {
    constructor(x, y, radius, weight) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.finished = false;
    }

    update() {
        this.y = this.y + this.weight;

        if (this.y > canvas.height) {
            this.y = 0;
            
            let random = parseInt((Math.random() * canvas.width) + 1);
            this.x = random;
            this.finished = true;
        }
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.stroke();
        context.closePath();
    }
}

class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width/2;
        this.y = canvas.height - this.height;
        this.speed = 50;
    }

    update(direction) {
        console.log(direction)


        if (direction == "ArrowUp") {
            this.y -= this.speed;
        }

        else if (direction == 'ArrowDown') {
            this.y += this.speed;
        }
    
        else if (direction == 'ArrowRight') {
            this.x += this.speed;
        }
    
        else if (direction == "ArrowLeft") {
            this.x -= this.speed;
        }

        if (this.x < 0) {
            this.x = canvas.width - this.width;
        }

        else if (this.x > canvas.width) {
            this.x = 0
        }

        else if (this.y < 0) {
            this.y = canvas.height;
        }

        else if (this.y > canvas.height) {
            this.y = 0;
        }
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // creating the first circle and insert it in the array
    if (group.length <= 0) {
        let radius =  parseInt((Math.random() * 50) + 20) 
        let weight = parseInt((Math.random() * 10) + 1)
        let x =  Math.max(Math.min(parseInt((Math.random() * canvas.width) + (radius * 2)), canvas.width - (radius * 2)), (radius * 2))
        let y = 0
        circle = new Circle(x, y, radius, weight)
        group.push(circle)
    }

    // group = [circle, circle]
    // index = 0
    // loop through the group array and draw all the circles
    for(let i = 0; i < group.length; i++) {
        group[i].update();
        group[i].draw();

        // adding circles after one circle got at the end of the canvas height
        if (group[i].finished && group.length <= 10) {
            let radius =  parseInt((Math.random() * 50) + 20)
            let weight = parseInt((Math.random() * 5) + 1)
            let x = Math.max(Math.min(parseInt((Math.random() * canvas.width) + (radius * 2)), canvas.width - (radius * 2)), (radius * 2))
            let y = 0
            circle = new Circle(x, y, radius, weight)
            group.push(circle)
            group[i].finished = false;
        }
    }

    player.draw();

    requestAnimationFrame(animate);
}

const player = new Player();
let group = [];
let circleNum = 0;
animate();

document.addEventListener('keydown', key_event_listeners)

function key_event_listeners(event) {
    player.update(event.key);
}