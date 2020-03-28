var dbUtil = require("./dbUtil")


function insertComment(blogId, parent, parentName, username, comments, email, ctime, utime, success) {
    var insertSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?);";
    var params = [blogId, parent, parentName, username, comments, email, ctime, utime];
    
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


function queryCommentsByBlogId(blogId, success) {
    var insertSql = "select * from comments where blog_id = ?";
    var params = [blogId];
    
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


function queryCommentCountByBlogId(blogId, success) {
    var insertSql = "select count(1) as count from comments where blog_id = ?";
    var params = [blogId];
    
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


function queryCommentsBySize(size, success) {
    var insertSql = "select * from comments order by id desc limit 0, ?";
    var params = [size];
    
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


module.exports = {
    "insertComment": insertComment,
    "queryCommentsByBlogId": queryCommentsByBlogId,
    "queryCommentCountByBlogId": queryCommentCountByBlogId,
    "queryCommentsBySize": queryCommentsBySize
}