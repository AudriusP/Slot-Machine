const zeroTransitionDuration = '0s';
const slowTransitionDuration = '0.25s';
const mediumTransitionDuration = '0.5s';
const fastTransitionDuration = '1s';
const chars = ['A', 'B', 'C'];
const info = document.getElementsByClassName('info').item(0);

function moveHandle() {
  const handleElements = [
    document.getElementsByClassName('circle').item(0),
    document.getElementsByClassName('handle').item(0)
  ];

  info.innerHTML = 'Please click on handle knob to try your luck!';

  handleElements.forEach(function(element) {
    element.classList.add('clicked');
  });

  setTimeout(function(){
    handleElements.forEach(function(element) {
      element.style.transitionDuration = slowTransitionDuration;
      element.classList.remove('clicked');
    });
    setTimeout(function() {
      mixSlots();

      handleElements.forEach(function(element) {
        element.style.transitionDuration = fastTransitionDuration;
      });
    }, 250);
  }, 1500);
}

function mixSlots() {
  const slots = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3')
  ];

  slots.forEach(function (slot) {
    slot.classList.add('bottom');
    setTimeout(function() {
      moveToTop(slot);
    }, 250);

    for(var i = 1; i < 5; i++) {
      setTimeout(function() {
        slot.innerHTML = chars[Math.floor(Math.random() * chars.length)];
        moveToBottom(slot);
      }, i * 500);

      if(i === 4) {
        setTimeout(function() {
          moveToCenter(slot);
          if(slots[0].innerHTML === slots[1].innerHTML &&
             slots[1].innerHTML === slots[2].innerHTML) {
            info.innerHTML = 'Congrats!';
          }
        }, 2500);
      }
    }
  });
}

function moveToTop(element) {
  element.style.transitionDuration = zeroTransitionDuration;
  element.classList.remove('bottom');
  element.classList.add('top');
}

function moveToBottom(element) {
  element.style.transitionDuration = mediumTransitionDuration;
  element.classList.remove('top');
  element.classList.add('bottom');
  setTimeout(function() { moveToTop(element) }, 450 );
}

function moveToCenter(element) {
  element.style.transitionDuration = slowTransitionDuration;
  element.classList.remove('bottom');
  element.classList.remove('top');
}
