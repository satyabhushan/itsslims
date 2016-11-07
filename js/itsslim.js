window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

(function($) {
    if (!jQuery().draggable) {
        $.fn.draggable = function(o) {
            var delta,
                delta1;
            try {  var dr = o.direction; } catch(e){ var dr = 'y'; };
            console.log(this);
            this.on('mousedown.zoom touchstart.zoom', function(e) {
                    var $dragged = $(this);
                        y = e.pageY || e.originalEvent.touches[0].pageY,
                        x = e.pageX || e.originalEvent.touches[0].pageX;
                        y = parseInt($dragged.css('top')) - y,
                        x = parseInt($dragged.css('left')) - x;
                    
                    $(window)
                        .on('mousemove.draggable touchmove.draggable', function(e) {
                            e.preventDefault();
                            var maxTop = $dragged.parent().height() - $dragged.height(),
                                maxLeft = $dragged.parent().width() - $dragged.width(),
                                minTop = Math.max(0,-maxTop),
                                minLeft = Math.max(0,-maxLeft);
                            delta = e.pageY || e.originalEvent.touches[0].pageY,
                            delta1 = e.pageX || e.originalEvent.touches[0].pageX;
                            delta = delta + y;
                            delta1 = delta1 + x;
                            delta = Math.max(delta, -minTop);
                            delta1 = Math.max(delta1, -minLeft);
                            maxTop = Math.max(0,maxTop);
                            maxLeft = Math.max(0,maxLeft);
                            delta = Math.min(delta, maxTop);
                            delta1 = Math.min(delta1, maxLeft);
                            $dragged.css({
                                    'top': (dr==='both' || dr==='y'? delta : 'fd'), 'left': (dr==='both' || dr==='x'? delta1 : 'fd')
                                })                                
                            try { o['cssOnMove'].call(0,$dragged); } catch(e){};
                            try {  o['drag'].call(0, delta1, delta); } catch(e){};
                        })
                        .one('mouseup touchend touchcancel', function() {
                            try { o['cssOnStop'].call(0,$dragged); } catch(e){};
                            $(this).off('mousemove.draggable touchmove.draggable click.draggable');
                        });

                    e.preventDefault();
                });
            return this;
        };
    }
})(jQuery);

