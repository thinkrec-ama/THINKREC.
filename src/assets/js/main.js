var THINKREC = THINKREC || {};

THINKREC.NAV_CONTROLLER = {
    init: function () {
        this.setParameters();
        this.bindEvent();
    },
    setParameters: function () {
        this.navToggle = $(".jcsMenuToggle");
        this.menuLine = $(".jcsMenuLine");
        this.gNav = $(".jscGnav");
    },
    bindEvent: function () {
        this.navToggle.on("click", $.proxy(this.navMove, this));
    },
    navMove: function () {
        this.menuLine.toggleClass('active');
        this.gNav.fadeToggle();
    }
};

THINKREC.HEADER_DISPLAY = {
    init: function () {
        this.setParameters();
        this.bindEvent();
    },
    setParameters: function () {
        this.$header = $(".jsc-header");
        this.$footer = $(".jsc-footer");
        this.$windowHeight = $(window).height();
        this.$documentHeight = $(document).height();
        this.$footerHeight = this.$footer.height();
    },
    bindEvent: function () {
        var myself = this;
        $(window).resize(function () {
            myself.$header.css("top", "0");
        });
        $(window).on("scroll", function () {
            myself.scrollDocument();
        });
    },
    scrollDocument: function () {
        var winScrollTop = $(window).scrollTop();
        if (
            winScrollTop >=
            this.$documentHeight - (this.$windowHeight + this.$footerHeight)
        ) {
            this.$header.addClass("hide");
        } else {
            this.$header.removeClass("hide");
        }
    },
};

THINKREC.PAGETOP_CONTROLLER = {
    ANIMATION_TIME: 700,
    TOP_OFFSET: 0,
    init: function () {
        this.setParameters();
        this.bindEvent();
    },
    setParameters: function () {
        this.$scrollBtn = $(".jscScrollBtn");
        this.$body = $("html, body");
    },
    bindEvent: function () {
        this.$scrollBtn.on("click", $.proxy(this.scrollMove, this));
    },
    scrollMove: function (event) {
        event.preventDefault();
        this.$body.animate({ scrollTop: this.TOP_OFFSET }, this.ANIMATION_TIME);
    },
};
function sliderStart() {

    const slide = document.getElementById('kvSliderList');      //スライダー親
    const slideItem = slide.querySelectorAll('.slide_item');   //スライド要素
    const totalNum = slideItem.length - 1;                     // スライドの枚数を取得
    const FadeTime = 2000;                                     //フェードインの時間
    const IntarvalTime = 5000;                                 //クロスフェードさせるまでの間隔
    let actNum = 0;                                            //現在アクティブな番号
    let nowSlide;                                              //現在表示中のスライド
    let NextSlide;                                             //次に表示するスライド

    // DOM読み込み時にスライドの1枚目をフェードイン
    slideItem[0].classList.add('show_', 'zoom_');

    // 処理を繰り返す
    setInterval(() => {
        if (actNum < totalNum) {

            nowSlide = slideItem[actNum];
            NextSlide = slideItem[++actNum];

            //.show_削除でフェードアウト
            nowSlide.classList.remove('show_');
            // と同時に、次のスライドがズームしながらフェードインする
            NextSlide.classList.add('show_', 'zoom_');
            //フェードアウト完了後、.zoom_削除
            setTimeout(() => {
                nowSlide.classList.remove('zoom_');
            }, FadeTime);


        } else {

            nowSlide = slideItem[actNum];
            NextSlide = slideItem[actNum = 0];

            //.show_削除でフェードアウト
            nowSlide.classList.remove('show_');
            // と同時に、次のスライドがズームしながらフェードインする
            NextSlide.classList.add('show_', 'zoom_');
            //フェードアウト完了後、.zoom_削除
            setTimeout(() => {
                nowSlide.classList.remove('zoom_');
            }, FadeTime);

        };
    }, IntarvalTime);

}

$(window).on("load", function () {
    THINKREC.NAV_CONTROLLER.init();
    THINKREC.HEADER_DISPLAY.init();
    THINKREC.PAGETOP_CONTROLLER.init();
    $(".loadingWrap").delay(1500).fadeOut('slow');
    $(".loadingLogoWrap").delay(1200).fadeOut('slow');
});