/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/javascripts/TiledImage.js":
/*!******************************************!*\
  !*** ./public/javascripts/TiledImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TiledImage\": () => (/* binding */ TiledImage)\n/* harmony export */ });\n/**\n * This file was given to us by Frédéric Thériault during Web II\n */\nfunction TiledImage(imagePath, columns, rows, refreshInterval, horizontal, scale, nodeID) {\n\tthis.nodeID = nodeID;\n\n\tif (this.nodeID != null) {\n\t\tdocument.getElementById(this.nodeID).style.position = \"absolute\";\n\t}\n\n\tthis.imageList = new Array();\n\tthis.tickTime = 0;\n\tthis.tickDrawFrameInterval = 0;\n\tthis.tickRefreshInterval = 100;\n\tthis.horizontal = true;\n\tthis.scale = 1.0;\n\tthis.flipped = false;\n\tthis.looped = true;\n\n\tif (scale !== undefined) {\n\t   this.scale = scale;\n\t}\n\n\tif (horizontal !== undefined) {\n\t   this.horizontal = horizontal;\n\t}\n\n\tif (refreshInterval !== undefined) {\n\t   this.tickRefreshInterval = refreshInterval;\n\t}\n\n\tvar image = new Image();\n\timage.src = imagePath;\n\tthis.imageList.push(image);\n\tthis.imageTileColCount = columns;\n\tthis.imageTileRowCount = rows;\n\tthis.imageCurrentCol = 0;\n\tthis.imageCurrentRow = 0;\n\tthis.imageAnimationMin = 0;\n\tthis.imageAnimationMax = columns;\n\tthis.angle = 0;\n\tthis.opacity = 1;\n\tthis.fullImageIdx = 0;\n\tthis.fullImageCount = null;\n\tthis.fullImageCallback = null;\n\tthis.stopped = true;\n}\n\nTiledImage.prototype.setFullImageLoop = function (count, fullImageCallback = null) {\n\tthis.fullImageCallback = fullImageCallback;\n\tthis.imageCurrentCol = 0;\n\tthis.imageCurrentRow = 0;\n\tthis.fullImageIdx = 0;\n\tthis.fullImageCount = count;\n\tthis.stopped = false;\n};\n\nTiledImage.prototype.setFlipped = function (flipped) {\n\tthis.flipped = flipped;\n};\nTiledImage.prototype.setOpacity = function (opacity) {\n\tif (opacity > 1) opacity = 1;\n\tif (opacity < 0) opacity = 0;\n\n\tthis.opacity = opacity;\n};\n\n\nTiledImage.prototype.setLooped = function (looped) {\n\tthis.looped = looped;\n}\n\nTiledImage.prototype.addImage = function(imagePath) {\n\tvar image = new Image();\n\timage.src = imagePath;\n\tthis.imageList.push(image);\n};\n\n// starts at 0\nTiledImage.prototype.changeRow = function(row) {\n\tthis.imageCurrentRow = row;\n\tthis.stopped = false;\n\n\tif (!this.horizontal) {\n\t\tthis.imageAnimationMin = row;\n\t\tthis.imageAnimationMax = row;\n\t}\n}\n\n// starts at 0\nTiledImage.prototype.changeCol = function(col) {\n\tthis.imageCurrentCol = col;\n\tthis.stopped = false;\n\n\tif (this.horizontal) {\n\t\tthis.imageAnimationMin = col;\n\t\tthis.imageAnimationMax = col;\n\t}\n}\n\n// starts at 0\nTiledImage.prototype.changeMinMaxInterval = function (min, max, doneEvent = null) {\n\tmax += 1;\n\tthis.stopped = false;\n\n\tif (this.imageTileColCount < max) {\n\t\tmax = this.imageTileColCount;\n\t}\n\n\tthis.imageAnimationMin = min;\n\tthis.imageAnimationMax = max;\n\n\tif (this.horizontal) {\n\t\tthis.imageCurrentCol = this.imageAnimationMin;\n\t}\n\telse {\n\t\tthis.imageCurrentRow = this.imageAnimationMin;\n\t}\n\n\tthis.doneEvent = doneEvent;\n}\n\nTiledImage.prototype.resetCol = function () {\n\tthis.imageCurrentCol = this.imageAnimationColMin;\n\tthis.stopped = false;\n}\n\nTiledImage.prototype.setRotationAngle = function (angle) {\n\tthis.angle = angle;\n}\n\nTiledImage.prototype.getActualWidth = function () {\n\treturn this.imageList[0].width/this.imageTileColCount * this.scale;\n};\n\nTiledImage.prototype.getActualHeight = function () {\n\treturn this.imageList[0].height/this.imageTileRowCount * this.scale;\n};\n\nTiledImage.prototype.setPaused = function (paused) {\n\tthis.stopped = paused;\n};\n\nTiledImage.prototype.tick = function (spritePosX, spritePosY, ctx) {\n\n\tif (ctx == null) {\n\t\tif (this.imageList[0].complete) {\n\t\t\tvar canvas = document.getElementById(this.nodeID + \"-canvas\");\n\t\t\tvar w = this.getActualWidth();\n\t\t\tvar h = this.getActualHeight();\n\n\t\t\tif (canvas == null) {\n\t\t\t\tdocument.getElementById(this.nodeID).innerHTML = \"<canvas id='\" + this.nodeID + \"-canvas' width='\" + w + \"' height='\" + h + \"'></canvas>\";\n\t\t\t\tcanvas = document.getElementById(this.nodeID + \"-canvas\");\n\t\t\t}\n\n\t\t\tdocument.getElementById(this.nodeID).style.left = spritePosX + \"px\";\n\t\t\tdocument.getElementById(this.nodeID).style.top = spritePosY + \"px\";\n\n\t\t\tspritePosX = w/2;\n\t\t\tspritePosY = h/2;\n\n\t\t\tctx = canvas.getContext(\"2d\");\n\t\t\tctx.clearRect(0, 0, w, h);\n\t\t}\n\t}\n\n\tvar now = new Date().getTime();\n\tvar delta = now - (this.tickTime || now);\n\tthis.tickTime = now;\n\tthis.tickDrawFrameInterval += delta;\n\n\tif (this.tickDrawFrameInterval > this.tickRefreshInterval && !this.stopped) {\n\t\tthis.tickDrawFrameInterval = 0;\n\t}\n\n\tvar actualW = this.getActualWidth();\n\tvar actualH = this.getActualHeight();\n\n\tfor (var i = 0; i < this.imageList.length;i++) {\n\t\tif (this.imageList[i].complete && ctx != null) {\n\t\t\tlet x = Math.floor(spritePosX - actualW/2);\n\t\t\tlet y = Math.floor(spritePosY - actualH/2);\n\n\t\t\tif (this.flipped || this.angle != 0 || this.opacity != 1) {\n\t\t\t\tctx.save();\n\t\t\t}\n\n\t\t\tif (this.flipped) {\n\t\t\t\tctx.translate(Math.floor(spritePosX - actualW/2) + actualW,\n\t\t\t\t\t\t\tMath.floor(spritePosY - actualH/2));\n\t\t\t\tctx.scale(-1, 1);\n\t\t\t\tx = 0;\n\t\t\t\ty = 0;\n\t\t\t}\n\n\t\t\tif (this.angle != 0) {\n\t\t\t\tctx.translate(Math.floor(spritePosX),\n\t\t\t\t\t\t\t  Math.floor(spritePosY));\n\t\t\t\tctx.rotate((this.flipped ? -1 : 1) * this.angle * Math.PI/ 180);\n\n\t\t\t\tx = -actualW/2;\n\t\t\t\ty = -actualH/2;\n\t\t\t}\n\n\t\t\tif (this.opacity != 1) ctx.globalAlpha   = this.opacity;\n\n\t\t\tctx.drawImage(this.imageList[i],\n\t\t\t\t\t\t this.imageList[i].width/this.imageTileColCount * this.imageCurrentCol,\n\t\t\t\t\t\t this.imageList[i].height/this.imageTileRowCount * this.imageCurrentRow,\n\t\t\t\t\t\t this.imageList[i].width/this.imageTileColCount,\n\t\t\t\t\t\t this.imageList[i].height/this.imageTileRowCount,\n\t\t\t\t\t\t x,\n\t\t\t\t\t\t y,\n\t\t\t\t\t\t actualW,\n\t\t\t\t\t\t actualH);\n\n\t\t\tif (this.flipped || this.angle != 0 || this.opacity != 1) {\n\t\t\t\tctx.restore();\n\t\t\t}\n\n\t   \t}\n\t}\n\n\tif (this.tickDrawFrameInterval == 0) {\n\t\tif (this.horizontal) {\n\t\t\tif (this.fullImageCount != null) {\n\t\t\t\tthis.fullImageIdx += 1;\n\n\t\t\t\tif (this.fullImageIdx == this.fullImageCount) {\n\t\t\t\t\tthis.fullImageIdx = 0;\n\t\t\t\t\tthis.imageCurrentCol = -1;\n\t\t\t\t\tthis.imageCurrentRow = 0;\n\n\t\t\t\t\tif (this.fullImageCallback != null) {\n\t\t\t\t\t\tthis.fullImageCallback();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tif (this.imageCurrentCol + 1 >= this.imageTileColCount) {\n\t\t\t\t\t\tthis.imageCurrentCol = -1;\n\t\t\t\t\t\tthis.imageCurrentRow++;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ((this.fullImageCount == null && this.imageCurrentCol + 1 >= this.imageAnimationMax) ||\n\t\t\t\t(this.fullImageCount != null && this.imageCurrentCol + 1 >= this.imageTileColCount)) {\n\t\t\t\tif (this.doneEvent != null) {\n\t\t\t\t\tlet doneEvent = this.doneEvent;\n\t\t\t\t\tthis.doneEvent = null;\n\t\t\t\t\tdoneEvent();\n\t\t\t\t}\n\t\t\t\telse if (this.looped) {\n\t\t\t\t\tthis.imageCurrentCol = this.imageAnimationMin;\n\t\t\t\t}\n\t\t\t}\n\t\t\telse {\n\t\t\t\tthis.imageCurrentCol++;\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\tif (this.fullImageCount != null) {\n\t\t\t\tthis.fullImageIdx += 1;\n\n\t\t\t\tif (this.fullImageIdx == this.fullImageCount) {\n\t\t\t\t\tthis.fullImageIdx = 0;\n\t\t\t\t\tthis.imageCurrentCol = 0;\n\t\t\t\t\tthis.imageCurrentRow = -1;\n\n\t\t\t\t\tif (this.fullImageCallback != null) {\n\t\t\t\t\t\tthis.fullImageCallback();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tif (this.imageCurrentRow + 1 >= this.imageTileRowCount) {\n\t\t\t\t\t\tthis.imageCurrentRow = -1;\n\t\t\t\t\t\tthis.imageCurrentCol++;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ((this.fullImageCount == null && this.imageCurrentRow + 1 >= this.imageAnimationMax) ||\n\t\t\t\t(this.fullImageCount != null && this.imageCurrentRow + 1 >= this.imageTileRowCount)){\n\t\t\t\tif (this.doneEvent != null) {\n\t\t\t\t\tlet doneEvent = this.doneEvent;\n\t\t\t\t\tthis.doneEvent = null;\n\t\t\t\t\tdoneEvent();\n\t\t\t\t}\n\t\t\t\telse if (this.looped) {\n\t\t\t\t\tthis.imageCurrentRow = this.imageAnimationMin;\n\t\t\t\t}\n\t\t\t}\n\t\t\telse {\n\t\t\t\tthis.imageCurrentRow++;\n\t\t\t}\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack://shift/./public/javascripts/TiledImage.js?");

/***/ }),

