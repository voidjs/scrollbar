$(function(){
  (function(window,$){
		window.ScrollBar =new Class;
		ScrollBar.include({
			init:function(targetSel){
				var self =this;
				var scrollTarget = this.scrollTarget = $(targetSel);
				scrollTarget.css('margin-right','12px');
				$('<div class="scrollBar" style="width: 12px;  height: 100%;  float: right;  position: relative; "> <div class="scrolltumb" style="margin: 0 auto;  width: 8px;  height: 30px;  cursor: pointer;  overflow: hidden;  position: relative;  top: 0;  -webkit-border-radius: 5px;  -moz-border-radius: 5px;  border-radius: 5px;  -moz-background-clip: padding;  -webkit-background-clip: padding-box;  background-clip: padding-box;  background-color: rgba(51, 51, 51,0.5);  opacity: 0;  transition: opacity .2s linear;  -o-transition: opacity .2s linear;  -moz-transition: opacity .2s linear;  -webkit-transition: opacity .2s linear; "></div> </div>').insertBefore(scrollTarget);
				var scrolltumb = this.scrolltumb = $('.scrolltumb');
				if(document.all) $('.scrollBar .scrolltumb').css('background','#ccc');
				this.fresh();
				scrolltumb.bind({
					'mousedown':function(e){
						e.preventDefault();
						self.MouseY = e.pageY;
						$(this).bind({
							'mousemove':function(e){
								var parent = $(this).parent();
								var addVal = e.pageY - self.MouseY;
								var scrolltumbTop = $(this).position().top+addVal;
								self.handlerScroll(scrolltumbTop,e.pageY);
							}
						});
					},
					'mouseup mouseleave':function(e){
						$(this).unbind('mousemove');
					}
				}).parent().click(function(e){
					if(e.pageY<self.scrolltumb.offset().top){
						self.handlerScroll(e.pageY);
					}
					if(e.pageY>(self.scrolltumb.offset().top+self.scrolltumb.height())){
						self.handlerScroll(e.pageY-self.scrolltumb.height());
					}
				});
				scrollTarget.parent().bind({
					'mousewheel':function(e){
						e.preventDefault();
						var scrolltumbTop = ((-e.originalEvent.wheelDelta/12)+self.scrolltumb.position().top);
						self.handlerScroll(scrolltumbTop);
					}
				}).hover(function(){
					self.fresh();
					self.scrolltumb.css('opacity',1)
				},function(){
					self.scrolltumb.css('opacity',0);
				});
			},
			fresh : function(){
				var scrolltumb = this.scrolltumb,
					scrollTarget = this.scrollTarget;
				scrolltumb.height(function(i,v){
					return ($(this).parent().height()*(scrollTarget.parent().height()/scrollTarget.height()));
				});
			},
			MouseY:0,
			handlerScroll:function(scrolltumbTop,Y){
				var scrolltumb = this.scrolltumb;
				var scrollTarget = this.scrollTarget;
				if(scrolltumbTop>=0&&(scrolltumbTop+scrolltumb.height()<scrolltumb.parent().height())){
					scrolltumb.css({'top':scrolltumbTop});
					if(Y) this.MouseY = Y;
					var targetHeight=scrollTarget.height();
					var scrollTop = -(targetHeight*(scrolltumbTop/scrolltumb.parent().height()));
					scrollTarget.css({top:scrollTop});
				}
				if(scrolltumbTop<0){
					scrolltumb.css({'top':'0px'});
					scrollTarget.css({top:'0px'})
				}
				if(scrolltumbTop+scrolltumb.height()>scrolltumb.parent().height()){
					scrolltumb.css({'top':scrolltumb.parent().height()-scrolltumb.height()});
					scrollTarget.css({'top':scrollTarget.parent().height()-scrollTarget.height()})
				}
			}
		});
	})(window,jQuery);
});
