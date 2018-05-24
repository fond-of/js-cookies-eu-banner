'use strict';

var tinyCookie = require('tiny-cookie');
var $ = require('jquery');

module.exports = function CookiesEUBanner(options) {
  var self = this;
  self.options = options;

  self.init = function () {
    writeBannerElementToDom();
  };

  var writeBannerElementToDom = function () {
    $('body').prepend(createBannerElement());

    $('.banner.banner--cookies-eu .banner__button.banner__button--ok').click(function () {
      tinyCookie.set('accept_cookies', 'yes', {expires: getExpires()});
      $('.banner.banner--cookies-eu').hide();
    });
  };

  var createBannerElement = function () {
    var banner = document.createElement('div');

    banner.setAttribute('class', 'banner banner--cookies-eu');

    if (tinyCookie.get('accept_cookies') === 'yes') {
      banner.setAttribute('style', 'display: none');
    }

    banner.appendChild(createBannerContentElement());

    return banner;
  };

  var createBannerContentElement = function () {
    var bannerContent = document.createElement('div');

    bannerContent.setAttribute('class', 'banner__content');
    bannerContent.innerHTML = self.options.message;

    bannerContent.appendChild(createOkBannerButtonElement());
    bannerContent.appendChild(createInfoBannerButtonElement());

    return bannerContent;
  };

  var createOkBannerButtonElement = function () {
    var button = document.createElement('button');

    button.setAttribute('class', 'button banner__button banner__button--ok');
    button.innerHTML = self.options.button.ok.text;

    return button;
  };

  var createInfoBannerButtonElement = function () {
    var button = document.createElement('a');

    button.setAttribute('class', 'button banner__button banner__button--info');
    button.innerHTML = self.options.button.info.text;
    button.setAttribute('href', self.options.button.info.link);

    return button;
  };

  var getExpires = function () {
    var now = new Date;
    now.setMonth(now.getMonth() + 1);

    return now.toGMTString();
  };
};