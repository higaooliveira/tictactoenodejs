window.onload = () =>{

    new showGames();
}


class showGames{
    constructor(){
        this.divRender = document.querySelector("#render");
        axios
        .get('/all')
        .then(response=>{
            this.render(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render(data){
        data.forEach(element => {
            const players = `${element.playerX} vs ${element.playerO}`;
            this.divRender.innerHTML += this.renderCard(players, element.img);
        });


    }

    renderCard(players, img){
        return `
        <div class="col-md-3">
            <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                <div class="card-header">${players}</div>
                <div class="card-body">
                    <img src="${img}" style="width: 200px; height:200px">
                </div>
            </div>
        </div>
    `;
    }
}