(function($) {

    jQuery.fn.extend({
        slimScroll: function(o) {
            if(!window.mobileAndTabletcheck()){

                var ops = o;
                this.each(function(){

                var isOverPanel, isOverBar, isDragg, queueHide, barHeight,
                    divS = '<div></div>',
                    minBarHeight = 30,
                    wheelStep = 30,
                    o = ops || {},
                    size = o.size || '5px',
                    hsize = o.hsize || '8px',
                    color = o.color || 'rgba(0,0,0,0.5)',
                    hcolor = o.hcolor || 'rgba(0,0,0,0.7)',
                    position = o.position || 'right',
                    opacity = o.opacity || .4,
                    hide = o.hide === true,
                    rcolor = o.rcolor || 'transparent',
                    rhcolor = o.hrcolor || 'rgba(0,0,0,0.05)'
                    height=o.height || $(this).height()+'px',
                    width=o.width || 'auto',
                    dr = o.direction || 'y';
                
                    var me = $(this);

                    var wrapper = $(divS).css({
                        position: 'relative',
                        overflow: 'hidden',
                        width: width,
                        height: height
                    }).attr({ 'class': 'slimScrollDiv' });

                    me.css({
                        overflow: 'hidden',
                    });

                    var rail  = $(divS).addClass('slimScrollRail').css({
                        width: size,
                        height: '100%',
                        background: 'rcolor',
                        position: 'absolute',
                        BorderRadius : size,
                        top: 0
                    });

                    var bar = $(divS).addClass('slimScrollBar').css({
                            background: color,
                            width: size,
                            position: 'absolute',
                            top: 0,
                            opacity: opacity,
                            display: 'none',
                            BorderRadius: size,
                            zIndex: 99
                    });

                    var posCss = (position == 'right') ? { right: '3px' } : { left: '3px' };
                    rail.css(posCss);
                    bar.css(posCss);

                    me.wrap(wrapper);

                    me.parent().append(bar);
                    me.parent().append(rail);

                    var scrollContent = function(x, y, isWheel) {
                        var delta = y;

                        if (isWheel)
                        {
                            delta = bar.position().top + y * wheelStep;

                            delta = Math.max(delta, 0);
                            var maxTop = me.outerHeight() - bar.outerHeight();
                            delta = Math.min(delta, maxTop);

                            bar.css({ top: delta + 'px' });
                        }

                        percentScroll = parseInt(bar.position().top) / (me.outerHeight() - bar.outerHeight());
                        delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

                        me.scrollTop(delta);

                        showBar();
                    }

                    rail.on('mousedown',_moveonmousedown);

                    function _moveonmousedown(e){
                        var clientRect = $(this).siblings('.slimScrollBar')[0].getBoundingClientRect(),
                            top = clientRect.top,
                            mY = e.pageY,
                            delta,
                            barHeight = $(this).siblings('.slimScrollBar').height(),
                            railHeight = $(this).height(),
                            scrollHeight = me[0].scrollHeight,
                            barOldTop = parseInt($(this).siblings('.slimScrollBar').css('top'))
                            ;
                            
                            moveAmount = (railHeight-20)*(railHeight - barHeight)/(scrollHeight - railHeight);

                            if(mY < top){
                                delta = Math.max( barOldTop - moveAmount , 0);
                            } else {
                                delta = Math.min( barOldTop + moveAmount , railHeight - barHeight);
                            }

                            $(this).siblings('.slimScrollBar').css('top',delta+'px');
                            scrollContent(0,delta,false);
                    }

                    var cssOnMove = function(){
                        bar.css({
                            width: hsize,
                            background: hcolor,
                            BorderRadius: hsize
                        })
                        rail.css({
                            width: hsize,
                            background: rhcolor,
                            BorderRadius: hsize
                        })
                    }

                    var cssOnStop = function(){
                        bar.css({
                            width: size,
                            background: color,
                            BorderRadius: size
                        })
                        rail.css({
                            width: hsize,
                            background: rcolor,
                            BorderRadius: hsize
                        })
                    } 

                    bar.draggable({ 
                        drag: scrollContent,
                        direction : dr,
                        cssOnMove : cssOnMove,
                        cssOnStop : cssOnStop      
                    });



                    rail.hover(function(){
                        $(this).css({
                            width: hsize,
                            background: rhcolor,
                            BorderRadius: hsize
                        }).siblings('.slimScrollBar').css({
                            width: hsize,
                            background: hcolor,
                            BorderRadius: hsize
                        })
                        showBar();
                    }, function(){
                        $(this).css({
                            width: size,
                            background: rcolor,
                            BorderRadius: size
                        }).siblings('.slimScrollBar').css({
                            width: size,
                            background: color,
                            BorderRadius: size
                        })
                    });

                    //on bar over
                    bar.hover(function(){
                        $(this).css({
                            width: hsize,
                            background: hcolor,
                            BorderRadius: hsize
                        }).siblings('.slimScrollRail').css({
                            width: hsize,
                            background: rhcolor,
                            BorderRadius: hsize
                        })
                        isOverBar = true;
                    }, function(){
                        $(this).css({
                            width: size,
                            background: color,
                            BorderRadius: size
                        }).siblings('.slimScrollRail').css({
                            width: size,
                            background: rcolor,
                            BorderRadius: size
                        })
                        isOverBar = false;
                    });

                    me.hover(function(){
                        isOverPanel = true;
                        showBar();
                        if(hide)
                            hideBar();
                    }, function(){
                        isOverPanel = false;
                        hideBar();
                    });

                    var _onWheel = function(e)
                    {
                        if (!isOverPanel) { return; }

                        var delta = 0;
                        if (e.wheelDelta) { delta = -e.wheelDelta/120; }
                        if (e.detail) { delta = e.detail / 3; }

                        scrollContent(0, delta, true);

                        if (e.preventDefault) { e.preventDefault(); }
                        e.returnValue = false;
                    }

                    var attachWheel = function()
                    {
                        if (window.addEventListener)
                        {
                            this.addEventListener('DOMMouseScroll', _onWheel, false );
                            this.addEventListener('mousewheel', _onWheel, false );
                        } 
                        else
                        {
                            document.attachEvent("onmousewheel", _onWheel)
                        }
                    }

                    attachWheel();

                    var getBarHeight = function()
                    {
                        barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
                        bar.css({ height: barHeight + 'px' });
                    }

                    getBarHeight();

                    var showBar = function()
                    {
                        getBarHeight();
                        clearTimeout(queueHide);
                        
                        if(barHeight >= me.outerHeight()) {
                            return;
                        }
                        bar.fadeIn('fast');
                    }

                    var hideBar = function()
                    {
                        queueHide = setTimeout(function(){
                            if (!isOverBar && !isDragg) { bar.fadeOut('slow'); }
                        }, 1000);
                        
                    }

                });
            
            } else{

                $(this).css('overflow','auto');

            }
            return this;
        }
    });

    jQuery.fn.extend({
        'slimscroll': jQuery.fn.slimScroll
    });

})(jQuery);
