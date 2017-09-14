
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports={

    //contex:'',   //默认值根目录

    entry:__dirname + "./src/script/main.js",   //入口文件
    //entry:['./src/script/main.js','./src/script/a.js'], //也可以是个数组
    //entry:{
        //page1:"/src/script/main.js",
        // page2:['./src/script/a.js','./src/script/b.js']
    //},            //也可以是是个对象  多页面程序中可以用到
    output:{
        path:__dirname + '/dist/js',    //配置生成文件路径 
        filename:'bundle.js',     //单个入口文件 
        //filename:'[name]-[hash].js'   //入口是个对象  [chunkhash] 文件版本号
        //filename:'js/[name]-[hash].js'  //此处也可配置路径

        publicPath:'http://aa.com'          //上线
    },//指明打包以后的文件路径

    //初始化plugin（插件）
    Plugin:[
        new htmlWebpackPlugin({
            //filename:'[name]-[hash].html',   //生成动态的index文件名
            filename:'index.html',   //生成固定的index文件名
            template:'index.html',    //传参 模板
            inject:'head',      // 或body script标签插入位置
            title:'hello',
            date: new Date(),   // html中引用方法 <%= htmlWebpackPlugin.options.date %>

            //压缩
            minify:{
                removeComments:true,  //删除注释
                collapseWhitespace:true, //删除空格
                
            }
        }),
        // 多页面 继续new
        new htmlWebpackPlugin({

        })
    ]

    /**
     * 多页面配置
     * 
     */
}

// 直接 webpack运行