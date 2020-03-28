var dbUtil = require("./dbUtil");


function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    // console.log(tagId, blogId, ctime, utime)
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?);";
    var params = [tagId, blogId, ctime, utime];

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


function queryTagBlogMappingByTagId(tagId, success) {
    // console.log(tagId, blogId, ctime, utime)
    var insertSql = "select * from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];

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
// order by id desc
function queryTagBlogMappingByPage (tagId, page, pageSize, success) {
    var querySql = "select * from tag_blog_mapping where tag_id = ?  limit ?, ?;";
    var params = [tagId, page* pageSize, pageSize];
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


function queryTagBlogMappingByCount (tagId, success) {
    var querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?  ;"
    var params = [tagId];
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
    "insertTagBlogMapping": insertTagBlogMapping,
    "queryTagBlogMappingByTagId": queryTagBlogMappingByTagId,
    "queryTagBlogMappingByPage": queryTagBlogMappingByPage,
    "queryTagBlogMappingByCount": queryTagBlogMappingByCount
}