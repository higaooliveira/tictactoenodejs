window.onload = () => {
    new TictacToe();
}

class TictacToe{

    constructor(){
        this.initElements();
        this.initState();
    }
    
    initState(){
        this.turn = true;
        this.plays = [0,0,0,0,0,0,0,0,0];
        this.end = false;
        this.winPosition = [448, 56, 7, 292, 146, 73, 273, 84];

        /* *
         * The values of the winPosition array correspond to the conversion
         * of binary numbers from win positions to decimal numbers. 
         * Being: 448 - first vertical, 56 - second vertical, 7 - third vertical
         * 292 - first horizontal, 146 - second horizontal, 73 - third horizontal,
         * 273 and 84 are diagonals   
         * */
    }

    initElements(){
        this.playerX = document.querySelector('#player-x');
        this.playerO = document.querySelector('#player-o'); 

        this.saveLocal = document.querySelector("#save-local");
        this.saveLocal.addEventListener('click', this.saveGame.bind(this));

        this.loadLocal = document.querySelector("#load-local");
        this.loadLocal.addEventListener('click', this.loadGame.bind(this));

        this.deleteLocal = document.querySelector('#delete-local');
        this.deleteLocal.addEventListener('click', this.deleteGame.bind(this));

        this.save = document.querySelector('#save');
        this.save.addEventListener('click', this.sendToServer.bind(this));

        
        this.velha  = document.querySelector('#velha');
        this.velha.addEventListener('click',(event)=>{
            this.makeMove(event);
            this.render();
        });
    }

    saveGame(){
        const data = {
            playerX : this.playerX.value,
            playerO : this.playerO.value,
            plays: this.plays,
        }

        localStorage.setItem('tictactoe',JSON.stringify(data));
    }

    loadGame(){
        const data = JSON.parse(localStorage.getItem('tictactoe'));
        this.playerX.value = data.playerX;
        this.playerO.value = data.playerO;
        this.plays = data.plays;
        this.render();
    }

    deleteGame(){
        localStorage.removeItem('tictactoe');
        this.playerX.value = '';
        this.playerO.value = '';
        this.initState();
        this.render();
    }

    makeMove(event){
        const id = event.target.dataset.id;
        if (this.end) {
            this.modal('Partida Terminada !');
            return;
        }

        if(!event.target.dataset.id){
            this.modal('Você precisa clicar em uma casa');
            return;
        }

        if(this.plays[id] != 0 ){
            this.modal("Essa posição já está preenchida");

            return;
        }

        this.plays[id] = this.turn ? 'X': 'O';
        this.turn = !this.turn;
    }

    render (){
        const result = this.verifyWinner();

        if (result == 'X' || result == 'O') {
            this.end = true;
            this.save.style.display = "block";
            this.modal(`O jogador ${result} venceu !`);
        }else{
            this.save.style.display = "none";
        }

        const squareElements = document.querySelectorAll('[data-id]');
        
        for(let i = 0; i < squareElements.length; i++){
            squareElements[i].innerHTML = this.plays[i] == 0 ? "" : this.plays[i];
        }
    }

    verifyWinner(){
        const playX = parseInt(this.plays.map(play => play == 'X' ? 1 : 0).join(''), 2);
        const playO = parseInt(this.plays.map(play => play == 'O' ? 1 : 0).join(''), 2);

        for (const element of this.winPosition) {
            if((element & playX) == element){
                return 'X';
            }
            if((element & playO)== element){
                return 'O';
            }
        }

        return '';
    }

    modal(string){
        const modais = document.querySelector('#modais');
        const modal = document.createElement('div');
        modal.innerHTML = string;
        modal.classList.add('modalClass');

        modais.appendChild(modal);
        setTimeout(()=>{
            modal.classList.add('hide');
            setTimeout(()=>{
                modais.removeChild(modal);
            }, 1000);
            
        }, 2000);
    }

    sendToServer(){
        const playerX = this.playerX.value;
        const playerO = this.playerO.value;

        var node = document.getElementById('my-node');

        domtoimage.toPng(this.velha,{width: '400', height: '400'})
        .then((dataUrl)=> {
          
            return axios.post('/save', {
                playerX, playerO, plays: JSON.stringify(this.plays),
                img: dataUrl
            })

        })
        .then((response) => {
            this.modal("Envio com Sucesso");
        })
        .catch((error) => {
            this.modal('Oops, algo deu errado!');
        });

    }
}