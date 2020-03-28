var CommentDao = require("../dao/commentDao")
var tagsDao = require("../dao/tagsDao")
var tagBlogMappingDao = require("../dao/tagBlogMappingDao")
var url = require("url")
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/RespUtil")
var captcha = require("svg-captcha")

var path = new Map();


function sendComment(request, response) {
        var params = url.parse(request.url, true).query;
        console.log(params)
        CommentDao.insertComment(params.bid, params.parent, params.parentName, params.username, params.content, params.email, timeUtil.getNow(), timeUtil.getNow(), function(result){
            response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
            response.write(respUtil.writeResult("success", "评论成功", null))
            response.end()
        })
}

path.set("/sendComment", sendComment)


function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34})
    // console.log(img)
    response.writeHead(200)
    response.write(respUtil.writeResult("success", "评论成功", img))
    response.end()
}
path.set("/queryRandomCode", queryRandomCode)


function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params)
    CommentDao.queryCommentsByBlogId(params.bid, function(result){
        // console.log(result)
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成", result))
        response.end()
    })
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId)


function queryCommentCountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params)
    CommentDao.queryCommentCountByBlogId(params.bid, function(result){
        // console.log(result)
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成", result))
        response.end()
    })
}
path.set("/queryCommentCountByBlogId", queryCommentCountByBlogId)


function queryCommentsBySize(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params)
    CommentDao.queryCommentsBySize(parseInt(params.size), function(result){
        // console.log(result)
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成", result))
        response.end()
    })
}
path.set("/queryCommentsBySize", queryCommentsBySize)

module.exports.path = path