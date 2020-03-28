var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vCode: "",
        rightCode: ""
    },
    methods: {
    },
    computed: {
        changeCode: function(){
            return function() {
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(function(resp){
                    // console.log(resp)
                    sendComment.vCode = resp.data.data.data
                    sendComment.rightCode = resp.data.data.text
        
                })
            }
        },
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != sendComment.rightCode) {
                    alert("验证码有误");
                    return;
                }
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var bid = -2;

                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searcheUrlParams[i].split("=")[1]);
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/sendComment?bid=" + bid + "&parent=" + reply + "&username=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then(function (resp) {
                    alert(resp.data.msg);
                });
            }
        }
    },
    created: function(){
        this.changeCode()
    }
})

var blogComments = new Vue({
    el: '#blog_comments',
    data: {
        comments: [
            {id: "1", user_name: 'dx', ctime: "1531", comments: "dnsjkbndf "}
        ],
        total: ""
    },
    computed: {
        reply: function() {
            return function(commentId, userName) {
                document.getElementById("comment_reply").value = commentId
                document.getElementById("comment_reply_name").value = userName
                location.href = "#send_comment"
            }
            
        }
    },
    created: function(){
        axios({
            url: '/queryCommentsByBlogId?bid=-2',
            method: 'get'
        }).then(function(resp){
            resp.data.data.forEach(function(ele, index){
                if(ele.parent_name != 0) {
                    ele.options = "回复@" + ele.parent_name
                }
            })
            blogComments.comments = resp.data.data
        })

        axios({
            url: '/queryCommentCountByBlogId?bid=-2',
            method: 'get',
        }).then(function(resp){
            blogComments.total = resp.data.data[0].count
            // console.log(resp)
        })
    }
})