var BlogDao = require("../dao/blogDao")
var tagsDao = require("../dao/tagsDao")
var tagBlogMappingDao = require("../dao/tagBlogMappingDao")
var url = require("url")
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/RespUtil")

var path = new Map();

function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;
    var id = params.bid
    BlogDao.queryBlogById(id, function(result){
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
        BlogDao.queryAddViewsByBlogId(id, function(result){})
    })
}
path.set("/queryBlogById", queryBlogById)

function querySiteMap(request, response) {
    BlogDao.querySiteMap( function(result){
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
path.set("/querySiteMap", querySiteMap)

function queryBlogCount(request, response) {
    BlogDao.queryBlogCount(function(result){
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
path.set("/queryBlogCount", queryBlogCount)

function queryBlogBySize(request, response) {
    var params = url.parse(request.url, true).query;
    BlogDao.queryBlogBySize(parseInt(params.size), function(result){
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
path.set("/queryBlogBySize", queryBlogBySize)

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    BlogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function(result){
        
        for(var i = 0 ; i < result.length; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "")
            result[i].content = result[i].content.replace("<[\w\W]{1, 5}>", "")
            result[i].content = result[i].content.substring(0, 300)
        }
        // console.log(result)
        response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
path.set("/queryBlogByPage", queryBlogByPage)

function editBlog(request, response) {
    request.on("data", function(data){
        var params = url.parse(request.url, true).query;
        var tags = params.tags.replace(/ /g, "").replace("，", ",")
        // console.log(params)
        // console.log(data.toString().trim())
        BlogDao.insertBlog(params.title, data.toString().trim(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function(result){
            response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end()
            var blogId = result.insertId;
            var tagList = tags.split(",");
            // console.log(tagList)
            for(var i = 0 ; i < tagList.length; i ++) {
                if(tagList[i] == "") {
                    continue
                }
                queryTag(tagList[i], blogId);
            }
        })
    })
}

path.set("/editBlog", editBlog)


function queryTag(tag, blogId) {
    console.log(tag)
    tagsDao.queryTag(tag, function(result) {
        if(result == null || result.length == 0) {
            insertTag(tag, blogId)
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function(result){})
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function(result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    console.log(timeUtil.getNow())
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function(result) {
        
    })
}

module.exports.path = path