     //console.log(localStorage.getItem('key'));


    let score = JSON.parse(localStorage.getItem('key')) || {
      win:  0,
      lose: 0,
      tie:  0

      };

      updateScoreElement();
     
      
    
    /*if(!score) { 
      score ={
      win:  0,
      lose: 0,
      tie:  0

      };
    }*/
    


   

    function computerChose() {
      let computerMove = '';

      const RandomNumber = Math.random();

      if (RandomNumber >= 0 && RandomNumber < 1 / 3) {
        computerMove = 'rock';
      } else if (RandomNumber >= 1 / 3 && RandomNumber < 2 / 3) {
        computerMove = 'paper';

      } else if (RandomNumber >= 2 / 3 && RandomNumber < 1) {
        computerMove = 'scissors';
      }


      return computerMove;
    }

    let isAutoplaying = false;
    let intervalId;
    function autoplay(){

          if(!isAutoplaying){
         intervalId = setInterval(function() {
            const playerMove = computerChose();
          check(playerMove);
          },1000);

          isAutoplaying = true;

        }else {
          clearInterval(intervalId);
          isAutoplaying = false;
        }
        
    }

    document.querySelector('.js-rock-button')
    .addEventListener('click',() => {
      check('rock');
    });

    //so here we are not passing check('rock) 
    //directly becouse it will result into undefined 
    //value and event listener does not expect a 
    //undefined value
    document.querySelector('.js-paper-button')
    .addEventListener('click',() => {
      check('paper');
    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click',() => {
      check('scissors');
    });


    document.body.addEventListener('keydown', (event)=> {
      if(event.key === 'r'){
        check('rock');
      }else if(event.key === 'p'){
        check('paper');
      }else if(event.key === 's'){
        check('scissors');
      }

    })

    function check(playermove) {

      const computerMove = computerChose();

      let result = '';

      if(playermove === 'rock'){
          if (computerMove === 'rock') {
            result = 'Tie';
          } else if (computerMove === 'paper') {
            result = 'You Lose';
          } else if (computerMove === 'scissors') {
            result = 'You Win';
          }

     } else if(playermove === 'paper'){
        if(computerMove === 'rock'){
        result = 'You Win';
        }else if(computerMove === 'paper'){
        result = 'Tie';
        }else if(computerMove === 'scissors'){
        result = 'You Lose';
        }

     } else if(playermove === 'scissors'){
        if(computerMove === 'rock'){
      result = 'You Lose';
      }else if(computerMove === 'paper'){
      result = 'You Win';
      }else if(computerMove === 'scissors'){
      result = 'Tie';
    }

  }

    if(result ==='You Win'){
      score.win += 1;
    } else if(result ==='You Lose'){
      score.lose++;
    }else if(result === 'Tie'){
      score.tie++;
    }

     
      localStorage.setItem('key', JSON.stringify(score));
 
       updateScoreElement();

        document.querySelector('.js-result')
        .innerHTML = result;

        document.querySelector('.js-moves')
        .innerHTML = `You
    <img src="RPS/${playermove}-emoji.png" class="move-icon">
    <img src="RPS/${computerMove}-emoji.png" class="move-icon">
    Computer;` 
     }
    

    function updateScoreElement(){
      document.querySelector('.js-score')
       .innerHTML = `Wins: ${score.win}, losses: ${score.lose},  ties ${score.tie}`;
     }