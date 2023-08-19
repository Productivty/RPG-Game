import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]
let wizardsArray = ["hero", "thor", "hulk"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function getNewWizard() {
    const nextWizardData = characterData[wizardsArray.shift()]
    return nextWizardData ? new Character(nextWizardData) : {}
}

function attack() {
    if(!isWaiting){
        goodess.setDiceHtml()
        monster.setDiceHtml()
        goodess.takeDamage(monster.currentDiceScore)
        monster.takeDamage(goodess.currentDiceScore)
        render()
        
        if(goodess.dead){
            isWaiting = true
            if(wizardsArray.length > 0){
                setTimeout(() => {
                    goodess = getNewWizard()
                    render()
                    isWaiting = false
                },1500)
            }
            else {
                endGame()
            }
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }
}

function endGame() {
    isWaiting = true
    const endMessage = goodess.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        goodess.health > 0 ? "The Wizard Wins" :
            "The Monters are Victorious"

    const endEmoji = goodess.health > 0 ? "🔮" : "☠️"
    setTimeout(() => {
        document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2> 
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>
        `
    }, 1500)

}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = goodess.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

let goodess = getNewWizard()
let monster = getNewMonster()

render()