/***/ "./public/javascripts/adventure.js":
/*!*****************************************!*\
  !*** ./public/javascripts/adventure.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ctx\": () => (/* binding */ ctx),\n/* harmony export */   \"canvas\": () => (/* binding */ canvas)\n/* harmony export */ });\n/* harmony import */ var _public_javascripts_sprites_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/javascripts/sprites/player.js */ \"./public/javascripts/sprites/player.js\");\n/* harmony import */ var _public_javascripts_sprites_enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../public/javascripts/sprites/enemy.js */ \"./public/javascripts/sprites/enemy.js\");\n\r\n\r\n\r\nlet ctx = null;\r\nlet canvas = null;\r\nlet spriteList = [];\r\n\r\nwindow.addEventListener(\"load\", () =>{\r\n    canvas = document.getElementById(\"canvas\");\r\n    ctx = canvas.getContext(\"2d\");\r\n\r\n    spriteList.push(new _public_javascripts_sprites_player_js__WEBPACK_IMPORTED_MODULE_0__.default())\r\n\r\n    console.log(spriteList);\r\n    tick()\r\n})\r\n\r\n\r\nconst tick = () =>{\r\n\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height)\r\n\r\n    for(let i = 0;i<spriteList.length;i++){\r\n        const sprite = spriteList[i];\r\n        let alive = sprite.tick();\r\n\r\n        if(!alive){\r\n            spriteList.splice(i,1);\r\n            i--;\r\n        }\r\n    }\r\n\r\n    window.requestAnimationFrame(tick)\r\n}\n\n//# sourceURL=webpack://shift/./public/javascripts/adventure.js?");

