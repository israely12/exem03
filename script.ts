// document.addEventListener("DOMContentLoaded", function () {
   
    
//   });
   


interface PlayerSend {
    position:string;
    twoPercent:number;
    threePercent:number;
    points:number;
}

interface PlayerResponse {

    position:string;
    twoPercent:number;
    threePercent:number;
    points:number;
    playerName: string;
}

const BASE_URL: string = "https://nbaserver-q21u.onrender.com/api/filter/";

const FORM = document.getElementById("form") as HTMLFormElement;

FORM.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!FORM.checkValidity()) {
        alert('Please fill out all required fields.');
        return;
    }

    const SEND_REQUEST: PlayerSend = {
        // position: (FORM.elements.namedItem('select') as HTMLSelectElement).value,
        position: "PG",
        twoPercent: 4,
        // twoPercent: + ((FORM.elements.namedItem('towpercent') as HTMLInputElement).value),
        threePercent: 30,
        // threePercent: + ((FORM.elements.namedItem('threepercent') as HTMLInputElement).value),
        points: 10000
        // points: + ((FORM.elements.namedItem('points') as HTMLInputElement).value),
       
    };

  const test =   await getPlayers(SEND_REQUEST);
  console.log("testttt", test);
  
});

async function getPlayers(sendRequest: PlayerSend): Promise<void> {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(sendRequest)
        });

        if (!response.ok) {
            throw new Error("Failed to send player");
        }
        console.log(response);
        const players: PlayerResponse[] = await response.json();
       
        renderPlayers(players);
       
    } catch (error) {
        console.error('Server is unavailable.', error);
    } 
}

function renderPlayers(players: PlayerResponse[]): void {
    const playersTable = document.getElementById('tbody') as HTMLTableElement;
    playersTable.innerHTML = ''; 

    players.forEach(player => {
        const playerForACtion:PlayerResponse ={
            position: player.position,
            twoPercent:player.twoPercent,
            threePercent:player.threePercent,
            points:player.points,
            playerName: player.playerName,
        }
        const newRow = document.createElement('tr');

        const playerField = document.createElement('td');
        playerField.className = "td";
        playerField.textContent = player.playerName;

        const positionField = document.createElement('td');
        positionField.className = "td";
        positionField.textContent = player.position;

        const pointsField = document.createElement('td');
        pointsField.className = "td";
        pointsField.textContent = player.points.toString();

        const fgField = document.createElement('td');
        fgField.className = "td";
        fgField.textContent = player.twoPercent.toString();

        const threeField = document.createElement('td');
        threeField.className = "td";
        threeField.textContent = player.threePercent.toString();

        const acField = document.createElement('td');
        acField.className = "td";

        const addButton = document.createElement('button') as HTMLButtonElement;
        addButton.className = 'actButton';
        addButton.innerText = `Add ${player.playerName} to Current Team`;
        addButton.addEventListener('click', () => addPlayerToDiv(playerForACtion));

        acField.appendChild(addButton);
        newRow.append(playerField, positionField, pointsField, fgField, threeField, acField);
        playersTable.appendChild(newRow);
    });
}

function addPlayerToDiv(player:PlayerResponse ){
    
    if(player){
    let currentPosition:string = player.position;
  
    
    const currentDiv = document.getElementById(currentPosition);
   
    const para = document.createElement('p') as HTMLParagraphElement;
    
    para.innerHTML =   `
    <p>${player.playerName}</p>
    <p>${"Three Percent:" + " " + player.threePercent}</p>
    <p>${"Two Percent:" + " " + player.twoPercent }</p>
    <p>${"Points:" + " " + player.points}</p>
    `;
    // `
    // <p>${player.playerName}</p>
    // <p>${player.threePercent}</p>
    // <p>${player.twoPercent }</p>
    // <p>${player.points}</p>
    // `;
    currentDiv?.innerText = '';
    currentDiv.appendChild(para);
  
    
   
    }
}





