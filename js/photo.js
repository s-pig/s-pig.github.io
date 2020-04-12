photo ={
    page: 1,
    //offset 用于设置照片数量的上限
    offset: 100,
    init: function () {
        var that = this;
        //这里设置的是刚才生成的 json 文件路径
        $.getJSON("/photos/photoslist.json", function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
    },
    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
           imgNameWithPattern = data[i].url;
           imgName = data[i].title
           //这里 250 指的是图片的宽度，可以根据自己的需要调整相册中照片的大小
            li += '<div class="card" style="width:250px">' +
                    '<div class="ImageInCard" style="height:'+ 250  + 'px">' +
                    //href 和 src 的链接地址是相册照片外部链接，也可以放博客目录里
                      '<a data-fancybox="gallery" href="' + imgNameWithPattern + '?raw=true" data-caption="' + imgName + '">' +
                //注意:该处的srcset我在url后加了-toSmall，这是我在七牛云写好的一个样式
                //样式具体的使用方法大家请自行百度，
                //这里主要用于自动缩略图，不需要的可以delete掉
                        '<img class="CpicView" srcset="' + imgNameWithPattern + '-toSmall?raw=true" src="' + imgNameWithPattern + '?raw=true"/>' +
                      '</a>' +
                    '</div>' +
                    // '<div class="TextInCard">' + imgName + '</div>' +  //图片下显示文件名作为说明的功能
                  '</div>'
        }
        $(".ImageGrid").append(li);
        //$(".ImageGrid").lazyload();
        this.minigrid();
    },
    minigrid: function() {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    }
}
photo.init();