var dbUtil = require("./dbUtil")

function insertBlog(title, content, views, tags, ctime, utime, success) {
    var insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`, `utime`) values (?, ?, ?, ?, ?, ?);";
    var params = [title, content, views, tags, ctime, utime];
    
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

function queryBlogByPage(page, pageSize, success) {
    var querySql = "select * from blog order by id desc limit ?, ?;";
    var params = [page* pageSize, pageSize];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}
function queryBlogBySize(size, success) {
    var querySql = "select * from blog order by id desc limit 0, ?;";
    var params = [size];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}
function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog";
    var params = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}
function queryBlogById(id, success) {
    // console.log(id)
    var querySql = "select * from blog where id = ?";
    var params = [id];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

function queryAddViewsByBlogId(id, success) {
    // console.log(id)
    var querySql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}

function querySiteMap(success) {
    // console.log(id)
    var querySql = "select * from blog";
    var params = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })
    connection.end()
}
module.exports = {
    "insertBlog": insertBlog,
    "queryBlogByPage": queryBlogByPage,
    "queryBlogCount": queryBlogCount,
    "queryBlogById": queryBlogById,
    "queryBlogBySize": queryBlogBySize,
    "queryAddViewsByBlogId": queryAddViewsByBlogId,
    "querySiteMap": querySiteMap
}