let giftClosed;
let giftOpen;
let giftOpened = false;
let heartSize = 60;
let isHeartPulsing = false;
let heartPulseScale = 1;
let buttons = [];
let stars = [];
let snowflakes = [];
let projectMenu;
let iframe;
let infoBox;
let sprites = {};
let currentSprite = null;
let currentFrame = 0;

function preload() {
  giftClosed = loadImage("gift-closed.png");
  giftOpen = loadImage("gift-open.png");

  sprites = {
    自我介紹: {
      idle: {
        img: loadImage("01.png"),
        width: 217 / 6,
        height: 30,
        frames: 6,
      },
    },
    作品集: {
      idle: {
        img: loadImage("02.png"),
        width: 127 / 3,
        height: 59,
        frames: 3,
      },
    },
    測驗卷: {
      idle: {
        img: loadImage("03.png"),
        width: 130 / 3,
        height: 49,
        frames: 3,
      },
    },
    教學影片: {
      idle: {
        img: loadImage("04.png"),
        width: 51 / 2,
        height: 25,
        frames: 2,
      },
    },
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
  iframe = document.getElementById("embeddedFrame");

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
    });
  }

  let buttonNames = ["自我介紹", "測驗卷", "作品集", "教學影片", "筆記"];
  let buttonWidth = 120;
  let buttonHeight = 40;
  let spacing = 10;
  let startX = 100;
  let startY = 20;

  for (let i = 0; i < buttonNames.length; i++) {
    let btn = createButton(buttonNames[i]);
    btn.position(startX + i * (buttonWidth + spacing), startY);
    btn.size(buttonWidth, buttonHeight);
    btn.style("font-size", "16px");
    btn.style("background-color", "#4CAF50");
    btn.style("color", "white");
    btn.style("border", "none");
    btn.style("border-radius", "5px");
    btn.style("cursor", "pointer");
    btn.hide();
    buttons.push(btn);

    btn.mouseOver(() => {
      currentSprite = sprites[buttonNames[i]]?.idle || null;
      currentFrame = 0;
    });

    btn.mouseOut(() => {
      currentSprite = null;
    });

    if (buttonNames[i] === "作品集") {
      btn.mousePressed(() => {
        if (projectMenu) {
          projectMenu.remove();
          projectMenu = null;
          return;
        }

        projectMenu = createDiv();
        projectMenu.style("position", "absolute");
        projectMenu.style("background-color", "#FFFFFF");
        projectMenu.style("border", "1px solid #CCCCCC");
        projectMenu.style("border-radius", "10px");
        projectMenu.style("box-shadow", "0px 8px 16px rgba(0, 0, 0, 0.2)");
        projectMenu.style("padding", "10px 0");
        projectMenu.style("width", buttonWidth + "px");
        projectMenu.style("z-index", "1000");
        projectMenu.style("overflow", "hidden");
        projectMenu.style("transition", "transform 0.3s ease, opacity 0.3s ease");
        projectMenu.style("transform", "scaleY(0)");
        projectMenu.style("transform-origin", "top");
        projectMenu.style("opacity", "0");
        projectMenu.position(btn.x, btn.y + buttonHeight);

        setTimeout(() => {
          projectMenu.style("transform", "scaleY(1)");
          projectMenu.style("opacity", "1");
        }, 10);

        let projectNames = ["第一週", "第二週", "第三週","第四週"];
        let projectLinks = [
          "https://mercy94326.github.io/20250310-2/",
          "https://mercy94326.github.io/20250317/",
          "https://mercy94326.github.io/20241223./",
          "https://mercy94326.github.io/20250310/",
        ];

        for (let j = 0; j < projectNames.length; j++) {
          let option = createButton(projectNames[j]);
          option.parent(projectMenu);
          option.style("display", "block");
          option.style("width", "100%");
          option.style("margin", "0");
          option.style("padding", "10px 15px");
          option.style("background-color", "#F9F9F9");
          option.style("color", "#333333");
          option.style("border", "none");
          option.style("border-bottom", "1px solid #DDDDDD");
          option.style("cursor", "pointer");
          option.style("text-align", "left");
          option.style("font-size", "14px");
          option.style("transition", "background-color 0.3s ease");
          option.mousePressed(() => {
            iframe.style.transition = "opacity 0.5s ease";
            iframe.style.opacity = "0";
            setTimeout(() => {
              iframe.src = projectLinks[j];
              iframe.style.display = "block";
              iframe.style.opacity = "1";
            }, 500);
            if (projectMenu) {
              projectMenu.remove();
              projectMenu = null;
            }
          });

          option.mouseOver(() => {
            option.style("background-color", "#E6E6E6");
          });
          option.mouseOut(() => {
            option.style("background-color", "#F9F9F9");
          });
        }
      });
    } else {
      btn.mousePressed(() => {
        if (buttonNames[i] === "自我介紹") {
          // 檢查是否已經存在圖片容器
          let existingImgContainer = document.getElementById("selfIntroImgContainer");
          if (existingImgContainer) {
            // 如果圖片容器已存在，則移除它
            existingImgContainer.remove();
          } else {
            // 如果圖片容器不存在，則創建並顯示
            const imgContainer = createDiv();
            imgContainer.id("selfIntroImgContainer"); // 設置容器的 ID，方便檢查和移除
            imgContainer.style("position", "fixed"); // 使用 fixed 讓圖片始終位於視窗中間
            imgContainer.style("top", "50%");
            imgContainer.style("left", "50%");
            imgContainer.style("transform", "translate(-50%, -50%)");
            imgContainer.style("z-index", "1000"); // 提高 z-index，確保圖片覆蓋其他內容

            const img = createImg("456.PNG");
            img.id("selfIntroImage"); // 設置圖片的 ID
            img.style("width", "400px"); // 縮小圖片寬度為 400px
            img.style("height", "auto"); // 自動調整高度以保持比例
            img.style("object-fit", "contain"); // 確保圖片保持比例

            // 添加滑鼠移入事件，切換圖片為 123.PNG
            img.mouseOver(() => {
              img.attribute("src", "123.PNG");
            });

            // 添加滑鼠移出事件，切換回 456.PNG
            img.mouseOut(() => {
              img.attribute("src", "456.PNG");
            });

            imgContainer.child(img);
            document.body.appendChild(imgContainer.elt);
          }
        } else {
          // 移除圖片容器（如果存在）
          let existingImgContainer = document.getElementById("selfIntroImgContainer");
          if (existingImgContainer) {
            existingImgContainer.remove();
          }

          let link = "";
          if (buttonNames[i] === "測驗卷") {
            link = "https://mercy94326.github.io/0413/";
          } else if (buttonNames[i] === "教學影片") {
            link = "https://cfchen58.synology.me/程式設計2024/B2/week1/20250217_092821.mp4";
          } else if (buttonNames[i] === "筆記") {
            link = "https://hackmd.io/@o7VA6dSlRTCn9P57NkzKZw/B1r0ELY0ke";
          }

          if (link !== "") {
            // 嵌入網頁時，確保圖片在 iframe 下方
            let existingImgContainer = document.getElementById("selfIntroImgContainer");
            if (existingImgContainer) {
              existingImgContainer.style.zIndex = "-1"; // 確保圖片在 iframe 下方
            }

            transitionIframe(link);
          } else {
            iframe.style.display = "none";
            iframe.src = "";
          }
        }
      });
    }
  }
}

