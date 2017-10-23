
```
devServer: {
        hot: false,
        inline: true,
        proxy: { // api proxy
            '/admin/':{
                //target:"http://127.0.0.247:8080",
                // target: 'http://127.0.0.1:2620',
                target:"http://lscreen-test.tclclouds.com",
                // target:"http://10.115.101.247:8083",
                secure: false,
                changeOrigin: true
            },
        }
    }
```
