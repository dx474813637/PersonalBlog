var sitemap = new Vue({
    el: "#blog_list",
    data: {
        list: []
    },
    created: function() {
        axios({
            url: '/querySiteMap',
            method: 'get'
        }).then(function(resp){
            resp.data.data.forEach(function(ele){
                if(!ele.link) {
                    ele.link = "/detail.html?bid=" + ele.id
                }
            })
            sitemap.list = resp.data.data
        })
    }
})