function draw() {
  drawBackground();
  drawSnowflakes();

  let treeCount = 8;
  let treeWidth = width / treeCount;
  for (let i = 0; i < treeCount; i++) {
    let x = i * treeWidth + treeWidth / 2;
    drawChristmasTree(x, height - 50, treeWidth / 2);
  }

  noStroke();
  fill(255);
  for (let star of stars) {
    ellipse(star.x, star.y, star.size);
  }

  if (giftOpened) {
    image(giftOpen, width / 2 - 150, height / 2 - 150, 300, 300);
    drawHeart();
    for (let btn of buttons) {
      btn.show();
    }
  } else {
    image(giftClosed, width / 2 - 150, height / 2 - 150, 300, 300);
  }

  if (currentSprite) {
    let frameX = currentFrame * currentSprite.width;
    image(
      currentSprite.img,
      width - currentSprite.width - 20,
      20,
      currentSprite.width,
      currentSprite.height,
      frameX,
      0,
      currentSprite.width,
      currentSprite.height
    );

    if (frameCount % 5 === 0) {
      currentFrame = (currentFrame + 1) % currentSprite.frames;
    }
  }
}

function mousePressed() {
  let centerX = width / 2;
  let centerY = height / 2;
  let boxSize = 120;

  if (dist(mouseX, mouseY, centerX, centerY) < boxSize / 2) {
    giftOpened = !giftOpened;
  }
}

