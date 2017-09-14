

/**
 * loader 转换ES6代码配置
 * 需安装 loader   npm install --save-dev babel-loader
 * 
 * 安装 latest
 */

 /**
  * 转换 css less sass 需安装 css-laoder style-loader

  postcss-loader安装  npm install postcss-loader
  css后处理器
  */

  /**
   * less sass
   * 需安装
   * npm install less --sav--dev
   * npm install sass --sav--dev
   */

  /**
   * 处理模板文件
   * npm html-loader --sav--dev
   * 
   * ejs模板
   * npm ejs-loader --sav--dev
   * 
   * jsx
   */

   /**
    * 处理图片
    * css中、组件模板、跟模板中
    *
    * css中、模板中绝对路径
    * file-loader
    *
    *模板中相对路径
    <img src="${ ../../assets/记忆力.png }" alt="">
    *
    *
    *url-loader 处理图片或文件 符合设置文件大小时转化为编码 bs64编码

    *压缩图片
    npm install image-webpack-loader --save--dev
    */

var htmlWebpackPlugin = require('html-webpack-plugin');

var path  = require('path')     // node api 设置绝对路径要用到

module.exports={

    //contex:'',   //默认值根目录

    entry:'./src/components/app.js',   //入口文件
    
    output:{
        // path:__dirname + '/dist/js',    //配置生成文件路径 
        path:'./dist',    //配置生成文件路径 
        filename:'js/[name].bundle.js',     //单个入口文件 

    },//指明打包以后的文件路径

    module:{
        loaders:[
            {
                test: /\.js$/,   //正则匹配文件
                loader: 'babel',
                // loader: 'babel?latest', 
                
                
                 /** 
                  * excled排除解析的文件范围
                    是个正则 、绝对路径、函数、包含绝对路径的数组
                    __dirname运行时目录
                 */
                exclde:path.resolve(__dirname,'node_modules'),   //
                //打包范围  优化打包速度
                //include:'./src/',   //相对路径
                include:path.resolve(__dirname,'src'),        
                query:{
                    preset:['lastest']   
                }
                //'latest' 包括ES2015、ES2016、ES2017  也可以写在package.json
            },

            //html 处理
            {
                test:'/\.html$/',
                loader:'html-loader'
            },
            
            /**
             * tpl模板 返回一个函数
             */
            {
                test:'/\tpl$/',
                loader:'ejs-loader'
            },

            /**
             * 对css处理
             * 转换 css less sass 需安装 css-laoder style-loader
             * 
             *  postcss-loader安装  npm install postcss-loader（可在npm官网查看用法）
             *  css后处理器（加浏览器前缀、）
             * 
             * npm install autoprefixer --save--dev  加浏览器前缀需下载
             */
            {
                test:'/\.css$/',
                //执行顺序从右到左
                //importLoaders=1 给postcss传参 指定 @import引入进来的css loader个数
                loader:'style-loader!css-loader?importLoaders=1!postcss-loader'  //! 串联
                //loaders:['style-loader','css-loader','postcss-loader']
            },

            /**
             * less
             */
            {
                test:'/\.less$/',
                loader:'style!css!postcss!less'
            },
            {
                test:'/\.scss$/',
                loader:'style!css!postcss!scss'
            },

            /**
             * 图片
             */
            {
                test:'/\.(png|jpg|gif|svg)$/',
                loader:'file-loader',
                query:{
                    //打包文件路径 name+哈希+后缀
                    name:'assets/[name]-[hash:5].[ext]'  
                }
            },
            {
                test:'/\.(png|jpg|gif|svg)$/',
                loader:'url-loader',
                query:{
                    limit:20000, //20K
                    //打包文件路径 name+哈希+后缀
                    name:'assets/[name]-[hash:5].[ext]'  
                }
            },
            {
                test:'/\.(png|jpg|gif|svg)$/',
                loader:'url-loader',
                query:{
                    loaders:[
                        'url-loaders?limit=20000&name=assets/[name]-[hash:5].[ext]',
                        //压缩
                        'image-webpack-loader'
                    ]
                }
            },
        ]

    },

    postcss:[
        require('autoprefixer')({
            browsers: ['last 5 versions']  //传参 最近5个浏览器版本
        })
    ],

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
       

    ]

    /**
     * 多页面配置
     * 
     */
}

// 直接 webpack运行