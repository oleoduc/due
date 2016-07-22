/**
 * Created by admin_000 on 18/07/2016.
 */
var id = 0

var map = new Map()

function updateId(update){
    if(update)
        return id++
    else
        return id
}

// demo data
var data = {
    id: updateId(true),
    name: 'Section ' + updateId(false),
    level: 0,
    alts: [
        {
            id: updateId(true),
            name: 'Alt ' + updateId(false),
            level: 0,
            children: [],
        },
        {
            id: updateId(true),
            name: 'Alt ' + updateId(false),
            level: 0,
            children: [],
        }],
    newAlt: '>',
    children: [
        {
            id: updateId(true),
            name: 'Section ' + updateId(false),
            level: 1,
            alts: [
                {
                    id: updateId(true),
                    name: 'Alt ' + updateId(false),
                    level: 1,
                    children: [],
                }],
            newAlt: '>',
            children: [
                {
                    id: updateId(true),
                    name: 'Section ' + updateId(false),
                    level: 2,
                    alts: [],
                    newAlt: '>',
                    children: []
                }
            ]
        }
    ]
}

function initMap(data) {
    if(data.children.length != 0){
        map.set(data.level, [$('#'+(data.id+1))])
        data.children.forEach(function(item, index, array){
            initMap(item)
        })
    }
    if(data.alts !== 'undefined' && typeof data.alts.children !== 'undefined'){
        data.alts.forEach(function(item, index, array){
            map.get(data.level).push($('#'+(item.id+1)))
        })
    }
}

// define the item component
Vue.component('item', {
    template: '#item-template',
    props: {
        model: Object
    },
    data: function () {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function () {
            return this.model.children &&
                this.model.children.length
        },
        isAlt: function () {
            return this.model.alts &&
                this.model.alts.length
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                //this.open = !this.open
            }
        },
        show: function () {
            sectionId = this.model.id+1
            console.log(this.model.level)
            map.get(this.model.level).forEach(function(item, index, array) {
                if(sectionId !== item.id+1){
                    console.log(item.id+1)
                    console.log("caca")
                    $('#'+item.id+1).css("display", "none")
                }
                else{
                    console.log(item.id+1)
                    console.log("pipi")
                    $('#'+item.id+1).css("display", "inline-block")
                }
            })
        },
        changeType: function () {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild(this.model)
                // this.open = true
                if(map.has(this.model.level)){
                    map.get(this.model.level).push($('#'+(this.model.id+1)))
                }
                else{
                    map.set(this.model.level, [$('#'+(this.model.id+1))])
                }
            }
            map.forEach(function(value, key, map){
                console.log(value)
                /*
                value.forEach(function(item, index, array){
                    console.log(item)
                })
                */
            })
        },
        addChild: function (parent) {
            if(parent !== 'undefined'){
                this.model.children.push({
                    id: updateId(true),
                    name: 'Section ' + updateId(false),
                    level: parent.level+1,
                    alts: [],
                    newAlt: '>',
                    children: []
                })
            }
            else{
                this.model.children.push({
                    id: updateId(true),
                    name: 'Section ' + updateId(false),
                    level: 0,
                    alts: [],
                    newAlt: '>',
                    children: []
                })
            }
        },
        addAlt: function () {
            this.model.alts.push({
                id: updateId(true),
                name: 'Alt ' + updateId(false),
                level: this.model.level,
                children: []
            })
        }
    }
})

// boot up the demo
var demo = new Vue({
    el: '#demo',
    data: {
        treeData: data
    }
})
initMap(data);

map.forEach(function(value, key, map){
    value.forEach(function(item, index, array){
        console.log(item)
    })
})