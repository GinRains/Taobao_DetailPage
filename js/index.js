window.onload = function () {
  var data = {
    img: [
      {b: './imgs/b1.png', s: './imgs/s1.png'},
      {b: './imgs/b2.png', s: './imgs/s2.png'},
      {b: './imgs/b3.png', s: './imgs/s3.png'},
      {b: './imgs/b1.png', s: './imgs/s1.png'},
      {b: './imgs/b2.png', s: './imgs/s2.png'},
      {b: './imgs/b3.png', s: './imgs/s3.png'},
      {b: './imgs/b1.png', s: './imgs/s1.png'},
      {b: './imgs/b2.png', s: './imgs/s2.png'},
      {b: './imgs/b3.png', s: './imgs/s3.png'},
      {b: './imgs/b1.png', s: './imgs/s1.png'},
      {b: './imgs/b2.png', s: './imgs/s2.png'},
      {b: './imgs/b3.png', s: './imgs/s3.png'}
    ],
    goods: [
      {
        "title": "选择颜色",
        "data": [
          {
            type: "金色",
            changePrice: 0
          },
          {
            type: "银色",
            changePrice: 40
          },
          {
            type: "黑色",
            changePrice: 90
          },
        ]
      },
      {
        "title": "内存容量",
        "data": [
          {
            type: "16G",
            changePrice: 0
          },
          {
            type: "64G",
            changePrice: 300
          },
          {
            type: "128G",
            changePrice: 900
          },
          {
            type: "256G",
            changePrice: 1300
          },
        ]
      },
      {
        "title": "选择版本",
        "data": [
          {
            type: "公开版",
            changePrice: 0
          },
          {
            type: "移动版",
            changePrice: -1000
          }
        ]
      },
      {
        "title": "购买方式",
        "data": [
          {
            type: "官方标配",
            changePrice: 0
          },
          {
            type: "优惠移动版",
            changePrice: -240
          },
          {
            type: "电信优惠版",
            changePrice: -390
          },
        ]
      }
    ],
    price: 5299
  };
  var magnifyId = 0,
    phoneNum = 1;

  magnify();
  function magnify () {
    var mask = null,
      magnify = null;
    var maskParent = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap .preview .zoom');
    var maskImg = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap .preview .zoom > img');
    var magnifyParent = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap > .preview');
    maskImg.src = data.img[magnifyId].s;

    maskParent.addEventListener('mouseenter', function () {
      if(!mask) {
        mask = document.createElement('div');
        mask.className = 'mask';

        maskParent.appendChild(mask);
      }

      if(!magnify) {
        var imgSrc = document.createElement('img');
        magnify = document.createElement('div');
        magnify.className = 'magnify';
        imgSrc.src = data.img[magnifyId].b;
        magnify.appendChild(imgSrc);

        magnifyParent.appendChild(magnify);
      }
      maskParent.onmousemove = function (event) {
        var maskPosition = {
          // offsetTop 与 getBoundingClientRect().top
          // offsetLeft 与 getBoundingClientRect().left
          left: event.clientX - mask.clientWidth / 2 - maskParent.getBoundingClientRect().left,
          top: event.clientY - mask.clientHeight / 2 - maskParent.getBoundingClientRect().top
        };
        if(maskPosition.left <= 0) {
          maskPosition.left = 0;
        }else if (maskPosition.left >= maskParent.offsetWidth - mask.offsetWidth) {
          maskPosition.left = maskParent.offsetWidth - mask.offsetWidth;
        }

        if(maskPosition.top <= 0) {
          maskPosition.top = 0;
        }else if (maskPosition.top >= maskParent.offsetHeight - mask.offsetHeight) {
          maskPosition.top = maskParent.offsetHeight - mask.offsetHeight;
        }

        mask.style.left = maskPosition.left + 'px'
        mask.style.top = maskPosition.top + 'px'

        var imgWidth = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap > .preview .magnify img');
        var scale = (maskParent.clientWidth - mask.clientWidth) / (imgWidth.clientWidth - magnify.clientWidth);
        imgWidth.style.marginLeft = - maskPosition.left / scale + 'px';
        imgWidth.style.marginTop = - maskPosition.top / scale + 'px';
      }
      ;maskParent.onmouseleave = function () {
        maskParent.removeChild(mask);
        magnifyParent.removeChild(magnify);

        mask = null;
        magnify = null;

        maskParent.onmousemove = null;
        maskParent.onmouseleave = null;
      }
    })
  }

  toggle();
  function toggle () {
    var imgList = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap .thumbnail .items .img-list')
    var imgAll = document.querySelectorAll('.wrapper .con-wrap > .con-main .preview-wrap .thumbnail .items .img-list > img');
    var prev = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap .thumbnail .prev');
    var next = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap .thumbnail .next');
    var imgRight = getStyle(imgAll[0], 'marginRight');
    var imgWrap = imgAll[0].offsetWidth + parseInt(imgRight);
    var showImg = 5;
    var moveLeft = 2; // 每次移动的数量
    var tempLeft = 0;
    var countLeft = imgAll.length - showImg;
    imgList.style.transition = '.4s';

    imgList.style.width = imgAll.length * imgWrap + 'px';



    prev.onclick = function () {
      if(tempLeft > 0) {
        if(tempLeft > moveLeft) {
          tempLeft -= moveLeft;
        }else {
          tempLeft = 0;
        }
        imgList.style.left = -tempLeft * imgWrap + 'px';
      }
    }

    // 702
    next.onclick = function () {
      if(tempLeft < countLeft) {
        if(countLeft - tempLeft > moveLeft) {
          tempLeft += moveLeft;
        }else {
          tempLeft += (countLeft - tempLeft);
        }
        imgList.style.left = -tempLeft * imgWrap + 'px';
      }
    }

    // 缩略图点击
    thumbnailClick();
    function thumbnailClick () {
      var showImg = document.querySelector('.wrapper .con-wrap > .con-main .preview-wrap .preview .zoom img');
      for(var i = 0; i < imgAll.length; i++) {
        (function (i) {
          imgAll[i].onclick = function () {
            showImg.src = this.src;
            magnifyId = i;
          }
        })(i)
      }
    }

    // 获取非行内属性值
    function getStyle(obj, attr) {
      if(obj.currentStyle) {
        return obj.currentStyle[attr];
      }else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    }
  }

  // 右侧商品信息
  showGoods();
  function showGoods () {
    var choosedArea = document.querySelector('.wrapper .con-wrap > .con-main .info-wrap .info-content .choose-area');
    var goods = data.goods;
    for(var i = 0; i < goods.length; i++) {
      var dlNode = document.createElement('dl');
      var dtNode = document.createElement('dt');
      dtNode.innerHTML = goods[i].title;
      dlNode.appendChild(dtNode);
      var good = goods[i].data;
      for(var j = 0; j < good.length; j++) {
        var ddNode = document.createElement('dd');
        ddNode.innerHTML = good[j].type;
        ddNode.setAttribute('changePrice', good[j].changePrice);
        dlNode.appendChild(ddNode);
      }
      choosedArea.appendChild(dlNode);
    }
  }

  // 选取的商品信息
  chooseedGood();
  function chooseedGood() {
    var goods = data.goods;
    var dlNode = document.querySelectorAll('.wrapper .con-wrap > .con-main .info-wrap .info-content .choose-area dl');
    var choosedNode = document.querySelector('.wrapper .con-wrap > .con-main .info-wrap .info-content .choose-area .choosed')
    var goodBag = new Array(goods.length);
    goodBag.fill(0);

    dlNode.forEach(function (item, index) {
      var ddNode = item.querySelectorAll('dd');
      ddNode.forEach(function (item) {
        // 给存入的元素加num属性
        item.setAttribute('num', index);
        item.onclick = function () {
          ddNode.forEach(function (item) {
            item.style.color = '#666';
          })
          this.style.color = 'red';
          // 将选中的dd加入choosedGood
          var num = +this.getAttribute('num');
          goodBag[num] = this;

          // 将选中的商品渲染到页面
          choosedNode.innerHTML = '';
          goodBag.forEach(function (item) {
            if(item) {
              var mark = document.createElement('mark');
              var a = document.createElement('a');
              mark.innerHTML = item.innerHTML;
              a.innerHTML = 'X';
              a.setAttribute('num', +item.getAttribute('num'));
              mark.appendChild(a);
              choosedNode.appendChild(mark);
            }
          })

          // mark a标签删除功能
          var aAll = document.querySelectorAll('.wrapper .con-wrap > .con-main .info-wrap .info-content .choose-area .choosed a')
          aAll.forEach(function (item) {
            item.onclick = function () {
              var mark = item.parentNode;
              var num = +this.getAttribute('num');
              mark.parentNode.removeChild(mark);
              goodBag[num] = 0;

              // 重置商品class信息
              var _ddNode = dlNode[num].querySelectorAll('dd');
              _ddNode.forEach(function (item) {
                item.style.color = '#666';
              })
              _ddNode[0].style.color = 'red';

              // 调用计算价钱函数
              priceSum(goodBag);

              contactFitting()
              // dlNode[num].forEach(function (item) {
              //   var _ddNode = item.querySelectorAll('dd')
              //   _ddNode.forEach(function (item) {
              //     item.style.color = '#666';
              //   })
              //   console.log(_ddNode)
              //   _ddNode[num].style.color = 'red';
              // })
            }
          })
          // 调用价钱函数
          priceSum(goodBag);
          contactFitting();
        }
      })
    })
  }

  // 联动配件区域价格
  function contactFitting () {
    var choosedFitting = document.querySelectorAll('.wrapper .productDetail .detail .fitting .good-suits .fitting-suits > div input')
    var originalCost = document.querySelector('.wrapper .productDetail .detail .fitting .good-suits .phone p')
    var showPrice = document.querySelector('.wrapper .productDetail .detail .fitting .good-suits .cart-wrap .price')

    if(arguments[0]) originalCost.innerHTML = '￥' + arguments[0];

    var price = +originalCost.innerHTML.substr(1);

    choosedFitting.forEach(function (item) {
      if(item.checked) {
        price += +item.value;
      }
      showPrice.innerHTML = '￥' + price;
    })
  }

  // 计算价钱
  function priceSum (arr) {
    let phonePrice = data.price * phoneNum;
    arr.forEach(function (item) {
      if(item) {
        phonePrice += +item.getAttribute('changePrice') * phoneNum;
      }
    })

    var showPrice = document.querySelector('.wrapper .con-wrap > .con-main .info-wrap .info-content .price-area .price .price-detail > em')
    var detailPrice = document.querySelector('.wrapper .productDetail .detail .fitting .good-suits .phone p');
    var packagePrice = document.querySelector('.wrapper .productDetail .detail .fitting .good-suits .cart-wrap .price');
    showPrice.innerHTML = phonePrice;
    detailPrice.innerHTML = '￥' + phonePrice;
    packagePrice.innerHTML = '￥' + phonePrice;
  }

  // 商品数量交互
  goodsNum();
  function goodsNum () {
    var increment = document.querySelector('.wrapper .con-wrap > .con-main .info-wrap .info-content .cart-wrap .control .increment')
    var decrement = document.querySelector('.wrapper .con-wrap > .con-main .info-wrap .info-content .cart-wrap .control .decrement')
    var _goodNum = document.querySelector('.wrapper .con-wrap > .con-main .info-wrap .info-content .cart-wrap .control .goods')
    var showPrice = document.querySelector('.wrapper .con-wrap > .con-main .info-wrap .info-content .price-area .price .price-detail > em')

    increment.onclick = function () {
      phoneNum++;
      _goodNum.innerHTML = phoneNum;

      showPrice.innerHTML = +showPrice.innerHTML / (phoneNum - 1) * phoneNum;
      contactFitting(+showPrice.innerHTML);
    }

    decrement.onclick = function () {
      if(phoneNum > 1) {
        phoneNum--;
        _goodNum.innerHTML = phoneNum;

        showPrice.innerHTML = +showPrice.innerHTML / (phoneNum + 1) * phoneNum;
      }
      contactFitting(+showPrice.innerHTML)
    }
  }

  // 选择搭配价钱
  fittingPrice();
  function fittingPrice () {
    var choosedFitting = document.querySelectorAll('.wrapper .productDetail .detail .fitting .good-suits .fitting-suits > div input')
    var  originalCost = document.querySelector('.wrapper .productDetail .detail .fitting .good-suits .phone p')
    var showPrice = document.querySelector('.wrapper .productDetail .detail .fitting .good-suits .cart-wrap .price')


    choosedFitting.forEach(function (item) {
      item.onclick = function () {
        var price = +originalCost.innerHTML.substr(1);
        choosedFitting.forEach(function (item) {
          if(item.checked) {
            price += +item.value;
          }
        })

        showPrice.innerHTML = '￥' + price;
      }
    })
  }

  // 封装选项卡tab切换  使用构造函数 + 原型
  function Tab (tabTitle, tabContent) {
    this.tabTitle = tabTitle;
    this.tabContent = tabContent;

    this.tabTitle.forEach(function (item, index) {
      item.index = index;
      var _this = this;
      item.onclick = function () {
        _this.clickTab(this);
      }
    }, this)
  }

  Tab.prototype.clickTab = function (_this) {
    this.tabTitle.forEach(function (item, index) {
      item.className = '';
      this.tabContent[index].style.display = 'none';
    }, this);

    _this.className = 'active';
    this.tabContent[_this.index].style.display = 'block';
  };

  // 侧边栏切换
  asideNav();
  function asideNav () {
    var tabTitle = document.querySelectorAll('.wrapper .productDetail .aside .tabWrap h4');
    var tabContent = document.querySelectorAll('.wrapper .productDetail .aside .tabContent div');

    new Tab(tabTitle, tabContent);
  }

  // 商品详情页tab切换
  introNav();
  function introNav () {
    var introTabTitel = document.querySelectorAll('.wrapper .productDetail .intro .tab-wrap div')
    var introTabContent = document.querySelectorAll('.wrapper .productDetail .intro .tab-content > div')

    new Tab(introTabTitel, introTabContent);
  }

  // 右侧导航条
  rightNav();
  function rightNav () {
    var rightNav_switch = document.querySelector('.wrapper .right-bar .switch');
    var right_nav = document.querySelector('.wrapper .right-bar');
    var flag = true;

    rightNav_switch.onclick = function () {
      if(flag) {
        right_nav.style.right = 0;
        rightNav_switch.className = 'switch close';
      } else {
        right_nav.style.right = '-294px';
        rightNav_switch.className = 'switch list';
      }
      flag = !flag;
    }

    var rightNav_list = document.querySelectorAll('.wrapper .right-bar .tool-list > div');
    rightNav_list.forEach(function (item) {
      item.onmouseenter = function () {
        var i = this.querySelector('i');
        var em = this.querySelector('em');

        i.style.backgroundColor = 'rgb(200, 17, 34)';
        em.style.left = '-59px';
      }

      item.onmouseleave = function () {
        var i = this.querySelector('i');
        var em = this.querySelector('em');

        i.style.backgroundColor = '';
        em.style.left = '35px';
      }
    })
  }
}