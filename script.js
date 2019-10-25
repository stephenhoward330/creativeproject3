let app = new Vue({
    el: '#app',
    data: {
        deck1: {
            remaining: '',
            deck_id: '',
            cards: [],
        },
        deck2: {
            remaining: '',
            deck_id: '',
            cards: [],
        },
        // card: {},
        loading: true,
        beginning: true,
        onewin: false,
        twowin: false,
        tie: false,
        gameover: false,
        finalonewin: false,
        finaltwowin: false,
        finaltie: false,
    },
    created() {

    },
    computed: {

    },
    watch: {

    },
    methods: {
        async startDecks() {
            this.beginning = false;
            this.gameover = false;
            this.finalonewin = false;
            this.finaltwowin = false;
            this.finaltie = false;
            this.onewin = false;
            this.twowin = false;
            this.tie = false;
            while (this.deck1.cards.length > 0) {
                this.deck1.cards.splice(0, 1);
            }
            while (this.deck2.cards.length > 0) {
                this.deck2.cards.splice(0, 1);
            }
            try {
                this.loading = true;
                const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                this.deck1.remaining = response.data.remaining;
                this.deck1.deck_id = response.data.deck_id;

                const response2 = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                this.deck2.remaining = response2.data.remaining;
                this.deck2.deck_id = response2.data.deck_id;
            }
            catch (error) {
                console.log(error);
            }
            let response = await axios.get('https://deckofcardsapi.com/api/deck/' + this.deck1.deck_id + '/draw/?count=52');
            for (let i = 0; i < 52; i++) {
                //Vue.set(app.deck1.cards, i, new Array);
                let newVal = '';
                if (response.data.cards[i].value == 'KING') newVal = 13;
                else if (response.data.cards[i].value == 'QUEEN') newVal = 12;
                else if (response.data.cards[i].value == 'JACK') newVal = 11;
                else if (response.data.cards[i].value == '10' || response.data.cards[i].value == 10) newVal = 10;
                else if (response.data.cards[i].value == 'ACE') newVal = 1;
                else newVal = response.data.cards[i].value;
                this.deck1.cards.push({
                    value: newVal,
                    image: response.data.cards[i].image,
                });
            }
            response = await axios.get('https://deckofcardsapi.com/api/deck/' + this.deck2.deck_id + '/draw/?count=52');
            for (let i = 0; i < 52; i++) {
                //Vue.set(app.deck2.cards, i, new Array);
                let newVal = '';
                if (response.data.cards[i].value == 'KING') newVal = 13;
                else if (response.data.cards[i].value == 'QUEEN') newVal = 12;
                else if (response.data.cards[i].value == 'JACK') newVal = 11;
                else if (response.data.cards[i].value == '10' || response.data.cards[i].value == 10) newVal = 10;
                else if (response.data.cards[i].value == 'ACE') newVal = 1;
                else newVal = response.data.cards[i].value;
                this.deck2.cards.push({
                    value: newVal,
                    image: response.data.cards[i].image,
                });
            }
            this.loading = false;
        },
        fight() {
            console.log("value 1: " + this.deck1.cards[0].value + " value 2: " + this.deck2.cards[0].value);
            if (this.deck1.cards[0].value > this.deck2.cards[0].value) {
                console.log("deck 1 is higher");
                this.deck1.cards.push(this.deck1.cards[0]);
                this.deck1.remaining += 1;
                this.onewin = true;
                this.twowin = false;
                this.tie = false;
            }
            else if (this.deck2.cards[0].value > this.deck1.cards[0].value) {
                console.log("deck 2 is higher");
                this.deck2.cards.push(this.deck2.cards[0]);
                this.deck2.remaining += 1;
                this.onewin = false;
                this.twowin = true;
                this.tie = false;
            }
            else {
                console.log("they're equal");
                this.onewin = false;
                this.twowin = false;
                this.tie = true;
            }

            if (this.deck1.remaining == 1 && this.deck2.remaining == 1) {
                console.log("TIE");
                this.gameover = true;
                this.finaltie = true;
                // let html = "<h2> GAME OVER: TIE! <h2/>";
                // document.getElementById("end").innerHTML = html;
            }
            else if (this.deck1.remaining == 1) {
                console.log("Deck 2 wins!");
                this.gameover = true;
                this.finaltwowin = true;
                // let html = "<h2> GAME OVER: Deck 2 wins! <h2/>";
                // document.getElementById("end").innerHTML = html;
            }
            else if (this.deck2.remaining == 1) {
                console.log("Deck 1 wins!");
                this.gameover = true;
                this.finalonewin = true;
                // let html = "<h2> GAME OVER: Deck 1 wins! <h2/>";
                // document.getElementById("end").innerHTML = html;
            }
            else {
                this.deck1.cards.splice(0, 1);
                this.deck1.remaining--;
                this.deck2.cards.splice(0, 1);
                this.deck2.remaining--;
            }
        },
        fightTen() {
            for (let i = 0; i < 10; i++) {
                if (!this.gameover) {
                    this.fight();
                }
            }
        },
    }
});