function drawHeart() {
  let heartX = 50;
  let heartY = 30;
  let adjustedHeartSize = heartSize * 0.7;

  if (dist(mouseX, mouseY, heartX, heartY) < adjustedHeartSize / 2) {
    isHeartPulsing = true;
  } else {
    isHeartPulsing = false;
    heartPulseScale = 1;
  }

  if (isHeartPulsing) {
    heartPulseScale = 1 + 0.15 * sin(frameCount * 0.3);
  }

  push();
  translate(heartX, heartY);
  scale(heartPulseScale);

  let ctx = drawingContext;
  ctx.save();
  ctx.beginPath();

  let topCurveHeight = adjustedHeartSize * 0.3;

  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(
    0, topCurveHeight - (adjustedHeartSize * 0.5),
    -adjustedHeartSize / 2, topCurveHeight - (adjustedHeartSize * 0.5),
    -adjustedHeartSize / 2, topCurveHeight
  );
  ctx.bezierCurveTo(
    -adjustedHeartSize / 2, topCurveHeight + (adjustedHeartSize / 2),
    0, topCurveHeight + (adjustedHeartSize * 0.8),
    0, topCurveHeight + adjustedHeartSize
  );
  ctx.bezierCurveTo(
    0, topCurveHeight + (adjustedHeartSize * 0.8),
    adjustedHeartSize / 2, topCurveHeight + (adjustedHeartSize / 2),
    adjustedHeartSize / 2, topCurveHeight
  );
  ctx.bezierCurveTo(
    adjustedHeartSize / 2, topCurveHeight - (adjustedHeartSize * 0.5),
    0, topCurveHeight - (adjustedHeartSize * 0.5),
    0, topCurveHeight
  );

  ctx.closePath();
  let gradient = ctx.createLinearGradient(0, 0, 0, adjustedHeartSize);
  gradient.addColorStop(0, "#ff9aa2");
  gradient.addColorStop(1, "#ff4d4d");
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.restore();
  pop();
}

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(0, 0, 50), color(0, 50, 150), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawChristmasTree(x, y, size) {
  noStroke();
  fill(34, 139, 34);
  triangle(x - size, y, x + size, y, x, y - size * 2);
  triangle(x - size * 0.8, y - size * 0.5, x + size * 0.8, y - size * 0.5, x, y - size * 2);
  triangle(x - size * 0.6, y - size, x + size * 0.6, y - size, x, y - size * 2);
  triangle(x - size * 0.4, y - size * 1.5, x + size * 0.4, y - size * 1.5, x, y - size * 2);

  fill(139, 69, 19);
  rect(x - size / 6, y, size / 3, size / 2);
}

function drawSnowflakes() {
  snowflakes.push({
    x: random(width),
    y: 0,
    size: random(2, 5),
    speed: random(1, 3),
  });

  for (let i = snowflakes.length - 1; i >= 0; i--) {
    let s = snowflakes[i];
    fill(255);
    noStroke();
    ellipse(s.x, s.y, s.size);
    s.y += s.speed;
    if (s.y > height) {
      snowflakes.splice(i, 1);
    }
  }
}

function toggleProjectMenu(x, y, width) {
  if (projectMenu) {
    projectMenu.remove();
    projectMenu = null;
    return;
  }

  projectMenu = createDiv();
  projectMenu.style("position", "absolute");
  projectMenu.style("background-color", "#FFFFFF");
  projectMenu.style("border", "1px solid #CCCCCC");
  projectMenu.style("border-radius", "10px");
  projectMenu.style("box-shadow", "0px 8px 16px rgba(0, 0, 0, 0.2)");
  projectMenu.style("padding", "10px 0");
  projectMenu.style("width", width + "px");
  projectMenu.style("z-index", "1000");
  projectMenu.style("overflow", "hidden");
  projectMenu.style("transition", "transform 0.3s ease, opacity 0.3s ease");
  projectMenu.style("transform", "scaleY(0)");
  projectMenu.style("transform-origin", "top");
  projectMenu.style("opacity", "0");
  projectMenu.position(x, y);

  setTimeout(() => {
    projectMenu.style("transform", "scaleY(1)");
    projectMenu.style("opacity", "1");
  }, 10);

  let projectNames = ["第一週", "第二週", "第三週","第四週"];
  let projectLinks = [
    "https://mercy94326.github.io/20250310-2/",
    "https://mercy94326.github.io/20250317/",
    "https://mercy94326.github.io/20241223./",
    "https://mercy94326.github.io/20250310/",
  ];

  for (let i = 0; i < projectNames.length; i++) {
    let option = createButton(projectNames[i]);
    option.parent(projectMenu);
    option.style("display", "block");
    option.style("width", "100%");
    option.style("margin", "0");
    option.style("padding", "10px 15px");
    option.style("background-color", "#F9F9F9");
    option.style("color", "#333333");
    option.style("border", "none");
    option.style("border-bottom", "1px solid #DDDDDD");
    option.style("cursor", "pointer");
    option.style("text-align", "left");
    option.style("font-size", "14px");
    option.style("transition", "background-color 0.3s ease");
    option.mousePressed(() => handleProjectButton(projectLinks[i]));

    option.mouseOver(() => {
      option.style("background-color", "#E6E6E6");
    });
    option.mouseOut(() => {
      option.style("background-color", "#F9F9F9");
    });
  }
}