/***/ }),

/***/ "./public/javascripts/sprites/Enemy.js":
/*!*********************************************!*\
  !*** ./public/javascripts/sprites/Enemy.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Enemy)\n/* harmony export */ });\nclass Enemy {\r\n    constructor(){\r\n        \r\n        \r\n    }\r\n}\n\n//# sourceURL=webpack://shift/./public/javascripts/sprites/Enemy.js?");

/***/ }),

/***/ "./public/javascripts/sprites/enemy.js":
/*!*********************************************!*\
  !*** ./public/javascripts/sprites/enemy.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Enemy)\n/* harmony export */ });\nclass Enemy {\r\n    constructor(){\r\n        \r\n        \r\n    }\r\n}\n\n//# sourceURL=webpack://shift/./public/javascripts/sprites/enemy.js?");

/***/ }),

/***/ "./public/javascripts/sprites/player.js":
/*!**********************************************!*\
  !*** ./public/javascripts/sprites/player.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _adventure_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adventure.js */ \"./public/javascripts/adventure.js\");\n/* harmony import */ var _TiledImage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TiledImage.js */ \"./public/javascripts/TiledImage.js\");\n/* harmony import */ var _Enemy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enemy.js */ \"./public/javascripts/sprites/Enemy.js\");\n\r\n\r\n\r\n\r\n\r\nclass Player {\r\n    constructor(){\r\n        this.ctx = _adventure_js__WEBPACK_IMPORTED_MODULE_0__.ctx;\r\n        this.canvas = _adventure_js__WEBPACK_IMPORTED_MODULE_0__.canvas;\r\n        this.background = new Image();\r\n        this.background.src = '../../images/background/Background.png'\r\n\r\n        this.state = {\r\n            ATTACK:\"attack\",\r\n            RUN:\"run\",\r\n            IDLE:\"idle\",\r\n            DEATH:\"death\"\r\n        }\r\n        \r\n        this.createAnimation();\r\n\r\n        this.animation = {\r\n            \"attack\":this.animAttack,\r\n            \"run\":this.animRun,\r\n            \"idle\":this.animIdle\r\n        }\r\n\r\n        this.changeAnimation(this.state.RUN) //Default Animation\r\n\r\n        this.offsetX = 0\r\n        this.x = 150;\r\n        this.y = 175;\r\n        this.speed = 1;\r\n        this.health = 3\r\n        this.isControlable = true;\r\n\r\n\r\n        \r\n    }\r\n\r\n    tick() {\r\n\r\n        \r\n        if (this.health > 0){\r\n            if (this.currentState == this.state.RUN){\r\n                this.offsetX += this.speed;\r\n                this.moveBackground(-this.offsetX)\r\n            }\r\n\r\n            \r\n            \r\n\r\n\r\n\r\n            \r\n            this.currentAnimation.tick(this.x, this.y, this.ctx);\r\n        }\r\n\r\n\r\n        \r\n\r\n\r\n        \r\n\r\n        \r\n\r\n        return this.health>0;\r\n\r\n    }\r\n\r\n    moveBackground(pos) {\r\n\r\n        if(pos<= -300){\r\n            this.offsetX = this.background.width;\r\n        }\r\n       \r\n        _adventure_js__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(this.background,pos,175)\r\n        _adventure_js__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(this.background,pos+_adventure_js__WEBPACK_IMPORTED_MODULE_0__.canvas.width/2,175)\r\n    }\r\n\r\n\r\n    changeAnimation(state){\r\n        this.currentState = state\r\n        this.currentAnimation = this.animation[state];\r\n    }\r\n\r\n    createAnimation(){\r\n\r\n        let columnCount = null;\r\n        let rowCount = 1;\r\n        let refreshDelay = 100;\r\n        let scale = 2.5;\r\n        let loopColum = true;\r\n \r\n        columnCount = 22\r\n        this.animAttack = new _TiledImage_js__WEBPACK_IMPORTED_MODULE_1__.TiledImage('../../images/sprite/player_attack.png', columnCount, rowCount, refreshDelay, loopColum, scale)\r\n        this.animAttack.changeRow(0)\r\n        this.animAttack.changeMinMaxInterval(0, columnCount)\r\n        \r\n        columnCount = 8\r\n        this.animRun = new _TiledImage_js__WEBPACK_IMPORTED_MODULE_1__.TiledImage('../../images/sprite/player_run.png', columnCount, rowCount, refreshDelay, loopColum, scale)\r\n        this.animRun.changeRow(0)\r\n        this.animRun.changeMinMaxInterval(0, columnCount)\r\n\r\n        columnCount = 15\r\n        this.animIdle = new _TiledImage_js__WEBPACK_IMPORTED_MODULE_1__.TiledImage('../../images/sprite/player_idle.png', columnCount, rowCount, refreshDelay, loopColum, scale)\r\n        this.animIdle.changeRow(0)\r\n        this.animIdle.changeMinMaxInterval(0, columnCount)\r\n            \r\n        \r\n    }\r\n\r\n\r\n}\n\n//# sourceURL=webpack://shift/./public/javascripts/sprites/player.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./public/javascripts/adventure.js");
/******/ 	
/******/ })()
;