var tags = new Vue({
    el: '#random_tags',
    data: {
        tags: []
    },
    computed: {
        randomColor() {
            return function() {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb(" + red +"," + green + "," + blue + ")"
            }
        },
        randomSize() {
            return function() {
                return ( Math.random()*10 + 12 ) + 'px'
            }
        }
    },
    created: function () {
        axios({
            url: '/queryRandomTags',
            method: 'get'
        }).then(function(resp){
            resp.data.data.forEach(function(ele){
                tags.tags.push({
                    text: ele.tag,
                    link: '/?tag=' + ele.tag
                })
            })

        })
    }
})

var newHot = new Vue({
    el: '#new_hot',
    data: {
        size: 8,
        titleList: [
            
        ]
    },
    created: function() {
        axios({
            url: "/queryBlogBySize?size=" + this.size,
            method: "get"
        }).then(function(resp){
            resp.data.data.forEach(function(ele){
                if(!ele.link) {
                    ele.link = "/blog_detail.html?bid=" + ele.id
                }
            })
            newHot.titleList = resp.data.data
        })
    }
})

var newComments = new Vue({
    el: '#new_comments',
    data: {
        size: 8,
        commentList: [
            
        ]
    },
    created: function() {
        axios({
            url: 'queryCommentsBySize?size=' + this.size,
            method: 'get'
        }).then(function(resp){
            newComments.commentList = resp.data.data
        })
    }
})