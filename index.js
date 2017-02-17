function getQuote() {
  fetch('https://ball-7d2f9.firebaseio.com/.json')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(response) {
      var id = '' + (Math.floor(Math.random() * response.length) + 1);

      fetch(`https://ball-7d2f9.firebaseio.com/${id}.json`)
        .then(function(answer) {
          if (answer.ok) {
            return answer.json();
          }

          throw new Error('Network response was not ok.');
        })
        .then(function(theAnswer) {
          document.getElementById('test').innerHTML = JSON.stringify(theAnswer).slice(1, theAnswer.length + 1);
        })
    })
    .catch(function(error) {

      if (Math.random() > 0.5) {
        document.getElementById('test').innerHTML = 'Yes'
      } else {
        document.getElementById('test').innerHTML = 'No'
      }
    });
}

function lightUp() {
  document.getElementById('ball').classList.remove('animated');
  document.getElementById('window').style.opacity = 0.9;
  document.getElementById('test').style.display = 'block'
}
//var x = (window.innerWidth / 2 - 175);
var x = 0;
var stop = [];
var vx = 0;
var ax = 0;

window.ondevicemotion = function(event) {
  ax = event.accelerationIncludingGravity.x * 5;
}
setInterval(function() {

  vx = vx + ax;
  stop.push(x);
  vx = vx * 0.98;
  x = parseInt(x + vx / 50);
  if (x < -30) {
    x = -30;
    vx = 0;
  }

  if (x > document.documentElement.clientWidth - 310) {
    x = document.documentElement.clientWidth - 310;
    vx = 0;
  }
  var stopper = stop.slice(stop.length - 200)
  var quoteOrNot = stopper.every((val, i, arr) => Math.floor(val * 100) == Math.floor(arr[0] * 100))
  var ultimate = stop.every((val, i, arr) => Math.floor(val * 100) == Math.floor(arr[0] * 100))

  if (ultimate == true) {
    document.getElementById('container').onmouseleave = function() {
      getQuote();
      lightUp()
    }

    document.getElementById('ball').onmouseup = function() {
      getQuote();
      lightUp();
    }

    document.getElementById('container').onmouseenter = function() {

      document.getElementById('ball').classList.add('animated')
      document.getElementById('window').style.opacity = 0.1;
      document.getElementById('test').innerHTML = ''
      document.getElementById('test').style.display = 'none';
    }
  }

  if (stop.length > 200 && quoteOrNot) {

    document.getElementById('window').style.opacity = 0.9
    if (ultimate == false) {
      getQuote();

      stop = [];
    }
  }
  ball.style.left = x + "px";
}, 1);
