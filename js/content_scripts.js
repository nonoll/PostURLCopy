;(function( window ) {
	'use strict';
	if( 'undefined' === typeof window.nPOST ) {
		window.nPOST = {};
	};

	var $ = window.jQuery;

	window.nPOST.UrlCopy = (function() {
		return {
			init : function() {
				$( 'body' ).prepend( '<textarea data-role="usefl_urlarea" style="display: none;"></textarea>' );

				this.posts = $( '*[data-ft=\'{"tn":"C"}\']' );
				this.urlArea = $( 'textarea[data-role="usefl_urlarea"]' );
				this.display();

				$( document ).on( 'scroll', $.proxy( this.docRender, this ) );
			}
			, docRender : function() {
				this.posts = $( '*[data-ft=\'{"tn":"C"}\']' );
				this.display();
			}
			, display : function() {
				var self = this;

				$.each(this.posts, function(index, val) {
					var target = $(this).closest( 'div._6a._6b' ),
						isBtn = target.find( 'button[data-role="usefl_urlcopy"]' ).length,
						url = target.children( 'div._5pcp' ).find( 'a._5pcq' ).attr( 'href' ),
						btnStr = '';

					if( !isBtn ) {
						btnStr += '<button class=\'_42ft _4jy0 _11b _4jy3 _4jy1 selected _51sy\' type="button"';
						btnStr += ' data-role="usefl_urlcopy" data-url="' + url + '"';
						btnStr += ' style="margin-left: 12px;">';
						btnStr += 'URL Copy';
						btnStr += '</button>';
						target.children( 'div._5pcp' ).append( btnStr );

						target.find( 'button[data-role="usefl_urlcopy"]' ).on( 'click', $.proxy( self.copyClick, self ) );
					}
				});
			}
			, copyClick : function( event ) {
				var target = $( event.currentTarget ),
					copyUrl = location.protocol + '//' + location.host + target.data( 'url' ),
					scrollPos = $( window ).scrollTop();

				this.copy( copyUrl );
				$( window ).scrollTop( scrollPos );

				alert( '[ USEFL ] FB PostUrlCopy\n해당 POST의 URL이 복사되었습니다.' );
			}
			, copy : function( str ) {
				this.urlArea.show();
				this.urlArea.val( str );
				this.urlArea.focus();
				this.urlArea.select();
				document.execCommand( 'Copy' );
				this.urlArea.hide();
			}
		}
	})();

	$(function() {
		window.nPOST.UrlCopy.init();
	});
})( window );