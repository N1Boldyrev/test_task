module.exports = [
    {
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        entry: __dirname + "/src/index.tsx",
        output: {
            path: __dirname + "/public",
            filename: "index.js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    use: "ts-loader",
                    exclude: [/node_modules/],
                },
                {
                    test: /\.scss$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
            ],
        },
    },
];