function handleProjectButton(link) {
  transitionIframe(link);
  if (projectMenu) {
    projectMenu.remove();
    projectMenu = null;
  }
}

function handleDirectButton(name) {
  let link = "";
  if (name === "測驗卷") {
    link = "https://mercy94326.github.io/0413/";
  } else if (name === "教學影片") {
    link = "https://cfchen58.synology.me/程式設計2024/B2/week1/20250217_092821.mp4";
  } else if (name === "筆記") {
    link = "https://hackmd.io/@o7VA6dSlRTCn9P57NkzKZw/B1r0ELY0ke";
  } else if (name === "自我介紹") {
    const imgContainer = createDiv();
    imgContainer.style("position", "absolute");
    imgContainer.style("top", "50%");
    imgContainer.style("left", "50%");
    imgContainer.style("transform", "translate(-50%, -50%)");
    imgContainer.style("z-index", "1000");
    imgContainer.style("background-color", "rgba(0, 0, 0, 0.8)");
    imgContainer.style("padding", "20px");
    imgContainer.style("border-radius", "10px");
    imgContainer.style("box-shadow", "0 4px 10px rgba(0, 0, 0, 0.5)");

    const img = createImg("456.PNG");
    img.style("max-width", "80vw");
    img.style("max-height", "80vh");
    img.style("border-radius", "10px");

    const closeButton = createButton("關閉");
    closeButton.style("margin-top", "10px");
    closeButton.style("padding", "10px 20px");
    closeButton.style("border", "none");
    closeButton.style("border-radius", "5px");
    closeButton.style("background-color", "#ff4d4d");
    closeButton.style("color", "white");
    closeButton.style("cursor", "pointer");
    closeButton.style("font-size", "16px");

    closeButton.mousePressed(() => {
      imgContainer.remove();
    });

    imgContainer.child(img);
    imgContainer.child(closeButton);
    document.body.appendChild(imgContainer.elt);
    return;
  }

  if (link !== "") {
    transitionIframe(link);
  } else {
    iframe.style.display = "none";
    iframe.src = "";
  }
}

function transitionIframe(link) {
  // 設置 iframe 的初始樣式
  iframe.style.position = "fixed"; // 固定位置
  iframe.style.top = "50%"; // 垂直居中
  iframe.style.left = "50%"; // 水平居中
  iframe.style.transform = "translate(-50%, 100%) scale(0.5)"; // 初始狀態：從下方滑入並縮小
  iframe.style.width = "80vw"; // 設置寬度
  iframe.style.height = "80vh"; // 設置高度
  iframe.style.transition = "transform 0.8s ease, opacity 0.8s ease"; // 添加縮放和滑入的過渡效果
  iframe.style.opacity = "0"; // 初始透明度為 0
  iframe.style.zIndex = "1000"; // 確保 iframe 在其他元素上方

  // 確保 iframe 不會立即顯示舊內容
  iframe.style.display = "none";

  setTimeout(() => {
    iframe.src = link; // 設置嵌入的網頁連結
    iframe.style.display = "block"; // 顯示 iframe
    setTimeout(() => {
      iframe.style.transform = "translate(-50%, -50%) scale(1)"; // 最終狀態：滑入畫面中心並恢復正常大小
      iframe.style.opacity = "1"; // 最終透明度為 1
    }, 50); // 確保 iframe 加載後開始動畫
  }, 100); // 延遲 100 毫秒開始過渡效果
}

function showSprite(buttonName) {
  currentSprite = sprites[buttonName]?.idle || null;
  currentFrame = 0;
}

function hideSprite() {
  currentSprite = null;
}
