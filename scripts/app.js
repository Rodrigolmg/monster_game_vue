new Vue({
    el: '#app',
    data:{
        playerLife: 0,
        monsterLife: 100,
        titleWinnerColor: 'green',
        titleLoserColor: 'red',
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods:{},
    watch:{}
})