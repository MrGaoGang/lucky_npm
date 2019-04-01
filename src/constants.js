module.exports = {
    "pluginName": "lucky npm",
    code: {

        install: {
            command: "npm install",
            label: "安装依赖(install)",
            icon: "install.png",
            extension: "lucky.gao.extension.install"
        },
        start_dev: {
            command: "npm run dev",
            label: "启动测试环境(dev)",
            icon: "dev.png",
            extension: "lucky.gao.extension.start_dev"
        },
        build_pro: {
            command: "npm run build",
            label: "构建生产版本(pro)",
            icon: "pro.png",
            extension: "lucky.gao.extension.build_pro"
        }
    }
}