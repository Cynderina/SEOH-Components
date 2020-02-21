

var sayHello = {
    created() {
        alert("New component created");
    }
}

var highlight = Vue.directive('highlight-on-change',{
    update: function(el, binding){
        prevColor = el.style.backgroundColor;
        el.style.backgroundColor = 'yellow';
        setTimeout(function(){
            el.style.backgroundColor='white';
        }, 1000)
    }
})

Vue.component('todo-header', {
    template: '<h1>My ToDo List</h1>'
})

Vue.component('todo-item', {
    props: ['todo'],
    mixins: [sayHello],
    template: '<li @click="markComplete" :class="{completed: todo.completed}">{{ todo.name }}</li>',
    methods: {
        markComplete : function () {
            this.todo.completed = ! this.todo.completed;
        }
    }
       
    
})


var app = new Vue({
    el: '#app',
    data: {
        title: 'Katri\'\s ToDo -list',
        message: 'Hello world!',
        list: [
            {
                id: 0,
                name: 'First task',
                completed: true},
            {
                id: 1,
                name: 'Second task',
            completed: false}
        ],
        newItem: '',
        answer: '',
        image: '',
        nextID: 2
    },
    methods: {
        addToList: function (newItem) {
            this.list.push({ id: this.nextID, name: this.newItem, completed:false})
            this.nextID++;
        },
        getAnswer: function () {
            axios.get('https://yesno.wtf/api')
            .then(function (response) {
            app.answer = response.data.answer
            app.image = response.data.image
            })
            .catch(function (error) {
            app.answer = 'Error! Could not reach the API. ' + error
            })
            }
            
    },
    computed: {
        toDoAmount: function() {
            return this.title + ' (' + this.list.length + ')' + ' stuff to do!'
        }
    }
})
