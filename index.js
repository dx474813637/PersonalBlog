var express = require("express")
var globalConfig = require("./config")
var loader = require("./loader")

var app = new express();

app.use(express.static("./page/"))
app.post("/editEveryDay", loader.get("/editEveryDay"))
app.get("/queryEveryDay", loader.get("/queryEveryDay"))


app.post("/editBlog", loader.get("/editBlog"))
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"))

app.get("/queryBlogCount", loader.get("/queryBlogCount"))

app.get("/queryBlogById", loader.get("/queryBlogById"))

app.get("/sendComment", loader.get("/sendComment"))

app.get("/queryRandomCode", loader.get("/queryRandomCode"))
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"))
app.get("/queryCommentCountByBlogId", loader.get("/queryCommentCountByBlogId"))


app.get("/queryBlogBySize", loader.get("/queryBlogBySize"))
app.get("/queryCommentsBySize", loader.get("/queryCommentsBySize"))

app.get("/querySiteMap", loader.get("/querySiteMap"))

app.get("/queryRandomTags", loader.get("/queryRandomTags"))
app.get("/queryByTag", loader.get("/queryByTag"))
app.get("/queryByTagCount", loader.get("/queryByTagCount"))

app.listen(globalConfig.port, function(){
    console.log("服务器已启动")
})