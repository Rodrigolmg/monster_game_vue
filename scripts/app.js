new Vue({
    el: '#app',
    data:{
        playerLife: 100,
        monsterLife: 100,
        running: false,
        especialDisabled: false,
        healDisabled: true,
        logs: []
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        },

        colorLabelResult(){
            return this.monsterLife == 0 ? "win" : "lose"
        },

        isPlayerWinner(){
            return this.playerLife > this.monsterLife
        },

        hasLog() {
            return this.logs.length > 0
        }
    },
    methods:{
        startGame(){
            this.running = true
            this.playerLife  = 100
            this.monsterLife = 100
            this.logs = []
        },

        async attacking(especial){

            if(especial){
                this.especialDisabled = true;
                setInterval(() => {
                    this.especialDisabled = false
                }, 5000)
            }
            
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            
            if(this.monsterLife > 0){
                this.healDisabled = false;
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }

        },

        hurt(carac, min, max, especial, source, target, clazz){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[carac] = Math.max(this[carac] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, clazz)
        },

        async healAndHurt(){
            this.heal(10, 15)

            this.healDisabled = true;
            setInterval(() => { this.healDisabled = false }, 8000)

            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },

        heal(min, max){
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
        },

        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },

        registerLog(text, clazz){
            this.logs.unshift({text, clazz})
        }
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }
})