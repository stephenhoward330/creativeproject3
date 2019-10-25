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
    },
    created() {
        this.startDecks();
    },
    computed: {

    },
    watch: {

    },
    methods: {
        async startDecks() {
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
            if (this.deck1.cards[0].value > this.deck2.cards[0].value) {
                console.log("deck 1 is higher");
                this.deck1.cards.push(this.deck1.cards[0]);
                this.deck1.remaining += 1;
            }
            else if (this.deck2.cards[0].value > this.deck1.cards[0].value) {
                console.log("deck 2 is higher");
                this.deck2.cards.push(this.deck2.cards[0]);
                this.deck2.remaining += 1;
            }
            else console.log("they're equal");
            if (this.deck1.remaining == 1 && this.deck2.remaining == 1) {
                console.log("TIE");
                document.getElementById("app").innerHTML = "<h2> GAME OVER: TIE <h2/>";
            }
            else if (this.deck1.remaining == 1) {
                console.log("Deck 2 wins!");
                document.getElementById("app").innerHTML = "<h2> GAME OVER: Deck 2 wins! <h2/>";
            }
            else if (this.deck2.remaining == 1) {
                console.log("Deck 1 wins!");
                document.getElementById("app").innerHTML = "<h2> GAME OVER: Deck 1 wins! <h2/>";
            }
            else {
                this.deck1.cards.splice(0, 1);
                this.deck1.remaining--;
                this.deck2.cards.splice(0, 1);
                this.deck2.remaining--;
            }
        },
    }
});
