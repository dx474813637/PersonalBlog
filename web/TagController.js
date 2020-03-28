var BlogDao = require("../dao/blogDao")
var tagsDao = require("../dao/tagsDao")
var tagBlogMappingDao = require("../dao/tagBlogMappingDao")
var url = require("url")
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/RespUtil")

var path = new Map();


function queryRandomTags(request, response) {
    tagsDao.queryRandomTags(function(result){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
path.set("/queryRandomTags", queryRandomTags)

function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryByTag(params.tag,  function(result){
        tagBlogMappingDao.queryTagBlogMappingByPage(result[0].id, parseInt(params.page), parseInt(params.pageSize), function(result){
            
            var list = []
            result.forEach(function(ele){
                BlogDao.queryBlogById(ele['blog_id'], function(result2) {
                    // console.log(result2)
                    list.push(result2[0])
                })
            })

            getResult(list, result.length)

            
        })
        
        function getResult (list, len) {
            
            if(list.length < len) {
                setTimeout(function() {
                    getResult(list, len)
                }, 100)
            } else {
                
                for(var i = 0 ; i < list.length; i ++) {
                    list[i].content = list[i].content.replace(/<img[\w\W]*">/, "")
                    list[i].content = list[i].content.replace("<[\w\W]{1, 5}>", "")
                    list[i].content = list[i].content.substring(0, 300)
                }
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                response.write(respUtil.writeResult("success", "查询成功", list))
                response.end()
            }
        }
        
    })
}
path.set("/queryByTag", queryByTag)


function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryByTag(params.tag,  function(result){
        tagBlogMappingDao.queryTagBlogMappingByCount(result[0].id, function(result){
            
            response.writeHead(200, {"content-type": "text/html; charset=utf-8"})
            response.write(respUtil.writeResult("success", "查询成功", result))
            response.end()
        })
    })
    
}
path.set("/queryByTagCount", queryByTagCount)

module.exports.path = path