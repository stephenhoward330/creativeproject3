let app = new Vue({
    el: '#app',
    data: {
        deck1: {
            remaining: '',
            deck_id: '',
            cards: {},
        },
        deck2: {
            remaining: '',
            deck_id: '',
            cards: {},
        },
        card: {},
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
                this.deck1.remaining = response.remaining;
                this.deck1.deck_id = response.deck_id;

                const response2 = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                this.deck2.remaining = response2.remaining;
                this.deck2.deck_id = response2.deck_id;
                this.loading = false;
            }
            catch (error) {
                console.log(error);
            }
            this.drawAllCards();
        },
        async drawAllCards() {
            for (let i = 0; i < 52; i++) {
                let response = await axios.get('https://deckofcardsapi.com/api/deck/' + this.deck1.deck_id + '/draw/?count=1');
                Vue.set(app.deck1.cards, i, new Array);
                this.deck1.cards[i].push({
                    value: response.cards.value,
                    image: response.cards.image,
                });
                if (this.deck1.cards[i].value == 'KING') this.deck1.cards[i].value = 13;
                if (this.deck1.cards[i].value == 'QUEEN') this.deck1.cards[i].value = 12;
                if (this.deck1.cards[i].value == 'JACK') this.deck1.cards[i].value = 11;
                if (this.deck1.cards[i].value == 'ACE') this.deck1.cards[i].value = 1;
                console.log(this.deck1);
            }
        },
        // previousComic() {
        //     this.number = this.current.num - 1;
        //     if (this.number < 1)
        //         this.number = 1;
        // },
        // nextComic() {
        //     this.number = this.current.num + 1;
        //     if (this.number > this.max)
        //         this.number = this.max
        // },
        // getRandom(min, max) {
        //     min = Math.ceil(min);
        //     max = Math.floor(max);
        //     return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
        // },
        // randomComic() {
        //     this.number = this.getRandom(1, this.max);
        // },
        // firstComic() {
        //     this.number = 1;
        // },
        // lastComic() {
        //     this.number = this.max;
        // },
        // setRating(rating) {
        //     if (!(this.number in this.ratings))
        //         Vue.set(this.ratings, this.number, {
        //             sum: 0,
        //             total: 0
        //         });
        //     this.ratings[this.number].sum += rating;
        //     this.ratings[this.number].total += 1;
        // }
    }
});


// Vue.component('star-rating', VueStarRating.default);

// let app = new Vue({
//     el: '#app',
//     data: {
//         number: '',
//         max: '',
//         current: {
//             title: '',
//             img: '',
//             alt: ''
//         },
//         loading: true,
//         addedName: '',
//         addedComment: '',
//         comments: {},
//         ratings: {},
//     },
//     created() {
//         this.xkcd();
//     },
//     computed: {
//         month() {
//             var month = new Array;
//             if (this.current.month === undefined)
//                 return '';
//             month[0] = "January";
//             month[1] = "February";
//             month[2] = "March";
//             month[3] = "April";
//             month[4] = "May";
//             month[5] = "June";
//             month[6] = "July";
//             month[7] = "August";
//             month[8] = "September";
//             month[9] = "October";
//             month[10] = "November";
//             month[11] = "December";
//             return month[this.current.month - 1];
//         },
//         rating() {
//             if (this.ratings[this.number] === undefined) return 0;
//             return (this.ratings[this.number].sum / this.ratings[this.number].total).toFixed(1);
//         }
//     },
//     watch: {
//         number(value, oldvalue) {
//             if (oldvalue === '') {
//                 this.max = value;
//             }
//             else {
//                 this.xkcd();
//             }
//         },
//     },
//     methods: {
//         async xkcd() {
//             try {
//                 this.loading = true;
//                 const response = await axios.get('https://xkcdapi.now.sh/' + this.number);
//                 this.current = response.data;
//                 this.loading = false;
//                 this.number = response.data.num;
//             }
//             catch (error) {
//                 console.log(error);
//             }
//         },
//         previousComic() {
//             this.number = this.current.num - 1;
//             if (this.number < 1)
//                 this.number = 1;
//         },
//         nextComic() {
//             this.number = this.current.num + 1;
//             if (this.number > this.max)
//                 this.number = this.max
//         },
//         getRandom(min, max) {
//             min = Math.ceil(min);
//             max = Math.floor(max);
//             return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
//         },
//         randomComic() {
//             this.number = this.getRandom(1, this.max);
//         },
//         addComment() {
//             if (!(this.number in this.comments))
//                 Vue.set(app.comments, this.number, new Array);
//             this.comments[this.number].push({
//                 author: this.addedName,
//                 text: this.addedComment,
//                 time: moment().format('MMMM Do YYYY, h:mm a')
//             });
//             this.addedName = '';
//             this.addedComment = '';
//         },
//         firstComic() {
//             this.number = 1;
//         },
//         lastComic() {
//             this.number = this.max;
//         },
//         setRating(rating) {
//             if (!(this.number in this.ratings))
//                 Vue.set(this.ratings, this.number, {
//                     sum: 0,
//                     total: 0
//                 });
//             this.ratings[this.number].sum += rating;
//             this.ratings[this.number].total += 1;
//         }
//     }
// });
