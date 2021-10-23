export default {
    pages: [
        'pages/index/index',
        'pages/about/index',
    ],
    tabBar: {
        list: [
            {
                'iconPath': 'resource/hot-search.png',
                'selectedIconPath': 'resource/hot-search-selected.png',
                pagePath: 'pages/index/index',
                text: '订阅'
            },
            {
                'iconPath': 'resource/us.png',
                'selectedIconPath': 'resource/us-selected.png',
                pagePath: 'pages/about/index',
                text: '我的'
            },
        ],
        'color': '#bfbfbf',
        'selectedColor': '#2c2c2c',
        'backgroundColor': '#fff',
        'borderStyle': 'white'
    },
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    }
}
