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
      console.log('There has been a problem with your fetch operation: ' + error.message);
      if (Math.random() > 0.5) {
        document.getElementById('test').innerHTML = 'Yes'
      } else {
        document.getElementById('test').innerHTML = 'No'
      }
    });
}

var x = (window.innerWidth / 2 - 175);
var stop = [];
var vx = 0;
var ax = 0;

if (window.DeviceMotionEvent != undefined) {

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
    document.getElementById('show').innerHTML = stop.length
    if (x > document.documentElement.clientWidth - 320) {
      x = document.documentElement.clientWidth - 320;
      vx = 0;
    }
    var stopper = stop.slice(stop.length - 200)
    var quoteOrNot = stopper.every((val, i, arr) => Math.floor(val * 100) == Math.floor(arr[0] * 100))
    var ultimate = stop.every((val, i, arr) => Math.floor(val * 100) == Math.floor(arr[0] * 100))
    if (ultimate == true) {
      document.getElementById('ball').onmouseleave = function() {

        document.getElementById('ball').classList.remove('animated')
        document.getElementById('window').style.opacity = 0.9;
        document.getElementById('test').style.display = 'block'
      }
      document.getElementById('ball').onmouseup = function() {
        getQuote();
        document.getElementById('ball').classList.add('animated')

        document.getElementById('window').style.opacity = 0.9;
        document.getElementById('test').style.display = 'block'
        document.getElementById('ball').classList.remove('animated');
      }
      document.getElementById('ball').onmouseenter = function() {
        getQuote();
        document.getElementById('ball').classList.add('animated')
        document.getElementById('window').style.opacity = 0.1;
        document.getElementById('test').innerHTML = ''
        document.getElementById('test').style.display = 'none';
      }
    }

    if (stop.length > 200 && quoteOrNot) {

      document.getElementById('window').style.opacity += 0.9
      if (ultimate == false) {
        //console.log(ultimate + 'ultimate')
        // console.log(stop.length)
        //console.log(stopper)
        getQuote();
        stop = [];
      }
    }
    ball.style.left = x + "px";
  }, 1);
}
