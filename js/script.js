        let ballSize, barHeight, barWidth, locater, locater2, setNum, loopCount, skipinputs, makeInfoFlg, mistake
        let looopCnt = document.getElementById('loopcount')
        let inWid = window.innerWidth
        let inHeight = window.innerHeight
        let displayNum = 0
        let lastX = 0
        let loadingNum = 0
        let LongTapTime = 0
        let islooping = 0
        let lastYear = ''
        let lastMonth = ''
        let pointerDown = false;
        let pointerMove = false;
        let MidashiDown = false;
        let MidashiMove = false;
        let gamestart = false;
        let simoClickFlg = false;
        let roleFlg = false;
        let loadingFlg = true;
        let lessInfoflg = false;
        let searchDisplayFlg = false;
        let locaterFlg = false;
        let setNums = []
        let opValHairetu = []
        let transFlg = true
        let liLength = 0
        let liLengthAll = 0
        let simojimoIframeS = []
        const circle = {}
        const stocker = {}
        const star = {}
        const btnStyle = {}
        let ul = document.getElementById("myUL");
        const toptop = document.getElementById("toptop")
        const midashiS = document.getElementById("midashiS")
        const searchDisplay = document.getElementById("search")
        let simoBox = document.getElementById('simozimoBox')
        let searchCnt = document.getElementById("searchCnt")
        let searchIndex = document.getElementById("searchIndex")
        let letterBox = document.getElementById("letterPopuped")
        let LINKPARTS = document.getElementById('LINK')
        let input = document.getElementById('searchInput');
        let vInput = document.getElementById('myInput');
        let forHidEach = document.getElementsByClassName('forHid')
        const fortoptop = forHidEach[4]
        let midashiEach = document.getElementsByClassName('midashi')
        let firstScroll = document.querySelectorAll('.scrollcontent')[0]
        let loadingPart = document.getElementById('loadingPart').style
        let rolePlayPart = document.getElementById('roleplay')
        let letsPlayPart = document.getElementById('letsplay')
        let junGyaku = document.getElementById("jungyaku")
        const clStyle = document.getElementById("gameCircle").style
        const starStyle = document.getElementById('starPoint').style;
        const whBtn = document.getElementsByClassName('whitebtn')
        const isTouch = ('ontouchstart' in document);
        const downEvent = (isTouch) ? 'touchstart' : 'pointerdown';
        const moveEvent = (isTouch) ? 'touchmove' : 'pointermove';
        const upEvent = (isTouch) ? 'touchend' : 'pointerup';



        var firstIdo = 0
        var firstKeido = 0
        var firstResult = 0
        var answerMap, randomPostals
        var gLocations = []

        markers = []
        infoWinds = []

        const R = Math.PI / 180;


        window.onload = resize()

        pageFunction(displayNum)


        let loadLoop = setInterval(() => {
          if (loadingFlg) {
            loadingNum++
            loadingPart.transform = `rotate(${loadingNum}deg)`
          }
          else {
            clearInterval(loadLoop)
          }
        }, 5)


        function pageFunction(displayNum) {
          for (i = 0; i < forHidEach.length; i++) {
            if (displayNum == i) {
              forHidEach[i].classList.add("active")
            } else {
              forHidEach[i].classList.remove("active")
            }
            midashiEach[i].style.backgroundColor = (displayNum == i) ? "var(--redcolor)" : "var(--blacktrans)";
          }
        }

        window.onmousewheel = function (e) {
          if (e.pageY > inHeight / 24 * 17 && !gamestart) {
            if (event.wheelDelta < 0) {
              displayNum += 0.1;
              if (displayNum > 5.9) { displayNum = 0 }
            } else {
              displayNum -= 0.1;
              if (displayNum < 0) { displayNum = 5.9 }
            }
            floorNum = Math.floor(displayNum)
            pageFunction(floorNum)
          }
        }

        midashiS.addEventListener(downEvent, function (e) {
          if (!gamestart && !pointerDown) {
            event.preventDefault();
            MidashiDown = true;
            MidashiMove = false;
          }
        })


        midashiS.addEventListener(moveEvent, function (e) {
          if (!gamestart && MidashiDown) {
            event.preventDefault();
            midashiX = (isTouch) ? event.changedTouches[0].pageX : event.pageX;
            displayNum = Math.floor(((midashiX - inWid / 4) / midashiS.clientWidth) * 6)
            if (displayNum < 0) {
              displayNum = 0
            } else if (displayNum > 5) {
              displayNum = 5
            }
            if (lastX != displayNum) {
              pageFunction(displayNum)
            }
            lastX = displayNum
          }
        })

        midashiS.addEventListener(upEvent, function () {
          MidashiDown = false;
          MidashiMove = true;
        });

        function pagemove(e) {
          displayNum = [].slice.call(midashiEach).indexOf(e.target)
          pageFunction(displayNum)
          gamestart = false;

        }



        fortoptop.addEventListener(downEvent, function (e) {
          pointerDown = true;
          pointerMove = false;
          ataiX = (isTouch) ? event.changedTouches[0].pageX : event.pageX;
          ataiY = (isTouch) ? event.changedTouches[0].pageY : event.pageY;
          if (gamestart || roleFlg) {
            toptop.style.display = 'block'
            toptop.style.top = `${ataiY - (inWid + inHeight) * 0.0375}px`
            toptop.style.left = `${ataiX - (inWid + inHeight) * 0.0375}px`

            stocker.target = toptop;
            stocker.startDeg = + toptop.style.transform.replace(/[^\d.-]/g, '');
            stocker.cx = stocker.target.offsetLeft + stocker.target.offsetWidth / 2;
            stocker.cy = stocker.target.offsetTop + stocker.target.offsetHeight / 2;
            stocker.clickDeg = Math.atan2(ataiX - stocker.cx, stocker.cy - ataiY) * 180 / Math.PI;
          }

          if (islooping == 0) {
            ballLongMove();
          }
        });

        function ballLongMove() {
          let downLoop = setInterval(() => {
            if (gamestart || roleFlg) {
              if (!pointerMove && LongTapTime <= 1000) {
                locater2 = locater / 2.5
                locaterFlg = true;
                if (setDeg <= 45 || setDeg > 315) {
                  circle.top = (circle.top <= barHeight * 2) ? barHeight * 2 : circle.top - locater2
                  clStyle.top = `${circle.top}px`;
                } else if (setDeg <= 135) {
                  circle.right = (circle.right <= 0) ? 0 : circle.right - locater2
                  clStyle.right = `${circle.right}px`;
                } else if (setDeg <= 225) {
                  circle.top = (circle.top >= inHeight - barHeight) ? inHeight - barHeight : circle.top + locater2
                  clStyle.top = `${circle.top}px`;
                } else {
                  circle.right = (circle.right >= inWid - ballSize) ? inWid - ballSize : circle.right + locater2
                  clStyle.right = `${circle.right}px`;
                }
                if (!roleFlg) { HitHantei() }
                LongTapTime++;
                islooping = 1
              }
              else {
                clearInterval(downLoop)
                islooping = 0
                LongTapTime = 0
              }
            }
          }, 10)
        }


        fortoptop.addEventListener(moveEvent, function (e) {
          if (pointerDown) {
            pointerMove = true
            LongTapTime = 0
            islooping = 0
            event.preventDefault();
            ataiX = (isTouch) ? event.changedTouches[0].pageX : event.pageX;
            ataiY = (isTouch) ? event.changedTouches[0].pageY : event.pageY;
            setDeg = (Math.atan2(ataiX - stocker.cx, stocker.cy - ataiY) * 180 / Math.PI
              + stocker.startDeg - stocker.clickDeg + 360) % 360;
            if (gamestart || roleFlg) {
              toptop.style.transform = `rotate(${setDeg}deg)`
              if (setDeg <= 45 || setDeg > 315) {
                circle.top = (circle.top <= barHeight * 2) ? barHeight * 2 : circle.top - locater
                clStyle.top = `${circle.top}px`;
              } else if (setDeg <= 135) {
                circle.right = (circle.right <= 0) ? 0 : circle.right - locater
                clStyle.right = `${circle.right}px`;
              } else if (setDeg <= 225) {
                circle.top = (circle.top >= inHeight - barHeight) ? inHeight - barHeight : circle.top + locater
                clStyle.top = `${circle.top}px`;
              } else {
                circle.right = (circle.right >= inWid - ballSize) ? inWid - ballSize : circle.right + locater
                clStyle.right = `${circle.right}px`;
              }
              if (roleFlg) {
                if (rolePlayPart.innerText != '本番は白いのを避けて' && rolePlayPart.innerText != 'ゲームスタート/ストップ') {
                  rolePlayPart.innerText = '練習する'
                }
              } else {
                HitHantei()
              }
            }
            pointerMove = false;
          }
        }, { passive: false });


        toptop.addEventListener(upEvent, function () {
          pointerDown = false;
          pointerMove = true;
          delete stocker.target
          toptop.style.display = 'none'
          LongTapTime = 0
          islooping = 0
        });


        //resize
        function resize() {
          inWid = window.innerWidth
          inHeight = window.innerHeight

          let yokoDekaFlg = inWid >= inHeight

          documentStyle = document.documentElement.style

          documentStyle.setProperty('--inWid', `${inWid}px`);
          documentStyle.setProperty('--inHeight', `${inHeight}px`);

          //noteサイズ調整

          let noteThumbnail = document.querySelectorAll('.noteThumbnail')
          noteThumbnail.forEach(e => {
            e.style.height = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3 / 1.91}px` : `${inWid / 24 * 22 / 1.91}px`
            e.style.width = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3}px` : `${inWid / 24 * 22}px`
            e.style.margin = (yokoDekaFlg) ? `0 ${inWid / 24}px ${inWid / 24}px 0` : `0 auto ${inHeight / 24}px auto`
          })



          let noteThumbnailImg = document.querySelectorAll('.noteThumbnailImg')
          noteThumbnailImg.forEach(e => {
            e.style.height = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3 / 1.91}px` : `${inWid / 24 * 22 / 1.91}px`
            e.style.width = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3}px` : `${inWid / 24 * 22}px`
          })

          //youtubeサイズ調整
          let iFrame = document.querySelectorAll('iframe')
          iFrame.forEach(e => {
            e.style.height = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3 / 16 * 9}px` : `${inWid / 24 * 22 / 16 * 9}px`
            e.style.width = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3}px` : `${inWid / 24 * 22}px`
          })


          let youtubeBox = document.querySelectorAll('.youtubebox')
          youtubeBox.forEach(e => {
            e.style.height = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3 / 16 * 9 + inHeight / 12}px` : `${inWid / 24 * 22 / 16 * 9 + inHeight / 12}px`
            e.style.width = (yokoDekaFlg) ? `${(inWid / 24 * 22 - inWid / 12) / 3}px` : `${inWid / 24 * 22}px`
            e.style.margin = (yokoDekaFlg) ? `0 ${inWid / 24}px 0 0 ` : `0 0 ${inHeight / 24}px 0`
            e.style.overflow = (yokoDekaFlg) ? 'hidden' : 'display'
          })

          let lastClass = ''
          let lastClassNum = 1

          let noteAndYoutube = document.querySelectorAll('.noteThumbnail,.youtubebox')
          for (i = 0; i < noteAndYoutube.length; i++) {
            if (lastClass != noteAndYoutube[i].className) {
              lastClass = noteAndYoutube[i].className
              lastClassNum = 1
            }
            else {
              lastClassNum++;
            }
            if (yokoDekaFlg && lastClassNum % 3 == 0) {
              noteAndYoutube[i].style.margin = (noteAndYoutube[i].className.indexOf('youtubebox') > -1) ? `0 0 0 0` : `0 0 ${inWid / 24}px 0`
            }
          }

          barHeight = inHeight / 10
          locater = inHeight / 250
          barWidth = (inWid - inWid / 16) / 24 * 5.5
          ballSize = Math.floor(barHeight / 2) - 5

          clStyle.width = `${ballSize}px`
          clStyle.height = `${ballSize}px`
          starStyle.width = `${ballSize}px`
          starStyle.height = `${ballSize}px`
          starStyle.fontSize = `${ballSize}px`

          if (!gamestart) {
            circle.top = inHeight / 24 * 14
            circle.right = inWid / 2 - (ballSize / 2)
            clStyle.top = `${circle.top}px`
            clStyle.right = `${circle.right}px`
          }
        }

        window.addEventListener('DOMContentLoaded', function () {
          window.addEventListener('resize', function () {
            resize();
          });
        });

        //game

        roleHairetu = ['遊び方', '画面内で円を描いて', '練習する', '本番は白いのを避けて']

        function rorlePlay(e) {
          let ETarget = rolePlayPart.innerText
          roleFlg = true;
          if (ETarget == '遊び方') {
            rolePlayPart.innerText = '画面内で円を描いて'
          } else if (ETarget == '練習する') {
            game(e)
            rolePlayPart.innerText = '本番は白いのを避けて'
          } else if (ETarget == 'ゲームスタート/ストップ') {
            roleFlg = false;
            game(e)
          }
        }

        function HitHantei() {
          let circleTop = circle.top
          let circleRight = circle.right
          if (star.starFlg == '出現' && star.stTop - ballSize <= circleTop && star.stTop + ballSize >= circleTop && star.stRight - ballSize <= circleRight && star.stRight + ballSize >= circleRight) {
            starStyle.display = 'none'
            star.starFlg = '入手'
            clStyle.backgroundColor = 'gold'
            star.getCount = loopCount
          }
          if (btnStyle.whTop - ballSize <= circleTop && btnStyle.whTop + barHeight >= circleTop && btnStyle.whRight - ballSize <= circleRight && btnStyle.whRight + barWidth >= circleRight) {
            if (star.starFlg == '入手') {
              if (whBtn[btnStyle.num].style.backgroundColor != 'var(--blacktrans)') {
                whBtn[btnStyle.num].style.backgroundColor = 'var(--blacktrans)'
                loopCount += 1
                looopCnt.innerText = `現在のスコア：${loopCount}`
              }
            }
            else {
              mistake = true
              clStyle.backgroundColor = "transparent"
              clStyle.border = "5px dotted var(--redcolor)"
              pointerDown = false
              pointerMove = true;
            }
          }
        }

        function gamestartButton(e) {
          roleFlg = false;
          if (e.target.id == 'letsplay') {
            if (letsPlayPart.innerText == '本番') {
              letsPlayPart.innerText = '遊び方'
              rolePlayPart.innerText = 'ゲームスタート/ストップ'
              game(e)
            } else {
              letsPlayPart.innerText = '本番'
              rolePlayPart.innerText = '画面内で円を描いて'
              roleFlg = true;
              gamestart = false
            }
          } else {
            letsPlayPart.innerText = '遊び方'
            rolePlayPart.innerText = 'ゲームスタート/ストップ'
            game(e)
          }

        }


        function game(e) {
          islooping = 1
          if (roleHairetu.indexOf(rolePlayPart.innerText) == -1) {
            roleFlg = false;
          }
          if (rolePlayPart.innerText == 'ゲームスタート/ストップ') {
            letsPlayPart.innerText = '遊び方'
          }
          let bestScore = document.getElementById('bestscore');
          star.starFlg = '消滅'
          starStyle.display = 'none'
          clStyle.border = 'none'
          clStyle.backgroundColor = 'var(--redcolor)'
          if (gamestart) {
            gamestart = false
            for (i = 0; i < whBtn.length; i++) {
              whBtn[i].style.backgroundColor = 'var(--whitecolor)'
              whBtn[i].style.position = 'static'
              whBtn[i].style.display = 'inline-block'
            }
          }
          else {
            if (!roleFlg && Number(bestScore.innerText.substr(7, 1)) < loopCount) {
              bestScore.innerText = `ベストスコア：${loopCount}`
            }
            gamestart = true;
            makeInfoFlg = true;
            mistake = false;
            if (!roleFlg) {
              loopCount = 0
              looopCnt.innerText = `現在のスコア：${loopCount}`
            }
            toptop.style.transform = 'rotate(0deg)'
            circle.top = circle.top = inHeight / 24 * 14
            circle.right = inWid / 2 - (ballSize / 2)
            clStyle.top = `${circle.top}px`
            clStyle.right = `${circle.right}px`
            for (i = 0; i < whBtn.length; i++) {
              whBtn[i].style.display = 'none'
            }
            plusMinus = [barWidth, -barWidth, -barWidth * 1.5, barWidth * 1.5, 0]

            let loop = setInterval(() => {
              if (mistake || !gamestart) {
                clearInterval(loop)
              }
              if (makeInfoFlg) {
                btnStyle.num = Math.floor(Math.random() * whBtn.length)
                whStyle = whBtn[btnStyle.num].style
                whStyle.backgroundColor = 'var(--whitecolor)'
                whStyle.position = 'absolute'
                btnStyle.whTop = 0;
                btnStyle.whRight = Math.floor(Math.random() * inWid);
                whStyle.top = '0px';
                whStyle.right = `${btnStyle.whRight}px`
                whStyle.display = 'block'
                makeInfoFlg = false;
              }
              btnStyle.whTop += barHeight;
              btnStyle.whRight += plusMinus[Math.floor(Math.random() * 5)]
              if (btnStyle.whRight < 0) {
                btnStyle.whRight = Math.abs(btnStyle.whRight)
              } else if (btnStyle.whRight > inWid) {
                btnStyle.whRight = inWid * 2 - btnStyle.whRight
              }
              whStyle.top = `${btnStyle.whTop}px`
              whStyle.right = `${btnStyle.whRight}px`
              if (!roleFlg) { HitHantei() }
              if (btnStyle.whTop >= inHeight) {
                makeInfoFlg = true;
                if (!roleFlg) {
                  loopCount += 1
                  looopCnt.innerText = `現在のスコア：${loopCount}`
                }
                if (loopCount % 7 == 0 && loopCount >= 1) {
                  starStyle.display = 'block'
                  star.stTop = barHeight * 3
                  star.stRight = btnStyle.whRight
                  starStyle.top = `${star.stTop}px`
                  starStyle.right = `${star.stRight}px`
                  star.starFlg = '出現';
                } else {
                  star.starFlg = (star.starFlg == '入手') ? '入手' : '消滅'
                  starStyle.display = 'none'
                }
                if (star.starFlg == '入手' && loopCount - star.getCount >= 3) {
                  clStyle.backgroundColor = 'var(--redcolor)'
                  star.starFlg = '消滅'
                }
              }

            }, 500)
          }
        }


        const postalGet = 'https://script.google.com/macros/s/AKfycbwp_lYxMAT3zKW0J8iGma53ZogIEWQUpGlrOjrBucZoCnVe8ivHfmSbuilqCch-rKY/exec';
        fetch(postalGet).then(response => response.json()).then(data => {
          randomPostals = data[0];
          document.getElementById('dartsBtn').style.color = 'var(--whitecolor)'
        })

        const endpoint = "https://script.google.com/macros/s/AKfycbypmDkRQ6_muh8iF9dNVA0q2ycBI-4IQXEKX7xbwf71_qlB8R9-9HUCvVoFTP0Ftek0tA/exec";
        fetch(endpoint)
          .then(response => response.json())
          .then(data => {
            const object = data;
            let htmltxt = ''
            data[0].forEach(data => {
              cls = data.cls
              spcls = data.cls.split(' ')
              txtforbtn = ''
              if (spcls.length != 0) {
                spcls.forEach(c => {
                  if (c != '') {
                    txtforbtn += `<button class='radioclass'onclick=searchOption(event) value='${c}'>${c}</button>`
                  }
                })
              }

              thisYear = data.date.substr(0, 4)
              thisMonth = data.date.substr(5, 2)
              if (lastYear != thisYear) {
                lastYear = thisYear
                htmltxt += `<li class="dateClass Year"><button class='dateOpt' onclick=searchOption(event) value='${thisYear}/'><span>${thisYear}</span><span style='display:none;'>/12/31</span></button></li>`
                liLengthAll += 1;
              }
              if (lastMonth != thisMonth) {
                lastMonth = thisMonth
                htmltxt += `<li class="dateClass Month"><button class='dateOpt' onclick=searchOption(event) value='/${thisMonth}/'><span style='display:none;'>${thisYear}/</span><span>${thisMonth}</span><span style='display:none;'>/31</span></button></li>`
                liLengthAll += 1;
              }

              summaryPart = (data.summary.length != 0) ? `<div class="summaries">${data.summary}</div>` : `<div class="summaries nosummaries">　</div>`;
              htmltxt += `<li class="'${cls}"><a href="${data.url}"><span class='radiotitle'>${data.title}</span>${summaryPart}</a><time>${data.date}</time>${txtforbtn}<button value="${data.url}" class="radioclass iframeButton" onclick='simoClick(event)'>♪</button></li>`

              liLengthAll += 1;
              liLength += 1;
            })
            ul.innerHTML = htmltxt;
            searchCnt.innerHTML = liLength
            for (let x = 0; x < 2; x++) {

              dataArr = [];
              tabtxt = ''
              untabtxt = ''
              ultxt = {}

              forfirstinput = `tabclass${x}`
              data[x + 1].forEach(data => {
                cls = data.cls;
                litxt = (x == 0) ? `<li><a class="noteThumbnail ${cls}" href="${data.url}"><span class="notetitle">${data.title}<br><time>${changeDate(data.pubdate)}</time></span><img src="${data.thumbnail}" class="noteThumbnailImg" loading="lazy"></a></li>` : `<li class="youtubebox ${cls}"><iframe src="https://www.youtube.com/embed/${data.videoid}"style=";border:none;" allowfullscreen loading="lazy"></iframe><p><a href="${data.url}">${data.title.replace(`【${cls}】`, "")}</a></p></li>`
                if (!ultxt[cls]) {
                  tabtxt += `<option class="${forfirstinput}" id="${cls}">${cls}</option>`;
                  untabtxt += `<ul class="tab_content" id="${cls}_content"></ul>`;
                }
                ultxt[cls] = (ultxt[cls]) ? ultxt[cls] + litxt : litxt
              })
              document.getElementById(`tabs${x}`).innerHTML = tabtxt
              document.getElementById(`undertabs${x}`).innerHTML = untabtxt

              Object.keys(ultxt).forEach(e => {
                document.getElementById(`${e}_content`).innerHTML = ultxt[e]
              });
              let firstinput = document.querySelectorAll(`.${forfirstinput}`)[0]
              document.getElementById(`${firstinput.id}_content`).style.display = "block"
            }
            let tiktokUL = document.getElementById('tiktok');
            var tiktokJs = document.createElement('script')
            tiktokJs.src = "https://www.tiktok.com/embed.js"
            let tiktokTxt = ''
            data[3].forEach(data => {

              tiktokTxt += `<li class="tiktokLi"><blockquote class="tiktok-embed" cite="${data.url}" data-video-id="${data.videoid}" data-embed-from="embed_page"><section><a target="_blank" title="@simozimo_studio" href="https://www.tiktok.com/@simozimo_studio?refer=embed">@simozimo_studio</a></section></blockquote></li>`
            });
            tiktokUL.innerHTML = tiktokTxt
            tiktokUL.appendChild(tiktokJs)

            loadingPart.display = "none"
            loadingFlg = false;
            resize();
            firstScroll.scroll(0, 30 + inWid / 96)
          });


        li = ul.getElementsByTagName('li');

        function letterFunction(e) {
          letterBox.style.display = (letterBox.style.display != 'block') ? 'block' : 'none';
        }

        function searchOption(e) {
          let forInputValue = e.target.value;
          if (forInputValue == undefined) { return }
          vInput.innerHTML = vInput.innerHTML.replace('検索', '')
          if (input.value.indexOf(forInputValue) == -1) {
            input.value += ` ${forInputValue} `
            let opValButton = `<div class='opValButton' onclick='opValDel(event)'>${forInputValue} ×</div>`
            vInput.innerHTML += opValButton
            opValHairetu.push(forInputValue)
            searchUpdate(opValHairetu)
          }
        }


        function searchDisplayer(e) {
          let pushId = e.target.id
          if (pushId == 'myInput') {
            if (simoClickFlg) {
              searchDisplay.style.height = 'calc(var(--inHeight)/24*16 - 160px)'
              searchIndex.style.height = 'calc(var(--inHeight)/24*14 - 195px)'
            } else {
              searchDisplay.style.height = 'calc(var(--inHeight)/24*16)'
              searchIndex.style.height = 'calc(var(--inHeight)/24*14 - 35px)'
            }
            searchDisplayFlg = true;
            searchDisplay.style.display = 'block'
            let end = input.value.length
            input.focus();
            input.setSelectionRange(end, end);
          }
          else if (pushId == '' || pushId == 'searchInput' || pushId == 'simozimoCancel') {
            return;
          }
          else {
            searchDisplay.style.display = 'none'
            if (searchDisplayFlg) {
              if (pushId == 'jungyaku' || pushId == 'batu' || opValHairetu.length != 0) {
                seachResultAnime();
              }
              searchDisplayFlg = false;
            }
          }
          if (pushId.indexOf('letter') == -1) {
            letterBox.style.display = 'none'
          }
        }

        function seachResultAnime() {
          if (lessInfoflg) {
            firstScroll.scroll(0, 0);
          } else {
            firstScroll.scroll(0, 30 + inWid / 96)
          }
          for (i = 0; i < liLengthAll; i++) {
            li[i].classList.add("hiddenAnime")
          }

          setTimeout(() => {
            for (i = 0; i < liLengthAll; i++) {
              li[i].classList.remove("hiddenAnime")
            }
          }, 600)


        }


        function searchFunction(e) {
          opValHairetu = input.value.split(' ')
          let forVInputTxt = ''
          opValHairetu = opValHairetu.filter(value => (value.length != 0))
          opValHairetu.forEach(e => {
            forVInputTxt += `<div class='opValButton' onclick='opValDel(event)'>${e} ×</div>`
          })
          vInput.innerHTML = forVInputTxt
          searchUpdate(opValHairetu)
          searchDisplay.style.display = 'none'
        }


        function searchUpdate(opValHairetu) {
          if (opValHairetu.length == 0) {
            reset();
            return;
          } else {
            for (i = 0; i < liLengthAll; i++) {
              li[i].style.display = "inline-block";
            }
            let dateHairetu = [];

            for (i = 0; i < opValHairetu.length; i++) {
              if (opValHairetu[i].indexOf('/') > -1) {
                dateHairetu.push(opValHairetu[i])
              }
              filter = opValHairetu[i].toUpperCase()
              var newLi = document.querySelectorAll('li[style*="display: inline-block;"]');
              newLi.forEach(e => {
                txtValue = e.textContent || e.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  e.style.display = "inline-block";
                } else {
                  if (e.className.indexOf('dateClass') == -1)
                    e.style.display = "none";
                }
              })
            }
            if (dateHairetu.length > 0) {
              for (i = 0; i < dateHairetu.length; i++) {
                filter = dateHairetu[i]
                var dateLi = (filter.length >= 5) ? document.querySelectorAll('.dateClass[style*="display: inline-block;"]') : document.querySelectorAll('.dateClass:not(.Year)[style*="display: inline-block;"]')
                dateLi.forEach(e => {
                  txtValue = e.textContent || e.innerText;
                  if (txtValue.indexOf(filter) > -1) {
                    e.style.display = "inline-block";
                  } else {
                    e.style.display = "none";
                  }
                })
              }
            }
            getCnt = document.querySelectorAll('li:not(.dateClass)[style*="display: inline-block;"]').length

            if (getCnt <= 50) {
              lessInfoflg = true;
              var dateLi = document.querySelectorAll('.dateClass:not(.Year)[style*="display: inline-block;"]')
              dateLi.forEach(e => {
                e.style.display = "none";
              })
            } else {
              lessInfoflg = false;
            }
            var LastLi = document.querySelectorAll('li[style*="display: inline-block;"]');
            for (i = 0; i < LastLi.length; i++) {
              var EachLi = LastLi[i]
              var PrevLi = LastLi[i - 1]
              if (i > 0 && EachLi.className.indexOf('Month') > -1 && PrevLi.className.indexOf('Month') > -1) {
                PrevLi.style.display = "none";
              } else if (i > 0 && EachLi.className.indexOf('Year') > -1 && PrevLi.className.indexOf('Month') > -1) {
                PrevLi.style.display = "none";
              } else if (i > 0 && EachLi.className.indexOf('Year') > -1 && PrevLi.className.indexOf('Year') > -1) {
                PrevLi.style.display = "none";
              }
              if (i == LastLi.length - 1 && EachLi.className.indexOf('Month') > -1) {
                EachLi.style.display = "none"
              } else if (i == LastLi.length - 1 && EachLi.className.indexOf('Year') > -1) {
                EachLi.style.display = "none"
              }

            }


            searchCnt.innerHTML = getCnt
            seachResultAnime()
          }
        }

        function opValDel(e) {
          e.target.remove();
          str = e.target.innerText;
          delStr = str.substr(0, str.indexOf(' '))
          opValHairetu.splice(opValHairetu.indexOf(delStr), 1)
          input.value = input.value.replace(delStr, '')
          opValHairetu = opValHairetu.filter(value => (value.length != 0))
          searchUpdate(opValHairetu);
        }

        function compareText(a, b) {
          let plmn = (transFlg) ? 1 : -1
          let atime = ''
          let btime = ''
          if (a.className.indexOf('dateClass') > -1) {
            aSpan = a.getElementsByTagName('span')
            for (i = 0; i < aSpan.length; i++) {
              atime += aSpan[i].innerText
            }
          } else {
            atime = a.getElementsByTagName('time')[0].innerText
          }
          if (b.className.indexOf('dateClass') > -1) {
            bSpan = b.getElementsByTagName('span')
            for (i = 0; i < bSpan.length; i++) {
              btime += bSpan[i].innerText
            }
          } else {
            btime = b.getElementsByTagName('time')[0].innerText
          }


          if (atime > btime)
            return 1 * plmn;
          else if (atime < btime)
            return -1 * plmn;
          else if (atime == btime) {
            if (a.className.indexOf('Year') > -1 || a.className.indexOf('Month') > -1) {
              return 1;
            } else if (b.className.indexOf('Year') > -1 || b.className.indexOf('Month') > -1) {
              return 1;
            } else if (a.getElementsByTagName('a')[0] > b.getElementsByTagName('a')[0])
              return 1 * plmn;
            else {
              return -1 * plmn
            }
          }
          return 0;
        }

        function transpose(e) {
          var dateLi = document.querySelectorAll('.dateClass')
          if (transFlg) {
            junGyaku.style.boxShadow = "inset 1px 1px 2px var(--graycolor),inset -1px -1px 2px white"
            junGyaku.innerText = "∧"
            dateLi.forEach(e => {
              eSpan = e.getElementsByTagName('span')
              for (i = 0; i < eSpan.length; i++) {
                if (eSpan[i].innerText == '/31') {
                  eSpan[i].innerText = '/01'
                } else if (eSpan[i].innerText == '/12/31') {
                  eSpan[i].innerText = '/01/01'
                }
              }
            })
            myArray = Array.prototype.slice.call(li);
            myArray.sort(compareText);
            transFlg = false;
          } else {
            junGyaku.style.boxShadow = "1px 1px 2px var(--graycolor), -1px -1px 2px white"
            junGyaku.innerText = "∨"
            dateLi.forEach(e => {
              eSpan = e.getElementsByTagName('span')
              for (i = 0; i < eSpan.length; i++) {
                if (eSpan[i].innerText == '/01') {
                  eSpan[i].innerText = '/31'
                } else if (eSpan[i].innerText == '/01/01') {
                  eSpan[i].innerText = '/12/31'
                }
              }
            })
            myArray = Array.prototype.slice.call(li);
            myArray.sort(compareText);
            transFlg = true;
          }
          for (let i = 0; i < myArray.length; i++) {
            ul.appendChild(ul.removeChild(myArray[i]))
          }
          seachResultAnime()
        }

        function reset(e) {
          for (i = 0; i < liLengthAll; i++) {
            li[i].style.display = "inline-block";
          }
          opValHairetu = []
          input.value = ''
          vInput.innerText = "検索"
          searchDisplay.style.display = 'none'
          vInput.style.color = "var(--blackcolor)"
          searchCnt.innerHTML = liLength
          lessInfoflg = false;
          seachResultAnime();
        }

        //writing
        function changeDate(date) {
          let datArr = date.split(' ')
          let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec', 'Nov']
          let datstr = `${datArr[3]}/${monthArr.indexOf(datArr[2]) + 1}/${datArr[1]}`
          return datstr;
        }

        function changeTab(e) {
          let check = e.target.value
          let checkId = e.target.id
          let other = (checkId == 'tabs0') ? document.querySelectorAll('.tabclass0') : document.querySelectorAll('.tabclass1');
          document.getElementById(`${check}_content`).style.display = "block"
          other.forEach(e => {
            if (e.id != check) {
              document.getElementById(`${e.id}_content`).style.display = ""
            }
          })
        }


        function simoClick(e) {
          if (simoClickFlg) {
            document.getElementsByClassName('standfm-embed-iframe')[0].remove();
          }
          var forIframeValue = String(e.target.value)
          var iframeTxt = `<iframe src="https://stand.fm/embed${forIframeValue.substr(forIframeValue.indexOf('/episodes'))}" class="standfm-embed-iframe" frameborder="0" allowtransparency="true" allow="encrypted-media" loading="lazy"></iframe>`
          simoBox.style.display = 'block'
          simoBox.innerHTML += iframeTxt
          simoClickFlg = true;
        }

        function simoCanButton(e) {
          document.getElementsByClassName('standfm-embed-iframe')[0].remove();
          simoBox.style.display = 'none'
          simoClickFlg = false;
        }



        function distance(lat1, lng1, lat2, lng2) {
          lat1 *= R;
          lng1 *= R;
          lat2 *= R;
          lng2 *= R;
          return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
        }

        function display(inAd, mapT, num) {
          if (firstResult == 0 && num > 1) {
            document.getElementById('address1').value = '問題の位置を決めて'
            return;
          }
          var target = mapT
          geocoder = new google.maps.Geocoder();

          geocoder.geocode({ address: inAd }, (results, status) => {
            if (status == 'OK') {
              ido = results[0].geometry.location.lat()
              keido = results[0].geometry.location.lng()
              if (gLocations.length <= 1) {
                answerMap = new google.maps.Map(target, {
                  center: results[0].geometry.location,
                  zoom: 10,
                  mapTypeId: 'roadmap'
                });
              }
              if (num == 1) {
                gLocations = []
                markers = []
                infoWinds = []
                document.getElementById('kyori').innerHTML = ''
                firstIdo = ido
                firstKeido = keido
                firstResult = results[0].geometry.location
                marker = new google.maps.Marker({
                  map: answerMap,
                  position: firstResult,
                  animation: google.maps.Animation.DROP
                });
                var infoWindow = new google.maps.InfoWindow({
                  content: `<strong style="color:var(--redcolor);">${inAd}</strong>`,
                  position: answerMap.getCenter()
                });
                infoWindow.open(answerMap, marker);

                target.style.height = `${inHeight / 8}px`
              } else {
                answerKyori = distance(firstIdo, firstKeido, ido, keido).toFixed(2)
                gLocations.push({ gLoc: results[0].geometry.location, gKyori: answerKyori, gName: inAd })

                for (i = 0; i < gLocations.length; i++) {
                  markers[i] = new google.maps.Marker({
                    map: answerMap,
                    position: gLocations[i].gLoc,
                    animation: google.maps.Animation.DROP
                  });
                  infoWinds[i] = new google.maps.InfoWindow({
                    content: `<strong style="color:var(--blackcolor);">${gLocations[i].gName}/${gLocations[i].gKyori}km</strong>`,
                    position: answerMap.getCenter()
                  });

                  infoWinds[i].open(answerMap, markers[i]);
                  markerEvent(i)
                }

                if (answerKyori <= 20) {
                  document.getElementById(`kyori`).innerHTML = `正解！　出題ピンから${answerKyori}km`
                  marker2 = new google.maps.Marker({
                    map: answerMap,
                    position: firstResult,
                    animation: google.maps.Animation.DROP
                  });

                  var infoWindow = new google.maps.InfoWindow({
                    content: `<strong style="color:var(--redcolor);">正解！</strong>`,
                    position: firstResult
                  });
                  infoWindow.open(answerMap, marker2);

                } else {
                  document.getElementById(`kyori`).innerHTML = `出題ピンから${answerKyori}km`
                }

              }

            } else {
              document.getElementById(`kyori`).innerHTML = '該当する場所が見つかりませんでした。'
            }
          });
        }


        // マーカーをクリックしたら吹き出しを表示
        function markerEvent(i) {
          markers[i].addListener('click', function () {
            infoWinds[i].open(answerMap, markers[i]);
          });
        }


        function geoChange(num) {
          var inputAddress = document.getElementById(`address${num}`).value;
          document.getElementById(`address${num}`).blur();
          var target = document.getElementById(`map${num}`);
          display(inputAddress, target, num)
        }

        function dartsPin(e) {
          randP = String(randomPostals[Math.floor(Math.random() * 100) + 1])
          var inAd = `${randP.slice(0, 3)}-${randP.slice(3)}`
          var target = document.getElementById('map1')
          geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: inAd }, (results, status) => {
            if (status == 'OK') {
              var inputAddress = results[0].formatted_address
              gLocations = []
              markers = []
              infoWinds = []
              document.getElementById('address1').value = ''
              document.getElementById('kyori').innerHTML = ''
              ido = results[0].geometry.location.lat() + 0.01
              keido = results[0].geometry.location.lng() + 0.01
              const map = new google.maps.Map(target, {
                center: { lat: ido, lng: keido },
                zoom: 18,
                mapTypeId: 'satellite'
              });
              new google.maps.Marker({
                map: map,
                position: { lat: ido, lng: keido },
                animation: google.maps.Animation.DROP
              });
              firstIdo = ido
              firstKeido = keido
              firstResult = { lat: ido, lng: keido }
              document.getElementById('map2').innerHTML = ''
            }
            else {
              target.innerHTML += '該当する場所が見つかりませんでした。'
            }
          })
        }
