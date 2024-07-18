import {
  Platform,
  coerceBooleanProperty,
  coerceElement,
  coerceNumberProperty,
  getRtlScrollAxisType
} from "./chunk-H6YKZX5K.js";
import {
  DOCUMENT,
  NgIf,
  isPlatformBrowser
} from "./chunk-Z7GKBTTO.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  InputFlags,
  NgModule,
  NgZone,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-WA5BNMZF.js";
import "./chunk-SAVXX6OM.js";
import {
  animationFrameScheduler,
  fromEvent,
  merge
} from "./chunk-SG3BCSKH.js";
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  Subscription,
  auditTime,
  debounceTime,
  distinctUntilChanged,
  expand,
  filter,
  finalize,
  map,
  mergeMap,
  of,
  pairwise,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap
} from "./chunk-PQ7O3X3G.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-UQ2RIRR7.js";

// node_modules/@angular/cdk/fesm2022/bidi.mjs
var DIR_DOCUMENT = new InjectionToken("cdk-dir-doc", {
  providedIn: "root",
  factory: DIR_DOCUMENT_FACTORY
});
function DIR_DOCUMENT_FACTORY() {
  return inject(DOCUMENT);
}
var RTL_LOCALE_PATTERN = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function _resolveDirectionality(rawValue) {
  const value = rawValue?.toLowerCase() || "";
  if (value === "auto" && typeof navigator !== "undefined" && navigator?.language) {
    return RTL_LOCALE_PATTERN.test(navigator.language) ? "rtl" : "ltr";
  }
  return value === "rtl" ? "rtl" : "ltr";
}
var _Directionality = class _Directionality {
  constructor(_document) {
    this.value = "ltr";
    this.change = new EventEmitter();
    if (_document) {
      const bodyDir = _document.body ? _document.body.dir : null;
      const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
      this.value = _resolveDirectionality(bodyDir || htmlDir || "ltr");
    }
  }
  ngOnDestroy() {
    this.change.complete();
  }
};
_Directionality.ɵfac = function Directionality_Factory(t) {
  return new (t || _Directionality)(ɵɵinject(DIR_DOCUMENT, 8));
};
_Directionality.ɵprov = ɵɵdefineInjectable({
  token: _Directionality,
  factory: _Directionality.ɵfac,
  providedIn: "root"
});
var Directionality = _Directionality;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Directionality, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DIR_DOCUMENT]
    }]
  }], null);
})();
var _Dir = class _Dir {
  constructor() {
    this._dir = "ltr";
    this._isInitialized = false;
    this.change = new EventEmitter();
  }
  /** @docs-private */
  get dir() {
    return this._dir;
  }
  set dir(value) {
    const previousValue = this._dir;
    this._dir = _resolveDirectionality(value);
    this._rawDir = value;
    if (previousValue !== this._dir && this._isInitialized) {
      this.change.emit(this._dir);
    }
  }
  /** Current layout direction of the element. */
  get value() {
    return this.dir;
  }
  /** Initialize once default value has been set. */
  ngAfterContentInit() {
    this._isInitialized = true;
  }
  ngOnDestroy() {
    this.change.complete();
  }
};
_Dir.ɵfac = function Dir_Factory(t) {
  return new (t || _Dir)();
};
_Dir.ɵdir = ɵɵdefineDirective({
  type: _Dir,
  selectors: [["", "dir", ""]],
  hostVars: 1,
  hostBindings: function Dir_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("dir", ctx._rawDir);
    }
  },
  inputs: {
    dir: "dir"
  },
  outputs: {
    change: "dirChange"
  },
  exportAs: ["dir"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: Directionality,
    useExisting: _Dir
  }])]
});
var Dir = _Dir;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dir, [{
    type: Directive,
    args: [{
      selector: "[dir]",
      providers: [{
        provide: Directionality,
        useExisting: Dir
      }],
      host: {
        "[attr.dir]": "_rawDir"
      },
      exportAs: "dir",
      standalone: true
    }]
  }], null, {
    change: [{
      type: Output,
      args: ["dirChange"]
    }],
    dir: [{
      type: Input
    }]
  });
})();
var _BidiModule = class _BidiModule {
};
_BidiModule.ɵfac = function BidiModule_Factory(t) {
  return new (t || _BidiModule)();
};
_BidiModule.ɵmod = ɵɵdefineNgModule({
  type: _BidiModule,
  imports: [Dir],
  exports: [Dir]
});
_BidiModule.ɵinj = ɵɵdefineInjector({});
var BidiModule = _BidiModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BidiModule, [{
    type: NgModule,
    args: [{
      imports: [Dir],
      exports: [Dir]
    }]
  }], null, null);
})();

// node_modules/ngx-scrollbar/fesm2022/ngx-scrollbar-smooth-scroll.mjs
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 1e-3;
var SUBDIVISION_PRECISION = 1e-7;
var SUBDIVISION_MAX_ITERATIONS = 10;
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
var float32ArraySupported = typeof Float32Array === "function";
function A(aA1, aA2) {
  return 1 - 3 * aA2 + 3 * aA1;
}
function B(aA1, aA2) {
  return 3 * aA2 - 6 * aA1;
}
function C(aA1) {
  return 3 * aA1;
}
function calcBezier(aT, aA1, aA2) {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}
function getSlope(aT, aA1, aA2) {
  return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
}
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
    let currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    let currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
function LinearEasing(x) {
  return x;
}
function bezier(mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error("bezier x values must be in [0, 1] range");
  }
  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }
  let sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    let lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    let dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    let guessForT = intervalStart + dist * kSampleStepSize;
    let initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return function BezierEasing(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
}
var SMOOTH_SCROLL_OPTIONS = new InjectionToken("SMOOTH_SCROLL_OPTIONS");
var _SmoothScrollManager = class _SmoothScrollManager {
  get _w() {
    return this._document.defaultView;
  }
  /**
   * Timing method
   */
  get _now() {
    return this._w.performance && this._w.performance.now ? this._w.performance.now.bind(this._w.performance) : Date.now;
  }
  constructor(_document, _platform, customDefaultOptions) {
    this._document = _document;
    this._platform = _platform;
    this._onGoingScrolls = /* @__PURE__ */ new Map();
    this._defaultOptions = __spreadValues({
      duration: 468,
      easing: {
        x1: 0.42,
        y1: 0,
        x2: 0.58,
        y2: 1
      }
    }, customDefaultOptions);
  }
  /**
   * changes scroll position inside an element
   */
  _scrollElement(el, x, y) {
    el.scrollLeft = x;
    el.scrollTop = y;
  }
  /**
   * Handles a given parameter of type HTMLElement, ElementRef or selector
   */
  _getElement(el, parent) {
    if (typeof el === "string") {
      return (parent || this._document).querySelector(el);
    }
    return coerceElement(el);
  }
  /**
   * Initializes a destroyer stream, re-initializes it if the element is already being scrolled
   */
  _initSmoothScroll(el) {
    if (this._onGoingScrolls.has(el)) {
      this._onGoingScrolls.get(el).next();
    }
    return this._onGoingScrolls.set(el, new Subject()).get(el);
  }
  /**
   * Checks if smooth scroll has reached, cleans up the smooth scroll stream and resolves its promise
   */
  _isFinished(context, destroyed, resolve) {
    if (context.currentX !== context.x || context.currentY !== context.y) {
      return true;
    }
    destroyed.next();
    resolve();
    return false;
  }
  /**
   * Terminates an ongoing smooth scroll
   */
  _interrupted(el, destroyed) {
    return merge(fromEvent(el, "wheel", {
      passive: true,
      capture: true
    }), fromEvent(el, "touchmove", {
      passive: true,
      capture: true
    }), destroyed).pipe(take(1));
  }
  /**
   * Deletes the destroyer function, runs if the smooth scroll has finished or interrupted
   */
  _destroy(el, destroyed) {
    destroyed.complete();
    this._onGoingScrolls.delete(el);
  }
  /**
   * A function called recursively that, given a context, steps through scrolling
   */
  _step(context) {
    return new Observable((subscriber) => {
      let elapsed = (this._now() - context.startTime) / context.duration;
      elapsed = elapsed > 1 ? 1 : elapsed;
      const value = context.easing(elapsed);
      context.currentX = context.startX + (context.x - context.startX) * value;
      context.currentY = context.startY + (context.y - context.startY) * value;
      this._scrollElement(context.scrollable, context.currentX, context.currentY);
      animationFrameScheduler.schedule(() => subscriber.next(context));
    });
  }
  _applyScrollToOptions(el, options) {
    if (!options.duration) {
      this._scrollElement(el, options.left, options.top);
      return Promise.resolve();
    }
    const destroyed = this._initSmoothScroll(el);
    const context = {
      scrollable: el,
      startTime: this._now(),
      startX: el.scrollLeft,
      startY: el.scrollTop,
      x: options.left == null ? el.scrollLeft : ~~options.left,
      y: options.top == null ? el.scrollTop : ~~options.top,
      duration: options.duration,
      easing: bezier(options.easing.x1, options.easing.y1, options.easing.x2, options.easing.y2)
    };
    return new Promise((resolve) => {
      of(null).pipe(expand(() => this._step(context).pipe(takeWhile((currContext) => this._isFinished(currContext, destroyed, resolve)))), takeUntil(this._interrupted(el, destroyed)), finalize(() => this._destroy(el, destroyed))).subscribe();
    });
  }
  /**
   * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
   * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param scrollable element
   * @param customOptions specified the offsets to scroll to.
   */
  scrollTo(scrollable, customOptions) {
    if (isPlatformBrowser(this._platform)) {
      const el = this._getElement(scrollable);
      const isRtl = getComputedStyle(el).direction === "rtl";
      const rtlScrollAxisType = getRtlScrollAxisType();
      const options = __spreadValues(__spreadValues(__spreadValues({}, this._defaultOptions), customOptions), {
        // Rewrite start & end offsets as right or left offsets.
        left: customOptions.left == null ? isRtl ? customOptions.end : customOptions.start : customOptions.left,
        right: customOptions.right == null ? isRtl ? customOptions.start : customOptions.end : customOptions.right
      });
      if (options.bottom != null) {
        options.top = el.scrollHeight - el.clientHeight - options.bottom;
      }
      if (isRtl && rtlScrollAxisType !== 0) {
        if (options.left != null) {
          options.right = el.scrollWidth - el.clientWidth - options.left;
        }
        if (rtlScrollAxisType === 2) {
          options.left = options.right;
        } else if (rtlScrollAxisType === 1) {
          options.left = options.right ? -options.right : options.right;
        }
      } else {
        if (options.right != null) {
          options.left = el.scrollWidth - el.clientWidth - options.right;
        }
      }
      return this._applyScrollToOptions(el, options);
    }
    return Promise.resolve();
  }
  /**
   * Scroll to element by reference or selector
   */
  scrollToElement(scrollable, target, customOptions = {}) {
    const scrollableEl = this._getElement(scrollable);
    const targetEl = this._getElement(target, scrollableEl);
    const options = __spreadValues(__spreadValues({}, customOptions), {
      left: targetEl.offsetLeft + (customOptions.left || 0),
      top: targetEl.offsetTop + (customOptions.top || 0)
    });
    return targetEl ? this.scrollTo(scrollableEl, options) : Promise.resolve();
  }
};
_SmoothScrollManager.ɵfac = function SmoothScrollManager_Factory(t) {
  return new (t || _SmoothScrollManager)(ɵɵinject(DOCUMENT), ɵɵinject(PLATFORM_ID), ɵɵinject(SMOOTH_SCROLL_OPTIONS, 8));
};
_SmoothScrollManager.ɵprov = ɵɵdefineInjectable({
  token: _SmoothScrollManager,
  factory: _SmoothScrollManager.ɵfac,
  providedIn: "root"
});
var SmoothScrollManager = _SmoothScrollManager;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SmoothScrollManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [SMOOTH_SCROLL_OPTIONS]
      }]
    }];
  }, null);
})();
var _SmoothScroll = class _SmoothScroll {
  constructor(element, smoothScroll) {
    this.element = element;
    this.smoothScroll = smoothScroll;
  }
  scrollTo(options) {
    return this.smoothScroll.scrollTo(this.element, options);
  }
  scrollToElement(target, options) {
    return this.smoothScroll.scrollToElement(this.element, target, options);
  }
};
_SmoothScroll.ɵfac = function SmoothScroll_Factory(t) {
  return new (t || _SmoothScroll)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SmoothScrollManager));
};
_SmoothScroll.ɵdir = ɵɵdefineDirective({
  type: _SmoothScroll,
  selectors: [["", "smoothScroll", ""], ["", "smooth-scroll", ""]],
  exportAs: ["smoothScroll"],
  standalone: true
});
var SmoothScroll = _SmoothScroll;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SmoothScroll, [{
    type: Directive,
    args: [{
      selector: "[smoothScroll], [smooth-scroll]",
      exportAs: "smoothScroll",
      standalone: true
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: SmoothScrollManager
    }];
  }, null);
})();

// node_modules/ngx-scrollbar/fesm2022/ngx-scrollbar.mjs
var _c0 = ["scrollbarY"];
var _c1 = ["scrollbarX"];
var _c2 = ["*"];
function NgScrollbar_ng_container_5_scrollbar_x_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "scrollbar-x", null, 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵattribute("scrollable", ctx_r0.state.isHorizontallyScrollable)("fit", ctx_r0.state.verticalUsed);
  }
}
function NgScrollbar_ng_container_5_scrollbar_y_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "scrollbar-y", null, 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵattribute("scrollable", ctx_r0.state.isVerticallyScrollable)("fit", ctx_r0.state.horizontalUsed);
  }
}
function NgScrollbar_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NgScrollbar_ng_container_5_scrollbar_x_1_Template, 2, 2, "scrollbar-x", 5)(2, NgScrollbar_ng_container_5_scrollbar_y_2_Template, 2, 2, "scrollbar-y", 5);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.state.horizontalUsed);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.state.verticalUsed);
  }
}
var _NgAttr = class _NgAttr {
  constructor(el) {
    this.el = el;
  }
  set ngAttr(attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      this.el.nativeElement.setAttribute(key, value);
    }
  }
};
_NgAttr.ɵfac = function NgAttr_Factory(t) {
  return new (t || _NgAttr)(ɵɵdirectiveInject(ElementRef));
};
_NgAttr.ɵdir = ɵɵdefineDirective({
  type: _NgAttr,
  selectors: [["", "ngAttr", ""]],
  inputs: {
    ngAttr: "ngAttr"
  },
  standalone: true
});
var NgAttr = _NgAttr;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgAttr, [{
    type: Directive,
    args: [{
      selector: "[ngAttr]",
      standalone: true
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    ngAttr: [{
      type: Input
    }]
  });
})();
function preventSelection(doc) {
  return tap(() => {
    doc.onselectstart = () => false;
  });
}
function enableSelection(doc) {
  return tap(() => {
    doc.onselectstart = null;
  });
}
function stopPropagation() {
  return tap((e) => e.stopPropagation());
}
function isWithinBounds(e, rect) {
  return e.clientX >= rect.left && e.clientX <= rect.left + rect.width && e.clientY >= rect.top && e.clientY <= rect.top + rect.height;
}
var _ScrollViewport = class _ScrollViewport {
  // Get viewport size, clientHeight or clientWidth
  get clientHeight() {
    return this.nativeElement.clientHeight;
  }
  get clientWidth() {
    return this.nativeElement.clientWidth;
  }
  get scrollHeight() {
    return this.nativeElement.scrollHeight;
  }
  get scrollWidth() {
    return this.nativeElement.scrollWidth;
  }
  // Get viewport scroll offset, scrollTop or scrollLeft
  get scrollTop() {
    return this.nativeElement.scrollTop;
  }
  get scrollLeft() {
    return this.nativeElement.scrollLeft;
  }
  // Get the available scrollable size
  get scrollMaxX() {
    return this.scrollWidth - this.clientWidth;
  }
  get scrollMaxY() {
    return this.scrollHeight - this.clientHeight;
  }
  get contentHeight() {
    return this.contentWrapperElement?.clientHeight || 0;
  }
  get contentWidth() {
    return this.contentWrapperElement?.clientWidth || 0;
  }
  constructor(viewPort) {
    this.viewPort = viewPort;
    this.nativeElement = viewPort.nativeElement;
  }
  /**
   * Activate viewport pointer events such as 'hovered' and 'clicked' events
   */
  activatePointerEvents(propagate, destroyed) {
    this.hovered = new Observable((subscriber) => {
      const mouseMoveStream = fromEvent(this.nativeElement, "mousemove", {
        passive: true
      });
      const mouseMove = propagate ? mouseMoveStream : mouseMoveStream.pipe(stopPropagation());
      const mouseLeave = fromEvent(this.nativeElement, "mouseleave", {
        passive: true
      }).pipe(map(() => false));
      merge(mouseMove, mouseLeave).pipe(tap((e) => subscriber.next(e)), takeUntil(destroyed)).subscribe();
    });
    this.clicked = new Observable((subscriber) => {
      const mouseDown = fromEvent(this.nativeElement, "mousedown", {
        passive: true
      }).pipe(tap((e) => subscriber.next(e)));
      const mouseUp = fromEvent(this.nativeElement, "mouseup", {
        passive: true
      }).pipe(tap(() => subscriber.next(false)));
      mouseDown.pipe(switchMap(() => mouseUp), takeUntil(destroyed)).subscribe();
    });
  }
  /**
   * Set this directive as a non-functional wrapper, called when a custom viewport is used
   */
  setAsWrapper() {
    this.nativeElement.className = "ng-native-scrollbar-hider ng-scroll-layer";
    if (this.nativeElement.firstElementChild) {
      this.nativeElement.firstElementChild.className = "ng-scroll-layer";
    }
  }
  /**
   * Set this directive as  the viewport, called when no custom viewport is used
   */
  setAsViewport(customClassName) {
    this.nativeElement.className += ` ng-native-scrollbar-hider ng-scroll-viewport ${customClassName}`;
    if (this.nativeElement.firstElementChild) {
      this.contentWrapperElement = this.nativeElement.firstElementChild;
      this.contentWrapperElement.classList.add("ng-scroll-content");
    }
  }
  /**
   * Scroll viewport vertically
   */
  scrollYTo(value) {
    this.nativeElement.scrollTop = value;
  }
  /**
   * Scroll viewport horizontally
   */
  scrollXTo(value) {
    this.nativeElement.scrollLeft = value;
  }
};
_ScrollViewport.ɵfac = function ScrollViewport_Factory(t) {
  return new (t || _ScrollViewport)(ɵɵdirectiveInject(ElementRef));
};
_ScrollViewport.ɵdir = ɵɵdefineDirective({
  type: _ScrollViewport,
  selectors: [["", "scrollViewport", ""]],
  standalone: true
});
var ScrollViewport = _ScrollViewport;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollViewport, [{
    type: Directive,
    args: [{
      selector: "[scrollViewport]",
      standalone: true
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, null);
})();
var _NgScrollbarBase = class _NgScrollbarBase {
};
_NgScrollbarBase.ɵfac = function NgScrollbarBase_Factory(t) {
  return new (t || _NgScrollbarBase)();
};
_NgScrollbarBase.ɵdir = ɵɵdefineDirective({
  type: _NgScrollbarBase
});
var NgScrollbarBase = _NgScrollbarBase;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarBase, [{
    type: Directive
  }], null, null);
})();
var _TrackAdapter = class _TrackAdapter {
  // Stream that emits when the track element is clicked
  get clicked() {
    const mouseDown = fromEvent(this.trackElement, "mousedown", {
      passive: true
    }).pipe(stopPropagation(), preventSelection(this.document));
    const mouseup = fromEvent(this.document, "mouseup", {
      passive: true
    }).pipe(stopPropagation(), enableSelection(this.document), switchMap(() => EMPTY));
    return merge(mouseDown, mouseup);
  }
  // Get track client rect
  get clientRect() {
    return this.trackElement.getBoundingClientRect();
  }
  constructor(cmp, trackElement, document) {
    this.cmp = cmp;
    this.trackElement = trackElement;
    this.document = document;
  }
  /**
   * Stream that emits when scrollbar track is clicked
   */
  onTrackClicked(e, thumbSize, scrollSize) {
    return of(e).pipe(
      map((e2) => e2[this.pageProperty]),
      // Calculate scrollTo position
      map((pageOffset) => {
        const clickOffset = pageOffset - this.offset;
        const offset = clickOffset - thumbSize / 2;
        const ratio = offset / this.size;
        return ratio * scrollSize;
      }),
      // Smooth scroll to position
      tap((value) => {
        this.cmp.scrollTo(__spreadProps(__spreadValues({}, this.mapToScrollToOption(value)), {
          duration: coerceNumberProperty(this.cmp.trackClickScrollDuration)
        }));
      })
    );
  }
};
_TrackAdapter.ɵfac = function TrackAdapter_Factory(t) {
  return new (t || _TrackAdapter)(ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(HTMLElement), ɵɵdirectiveInject(Document));
};
_TrackAdapter.ɵdir = ɵɵdefineDirective({
  type: _TrackAdapter
});
var TrackAdapter = _TrackAdapter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrackAdapter, [{
    type: Directive
  }], function() {
    return [{
      type: NgScrollbarBase
    }, {
      type: HTMLElement
    }, {
      type: Document
    }];
  }, null);
})();
var _TrackXDirective = class _TrackXDirective extends TrackAdapter {
  get pageProperty() {
    return "pageX";
  }
  get offset() {
    return this.clientRect.left;
  }
  get size() {
    return this.trackElement.clientWidth;
  }
  constructor(cmp, trackElement, document) {
    super(cmp, trackElement.nativeElement, document);
    this.cmp = cmp;
    this.document = document;
  }
  mapToScrollToOption(value) {
    return {
      left: value
    };
  }
};
_TrackXDirective.ɵfac = function TrackXDirective_Factory(t) {
  return new (t || _TrackXDirective)(ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT));
};
_TrackXDirective.ɵdir = ɵɵdefineDirective({
  type: _TrackXDirective,
  selectors: [["", "scrollbarTrackX", ""]],
  standalone: true,
  features: [ɵɵInheritDefinitionFeature]
});
var TrackXDirective = _TrackXDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrackXDirective, [{
    type: Directive,
    args: [{
      selector: "[scrollbarTrackX]",
      standalone: true
    }]
  }], function() {
    return [{
      type: NgScrollbarBase
    }, {
      type: ElementRef
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var _TrackYDirective = class _TrackYDirective extends TrackAdapter {
  get pageProperty() {
    return "pageY";
  }
  get offset() {
    return this.clientRect.top;
  }
  get size() {
    return this.trackElement.clientHeight;
  }
  constructor(cmp, trackElement, document) {
    super(cmp, trackElement.nativeElement, document);
    this.cmp = cmp;
    this.document = document;
  }
  mapToScrollToOption(value) {
    return {
      top: value
    };
  }
};
_TrackYDirective.ɵfac = function TrackYDirective_Factory(t) {
  return new (t || _TrackYDirective)(ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT));
};
_TrackYDirective.ɵdir = ɵɵdefineDirective({
  type: _TrackYDirective,
  selectors: [["", "scrollbarTrackY", ""]],
  standalone: true,
  features: [ɵɵInheritDefinitionFeature]
});
var TrackYDirective = _TrackYDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrackYDirective, [{
    type: Directive,
    args: [{
      selector: "[scrollbarTrackY]",
      standalone: true
    }]
  }], function() {
    return [{
      type: NgScrollbarBase
    }, {
      type: ElementRef
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var _ThumbAdapter = class _ThumbAdapter {
  get trackMax() {
    return this.track.size - this.size;
  }
  // Get thumb client rect
  get clientRect() {
    return this.thumbElement.getBoundingClientRect();
  }
  // Stream that emits when scrollbar thumb is clicked
  get clicked() {
    return fromEvent(this.thumbElement, "mousedown", {
      passive: true
    }).pipe(stopPropagation());
  }
  constructor(cmp, track, thumbElement, document) {
    this.cmp = cmp;
    this.track = track;
    this.thumbElement = thumbElement;
    this.document = document;
    this._dragging = new Subject();
    this.dragging = this._dragging.pipe(distinctUntilChanged());
  }
  // Calculate and update thumb position and size
  update() {
    const size = calculateThumbSize(this.track.size, this.viewportScrollSize, this.cmp.minThumbSize);
    const position = calculateThumbPosition(this.viewportScrollOffset, this.viewportScrollMax, this.trackMax);
    animationFrameScheduler.schedule(() => this.updateStyles(this.handleDirection(position, this.trackMax), size));
  }
  /**
   * Stream that emits the 'scrollTo' position when a scrollbar thumb element is dragged
   * This function is called by thumb drag event using viewport or scrollbar pointer events
   */
  dragged(event) {
    let trackMaxStart;
    let scrollMaxStart;
    const dragStart = of(event).pipe(preventSelection(this.document), tap(() => {
      trackMaxStart = this.trackMax;
      scrollMaxStart = this.viewportScrollMax;
      this.setDragging(true);
    }));
    const dragging = fromEvent(this.document, "mousemove", {
      capture: true,
      passive: true
    }).pipe(stopPropagation());
    const dragEnd = fromEvent(this.document, "mouseup", {
      capture: true
    }).pipe(stopPropagation(), enableSelection(this.document), tap(() => this.setDragging(false)));
    return dragStart.pipe(map((e) => e[this.pageProperty]), map((pageOffset) => pageOffset - this.dragStartOffset), mergeMap((mouseDownOffset) => dragging.pipe(
      map((e) => e[this.clientProperty]),
      // Calculate how far the pointer is from the top/left of the scrollbar (minus the dragOffset).
      map((mouseOffset) => mouseOffset - this.track.offset),
      map((offset) => scrollMaxStart * (offset - mouseDownOffset) / trackMaxStart),
      map((position) => this.handleDrag(position, scrollMaxStart)),
      tap((position) => this.scrollTo(position)),
      takeUntil(dragEnd)
    )));
  }
};
_ThumbAdapter.ɵfac = function ThumbAdapter_Factory(t) {
  return new (t || _ThumbAdapter)(ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(TrackAdapter), ɵɵdirectiveInject(HTMLElement), ɵɵdirectiveInject(Document));
};
_ThumbAdapter.ɵdir = ɵɵdefineDirective({
  type: _ThumbAdapter,
  outputs: {
    dragging: "dragging"
  }
});
var ThumbAdapter = _ThumbAdapter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThumbAdapter, [{
    type: Directive
  }], function() {
    return [{
      type: NgScrollbarBase
    }, {
      type: TrackAdapter
    }, {
      type: HTMLElement
    }, {
      type: Document
    }];
  }, {
    dragging: [{
      type: Output
    }]
  });
})();
function calculateThumbSize(trackSize, contentSize, minThumbSize) {
  const scrollbarRatio = trackSize / contentSize;
  const thumbSize = scrollbarRatio * trackSize;
  return Math.max(~~thumbSize, minThumbSize);
}
function calculateThumbPosition(scrollPosition, scrollMax, trackMax) {
  return scrollPosition * trackMax / scrollMax;
}
var _ThumbXDirective = class _ThumbXDirective extends ThumbAdapter {
  get clientProperty() {
    return "clientX";
  }
  get pageProperty() {
    return "pageX";
  }
  get viewportScrollSize() {
    return this.cmp.viewport.scrollWidth;
  }
  get viewportScrollOffset() {
    return this.cmp.viewport.scrollLeft;
  }
  get viewportScrollMax() {
    return this.cmp.viewport.scrollMaxX;
  }
  get dragStartOffset() {
    return this.clientRect.left + this.document.defaultView.pageXOffset || 0;
  }
  get size() {
    return this.thumbElement.clientWidth;
  }
  constructor(cmp, track, element, document, dir) {
    super(cmp, track, element.nativeElement, document);
    this.cmp = cmp;
    this.track = track;
    this.element = element;
    this.document = document;
    this.dir = dir;
  }
  updateStyles(position, size) {
    this.thumbElement.style.width = `${size}px`;
    this.thumbElement.style.transform = `translate3d(${position}px, 0, 0)`;
  }
  handleDrag(position, scrollMax) {
    if (this.dir.value === "rtl") {
      if (this.cmp.manager.rtlScrollAxisType === 1) {
        return position - scrollMax;
      }
      if (this.cmp.manager.rtlScrollAxisType === 2) {
        return scrollMax - position;
      }
    }
    return position;
  }
  handleDirection(position, trackMax) {
    if (this.dir.value === "rtl") {
      if (this.cmp.manager.rtlScrollAxisType === 2) {
        return -position;
      }
      if (this.cmp.manager.rtlScrollAxisType === 0) {
        return position - trackMax;
      }
    }
    return position;
  }
  setDragging(value) {
    this.cmp.setDragging({
      horizontalDragging: value
    });
  }
  scrollTo(position) {
    this.cmp.viewport.scrollXTo(position);
  }
};
_ThumbXDirective.ɵfac = function ThumbXDirective_Factory(t) {
  return new (t || _ThumbXDirective)(ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(TrackXDirective), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(Directionality));
};
_ThumbXDirective.ɵdir = ɵɵdefineDirective({
  type: _ThumbXDirective,
  selectors: [["", "scrollbarThumbX", ""]],
  standalone: true,
  features: [ɵɵInheritDefinitionFeature]
});
var ThumbXDirective = _ThumbXDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThumbXDirective, [{
    type: Directive,
    args: [{
      selector: "[scrollbarThumbX]",
      standalone: true
    }]
  }], function() {
    return [{
      type: NgScrollbarBase
    }, {
      type: TrackXDirective
    }, {
      type: ElementRef
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: Directionality
    }];
  }, null);
})();
var _ThumbYDirective = class _ThumbYDirective extends ThumbAdapter {
  get pageProperty() {
    return "pageY";
  }
  get viewportScrollSize() {
    return this.cmp.viewport.scrollHeight;
  }
  get viewportScrollOffset() {
    return this.cmp.viewport.scrollTop;
  }
  get viewportScrollMax() {
    return this.cmp.viewport.scrollMaxY;
  }
  get clientProperty() {
    return "clientY";
  }
  get dragStartOffset() {
    return this.clientRect.top + this.document.defaultView.pageYOffset || 0;
  }
  get size() {
    return this.thumbElement.clientHeight;
  }
  constructor(cmp, track, element, document) {
    super(cmp, track, element.nativeElement, document);
    this.cmp = cmp;
    this.track = track;
    this.element = element;
    this.document = document;
  }
  updateStyles(position, size) {
    this.thumbElement.style.height = `${size}px`;
    this.thumbElement.style.transform = `translate3d(0px, ${position}px, 0)`;
  }
  handleDrag(position) {
    return position;
  }
  handleDirection(position) {
    return position;
  }
  setDragging(value) {
    this.cmp.setDragging({
      verticalDragging: value
    });
  }
  scrollTo(position) {
    this.cmp.viewport.scrollYTo(position);
  }
};
_ThumbYDirective.ɵfac = function ThumbYDirective_Factory(t) {
  return new (t || _ThumbYDirective)(ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(TrackYDirective), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT));
};
_ThumbYDirective.ɵdir = ɵɵdefineDirective({
  type: _ThumbYDirective,
  selectors: [["", "scrollbarThumbY", ""]],
  standalone: true,
  features: [ɵɵInheritDefinitionFeature]
});
var ThumbYDirective = _ThumbYDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThumbYDirective, [{
    type: Directive,
    args: [{
      selector: "[scrollbarThumbY]",
      standalone: true
    }]
  }], function() {
    return [{
      type: NgScrollbarBase
    }, {
      type: TrackYDirective
    }, {
      type: ElementRef
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var _Scrollbar = class _Scrollbar {
  constructor(el, cmp, platform, document, zone) {
    this.el = el;
    this.cmp = cmp;
    this.platform = platform;
    this.document = document;
    this.zone = zone;
    this.destroyed = new Subject();
  }
  /**
   * Activate scrollbar pointer events
   */
  activatePointerEvents() {
    let thumbDragEvent;
    let trackClickEvent;
    let trackHoveredEvent;
    if (this.cmp.pointerEventsMethod === "viewport") {
      this.viewportTrackClicked = new Subject();
      this.viewportThumbClicked = new Subject();
      this.cmp.viewport.activatePointerEvents(this.cmp.viewportPropagateMouseMove, this.destroyed);
      thumbDragEvent = this.viewportThumbClicked;
      trackClickEvent = this.viewportTrackClicked;
      trackHoveredEvent = this.cmp.viewport.hovered.pipe(
        // Check if track is hovered
        map((e) => e ? isWithinBounds(e, this.el.getBoundingClientRect()) : false),
        distinctUntilChanged(),
        // Enable / disable text selection
        tap((hovered) => this.document.onselectstart = hovered ? () => false : null)
      );
      this.cmp.viewport.clicked.pipe(tap((e) => {
        if (e) {
          if (isWithinBounds(e, this.thumb.clientRect)) {
            this.viewportThumbClicked.next(e);
          } else if (isWithinBounds(e, this.track.clientRect)) {
            this.cmp.setClicked(true);
            this.viewportTrackClicked.next(e);
          }
        } else {
          this.cmp.setClicked(false);
        }
      }), takeUntil(this.destroyed)).subscribe();
    } else {
      thumbDragEvent = this.thumb.clicked;
      trackClickEvent = this.track.clicked;
      trackHoveredEvent = this.hovered;
    }
    return merge(
      // Activate scrollbar hovered event
      trackHoveredEvent.pipe(tap((e) => this.setHovered(e))),
      // Activate scrollbar thumb drag event
      thumbDragEvent.pipe(switchMap((e) => this.thumb.dragged(e))),
      // Activate scrollbar track click event
      trackClickEvent.pipe(switchMap((e) => this.track.onTrackClicked(e, this.thumb.size, this.viewportScrollSize)))
    );
  }
  // Stream that emits when the track element is hovered
  get hovered() {
    const mouseEnter = fromEvent(this.el, "mouseenter", {
      passive: true
    }).pipe(stopPropagation(), map(() => true));
    const mouseLeave = fromEvent(this.el, "mouseleave", {
      passive: true
    }).pipe(stopPropagation(), map(() => false));
    return merge(mouseEnter, mouseLeave);
  }
  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      if (!(this.platform.IOS || this.platform.ANDROID) && !this.cmp.pointerEventsDisabled) {
        this.activatePointerEvents().pipe(takeUntil(this.destroyed)).subscribe();
      }
      merge(this.cmp.scrolled, this.cmp.updated).pipe(tap(() => this.thumb?.update()), takeUntil(this.destroyed)).subscribe();
    });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    if (this.viewportThumbClicked && this.viewportTrackClicked) {
      this.viewportTrackClicked.complete();
      this.viewportThumbClicked.complete();
    }
  }
};
_Scrollbar.ɵfac = function Scrollbar_Factory(t) {
  return new (t || _Scrollbar)(ɵɵdirectiveInject(HTMLElement), ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(Document), ɵɵdirectiveInject(NgZone));
};
_Scrollbar.ɵdir = ɵɵdefineDirective({
  type: _Scrollbar
});
var Scrollbar = _Scrollbar;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Scrollbar, [{
    type: Directive
  }], function() {
    return [{
      type: HTMLElement
    }, {
      type: NgScrollbarBase
    }, {
      type: Platform
    }, {
      type: Document
    }, {
      type: NgZone
    }];
  }, null);
})();
var _ScrollbarY = class _ScrollbarY extends Scrollbar {
  get viewportScrollSize() {
    return this.cmp.viewport.scrollHeight;
  }
  constructor(el, cmp, platform, document, zone) {
    super(el.nativeElement, cmp, platform, document, zone);
    this.cmp = cmp;
    this.platform = platform;
    this.document = document;
    this.zone = zone;
  }
  setHovered(value) {
    this.cmp.setHovered({
      verticalHovered: value
    });
  }
};
_ScrollbarY.ɵfac = function ScrollbarY_Factory(t) {
  return new (t || _ScrollbarY)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(NgZone));
};
_ScrollbarY.ɵcmp = ɵɵdefineComponent({
  type: _ScrollbarY,
  selectors: [["scrollbar-y"]],
  viewQuery: function ScrollbarY_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(TrackYDirective, 7);
      ɵɵviewQuery(ThumbYDirective, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.track = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.thumb = _t.first);
    }
  },
  hostVars: 2,
  hostBindings: function ScrollbarY_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("scrollbar-control", true);
    }
  },
  standalone: true,
  features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
  decls: 2,
  vars: 6,
  consts: [["scrollbarTrackY", ""], ["scrollbarThumbY", ""]],
  template: function ScrollbarY_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵelement(1, "div", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassMapInterpolate1("ng-scrollbar-track ", ctx.cmp.trackClass, "");
      ɵɵadvance();
      ɵɵclassMapInterpolate1("ng-scrollbar-thumb ", ctx.cmp.thumbClass, "");
    }
  },
  dependencies: [TrackYDirective, ThumbYDirective],
  styles: [".ng-scrollbar-wrapper>scrollbar-y.scrollbar-control{width:var(--vertical-scrollbar-total-size)}  .ng-scrollbar-wrapper>scrollbar-y.scrollbar-control>.ng-scrollbar-track{width:var(--vertical-scrollbar-size);height:calc(100% - var(--scrollbar-padding) * 2)}  .ng-scrollbar-wrapper>scrollbar-y.scrollbar-control>.ng-scrollbar-track>.ng-scrollbar-thumb{height:0;width:100%}  .ng-scrollbar-wrapper[verticalHovered=true]>scrollbar-y.scrollbar-control .ng-scrollbar-thumb,   .ng-scrollbar-wrapper[verticalDragging=true]>scrollbar-y.scrollbar-control .ng-scrollbar-thumb{background-color:var(--scrollbar-thumb-hover-color)}  .ng-scrollbar-wrapper[deactivated=false]>scrollbar-y.scrollbar-control{top:0;bottom:0}  .ng-scrollbar-wrapper[deactivated=false][dir=ltr]>scrollbar-y.scrollbar-control{right:0;left:unset}  .ng-scrollbar-wrapper[deactivated=false][dir=ltr][position=invertY]>scrollbar-y.scrollbar-control,   .ng-scrollbar-wrapper[deactivated=false][dir=ltr][position=invertAll]>scrollbar-y.scrollbar-control{left:0;right:unset}  .ng-scrollbar-wrapper[deactivated=false][dir=rtl]>scrollbar-y.scrollbar-control{left:0;right:unset}  .ng-scrollbar-wrapper[deactivated=false][dir=rtl][position=invertY]>scrollbar-y.scrollbar-control,   .ng-scrollbar-wrapper[deactivated=false][dir=rtl][position=invertAll]>scrollbar-y.scrollbar-control{left:unset;right:0}  .ng-scrollbar-wrapper[deactivated=false][track=all]>scrollbar-y.scrollbar-control[fit=true]{bottom:var(--scrollbar-total-size);top:0}  .ng-scrollbar-wrapper[deactivated=false][track=all][position=invertX]>scrollbar-y.scrollbar-control[fit=true],   .ng-scrollbar-wrapper[deactivated=false][track=all][position=invertAll]>scrollbar-y.scrollbar-control[fit=true]{top:var(--scrollbar-total-size);bottom:0}"],
  changeDetection: 0
});
var ScrollbarY = _ScrollbarY;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarY, [{
    type: Component,
    args: [{
      selector: "scrollbar-y",
      host: {
        "[class.scrollbar-control]": "true"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div scrollbarTrackY class="ng-scrollbar-track {{cmp.trackClass}}">
      <div scrollbarThumbY class="ng-scrollbar-thumb {{cmp.thumbClass}}"></div>
    </div>
  `,
      standalone: true,
      imports: [TrackYDirective, ThumbYDirective],
      styles: ["::ng-deep .ng-scrollbar-wrapper>scrollbar-y.scrollbar-control{width:var(--vertical-scrollbar-total-size)}::ng-deep .ng-scrollbar-wrapper>scrollbar-y.scrollbar-control>.ng-scrollbar-track{width:var(--vertical-scrollbar-size);height:calc(100% - var(--scrollbar-padding) * 2)}::ng-deep .ng-scrollbar-wrapper>scrollbar-y.scrollbar-control>.ng-scrollbar-track>.ng-scrollbar-thumb{height:0;width:100%}::ng-deep .ng-scrollbar-wrapper[verticalHovered=true]>scrollbar-y.scrollbar-control .ng-scrollbar-thumb,::ng-deep .ng-scrollbar-wrapper[verticalDragging=true]>scrollbar-y.scrollbar-control .ng-scrollbar-thumb{background-color:var(--scrollbar-thumb-hover-color)}::ng-deep .ng-scrollbar-wrapper[deactivated=false]>scrollbar-y.scrollbar-control{top:0;bottom:0}::ng-deep .ng-scrollbar-wrapper[deactivated=false][dir=ltr]>scrollbar-y.scrollbar-control{right:0;left:unset}::ng-deep .ng-scrollbar-wrapper[deactivated=false][dir=ltr][position=invertY]>scrollbar-y.scrollbar-control,::ng-deep .ng-scrollbar-wrapper[deactivated=false][dir=ltr][position=invertAll]>scrollbar-y.scrollbar-control{left:0;right:unset}::ng-deep .ng-scrollbar-wrapper[deactivated=false][dir=rtl]>scrollbar-y.scrollbar-control{left:0;right:unset}::ng-deep .ng-scrollbar-wrapper[deactivated=false][dir=rtl][position=invertY]>scrollbar-y.scrollbar-control,::ng-deep .ng-scrollbar-wrapper[deactivated=false][dir=rtl][position=invertAll]>scrollbar-y.scrollbar-control{left:unset;right:0}::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all]>scrollbar-y.scrollbar-control[fit=true]{bottom:var(--scrollbar-total-size);top:0}::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][position=invertX]>scrollbar-y.scrollbar-control[fit=true],::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][position=invertAll]>scrollbar-y.scrollbar-control[fit=true]{top:var(--scrollbar-total-size);bottom:0}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgScrollbarBase
    }, {
      type: Platform
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: NgZone
    }];
  }, {
    track: [{
      type: ViewChild,
      args: [TrackYDirective, {
        static: true
      }]
    }],
    thumb: [{
      type: ViewChild,
      args: [ThumbYDirective, {
        static: true
      }]
    }]
  });
})();
var _ScrollbarX = class _ScrollbarX extends Scrollbar {
  get viewportScrollSize() {
    return this.cmp.viewport.scrollWidth;
  }
  constructor(el, cmp, platform, document, zone) {
    super(el.nativeElement, cmp, platform, document, zone);
    this.cmp = cmp;
    this.platform = platform;
    this.document = document;
    this.zone = zone;
  }
  setHovered(value) {
    this.cmp.setHovered({
      horizontalHovered: value
    });
  }
};
_ScrollbarX.ɵfac = function ScrollbarX_Factory(t) {
  return new (t || _ScrollbarX)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgScrollbarBase), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(NgZone));
};
_ScrollbarX.ɵcmp = ɵɵdefineComponent({
  type: _ScrollbarX,
  selectors: [["scrollbar-x"]],
  viewQuery: function ScrollbarX_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(TrackXDirective, 7);
      ɵɵviewQuery(ThumbXDirective, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.track = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.thumb = _t.first);
    }
  },
  hostVars: 2,
  hostBindings: function ScrollbarX_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("scrollbar-control", true);
    }
  },
  standalone: true,
  features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
  decls: 2,
  vars: 6,
  consts: [["scrollbarTrackX", ""], ["scrollbarThumbX", ""]],
  template: function ScrollbarX_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵelement(1, "div", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassMapInterpolate1("ng-scrollbar-track ", ctx.cmp.trackClass, "");
      ɵɵadvance();
      ɵɵclassMapInterpolate1("ng-scrollbar-thumb ", ctx.cmp.thumbClass, "");
    }
  },
  dependencies: [TrackXDirective, ThumbXDirective],
  styles: [".ng-scrollbar-wrapper>scrollbar-x.scrollbar-control{height:var(--horizontal-scrollbar-total-size)}  .ng-scrollbar-wrapper>scrollbar-x.scrollbar-control>.ng-scrollbar-track{height:var(--horizontal-scrollbar-size);width:calc(100% - var(--scrollbar-padding) * 2)}  .ng-scrollbar-wrapper>scrollbar-x.scrollbar-control>.ng-scrollbar-track>.ng-scrollbar-thumb{width:0;height:100%}  .ng-scrollbar-wrapper[horizontalHovered=true]>scrollbar-x.scrollbar-control .ng-scrollbar-thumb,   .ng-scrollbar-wrapper[horizontalDragging=true]>scrollbar-x.scrollbar-control .ng-scrollbar-thumb{background-color:var(--scrollbar-thumb-hover-color)}  .ng-scrollbar-wrapper[position=invertX]>scrollbar-x.scrollbar-control,   .ng-scrollbar-wrapper[position=invertAll]>scrollbar-x.scrollbar-control{top:0;bottom:unset}  .ng-scrollbar-wrapper[deactivated=false]>scrollbar-x.scrollbar-control{left:0;right:0;bottom:0;top:unset}  .ng-scrollbar-wrapper[deactivated=false][position=invertX]>scrollbar-x.scrollbar-control,   .ng-scrollbar-wrapper[deactivated=false][position=invertAll]>scrollbar-x.scrollbar-control{top:0;bottom:unset}  .ng-scrollbar-wrapper[deactivated=false][track=all][dir=ltr]>scrollbar-x.scrollbar-control[fit=true]{right:var(--scrollbar-total-size);left:0}  .ng-scrollbar-wrapper[deactivated=false][track=all][dir=ltr][position=invertY]>scrollbar-x.scrollbar-control[fit=true],   .ng-scrollbar-wrapper[deactivated=false][track=all][dir=ltr][position=invertAll]>scrollbar-x.scrollbar-control[fit=true]{left:var(--scrollbar-total-size);right:0}  .ng-scrollbar-wrapper[deactivated=false][track=all][dir=rtl]>scrollbar-x.scrollbar-control[fit=true]{left:var(--scrollbar-total-size);right:0}  .ng-scrollbar-wrapper[deactivated=false][track=all][dir=rtl][position=invertY]>scrollbar-x.scrollbar-control[fit=true],   .ng-scrollbar-wrapper[deactivated=false][track=all][dir=rtl][position=invertAll]>scrollbar-x.scrollbar-control[fit=true]{right:var(--scrollbar-total-size);left:0}"],
  changeDetection: 0
});
var ScrollbarX = _ScrollbarX;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarX, [{
    type: Component,
    args: [{
      selector: "scrollbar-x",
      host: {
        "[class.scrollbar-control]": "true"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div scrollbarTrackX class="ng-scrollbar-track {{cmp.trackClass}}">
      <div scrollbarThumbX class="ng-scrollbar-thumb {{cmp.thumbClass}}"></div>
    </div>
  `,
      standalone: true,
      imports: [TrackXDirective, ThumbXDirective],
      styles: ["::ng-deep .ng-scrollbar-wrapper>scrollbar-x.scrollbar-control{height:var(--horizontal-scrollbar-total-size)}::ng-deep .ng-scrollbar-wrapper>scrollbar-x.scrollbar-control>.ng-scrollbar-track{height:var(--horizontal-scrollbar-size);width:calc(100% - var(--scrollbar-padding) * 2)}::ng-deep .ng-scrollbar-wrapper>scrollbar-x.scrollbar-control>.ng-scrollbar-track>.ng-scrollbar-thumb{width:0;height:100%}::ng-deep .ng-scrollbar-wrapper[horizontalHovered=true]>scrollbar-x.scrollbar-control .ng-scrollbar-thumb,::ng-deep .ng-scrollbar-wrapper[horizontalDragging=true]>scrollbar-x.scrollbar-control .ng-scrollbar-thumb{background-color:var(--scrollbar-thumb-hover-color)}::ng-deep .ng-scrollbar-wrapper[position=invertX]>scrollbar-x.scrollbar-control,::ng-deep .ng-scrollbar-wrapper[position=invertAll]>scrollbar-x.scrollbar-control{top:0;bottom:unset}::ng-deep .ng-scrollbar-wrapper[deactivated=false]>scrollbar-x.scrollbar-control{left:0;right:0;bottom:0;top:unset}::ng-deep .ng-scrollbar-wrapper[deactivated=false][position=invertX]>scrollbar-x.scrollbar-control,::ng-deep .ng-scrollbar-wrapper[deactivated=false][position=invertAll]>scrollbar-x.scrollbar-control{top:0;bottom:unset}::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][dir=ltr]>scrollbar-x.scrollbar-control[fit=true]{right:var(--scrollbar-total-size);left:0}::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][dir=ltr][position=invertY]>scrollbar-x.scrollbar-control[fit=true],::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][dir=ltr][position=invertAll]>scrollbar-x.scrollbar-control[fit=true]{left:var(--scrollbar-total-size);right:0}::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][dir=rtl]>scrollbar-x.scrollbar-control[fit=true]{left:var(--scrollbar-total-size);right:0}::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][dir=rtl][position=invertY]>scrollbar-x.scrollbar-control[fit=true],::ng-deep .ng-scrollbar-wrapper[deactivated=false][track=all][dir=rtl][position=invertAll]>scrollbar-x.scrollbar-control[fit=true]{right:var(--scrollbar-total-size);left:0}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgScrollbarBase
    }, {
      type: Platform
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: NgZone
    }];
  }, {
    track: [{
      type: ViewChild,
      args: [TrackXDirective, {
        static: true
      }]
    }],
    thumb: [{
      type: ViewChild,
      args: [ThumbXDirective, {
        static: true
      }]
    }]
  });
})();
var NG_SCROLLBAR_OPTIONS = new InjectionToken("NG_SCROLLBAR_OPTIONS");
var defaultOptions = {
  viewClass: "",
  trackClass: "",
  thumbClass: "",
  track: "vertical",
  appearance: "compact",
  visibility: "native",
  position: "native",
  pointerEventsMethod: "viewport",
  trackClickScrollDuration: 300,
  minThumbSize: 20,
  windowResizeDebounce: 0,
  sensorDebounce: 0,
  scrollAuditTime: 0,
  viewportPropagateMouseMove: true,
  autoHeightDisabled: true,
  autoWidthDisabled: true,
  sensorDisabled: false,
  pointerEventsDisabled: false
};
var _ScrollbarManager = class _ScrollbarManager {
  constructor(options) {
    this.globalOptions = options ? __spreadValues(__spreadValues({}, defaultOptions), options) : defaultOptions;
    this.rtlScrollAxisType = getRtlScrollAxisType();
  }
};
_ScrollbarManager.ɵfac = function ScrollbarManager_Factory(t) {
  return new (t || _ScrollbarManager)(ɵɵinject(NG_SCROLLBAR_OPTIONS, 8));
};
_ScrollbarManager.ɵprov = ɵɵdefineInjectable({
  token: _ScrollbarManager,
  factory: _ScrollbarManager.ɵfac,
  providedIn: "root"
});
var ScrollbarManager = _ScrollbarManager;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [NG_SCROLLBAR_OPTIONS]
      }]
    }];
  }, null);
})();
var _NativeScrollbarSizeFactory = class _NativeScrollbarSizeFactory {
  constructor(document, manager, platform) {
    this.document = document;
    this.manager = manager;
    this.platform = platform;
    this._scrollbarSize = new BehaviorSubject(this.getNativeScrollbarSize());
    this.scrollbarSize = this._scrollbarSize.asObservable();
    if (platform.isBrowser) {
      fromEvent(this.document.defaultView, "resize", {
        passive: true
      }).pipe(debounceTime(this.manager.globalOptions.windowResizeDebounce), map(() => this.getNativeScrollbarSize()), distinctUntilChanged(), tap((size) => this._scrollbarSize.next(size))).subscribe();
    }
  }
  /**
   * Get native scrollbar size
   */
  getNativeScrollbarSize() {
    if (!this.platform.isBrowser) {
      return 0;
    }
    if (this.platform.IOS) {
      return 6;
    }
    const box = this.document.createElement("div");
    box.className = "ng-scrollbar-measure";
    box.style.left = "0px";
    box.style.overflow = "scroll";
    box.style.position = "fixed";
    box.style.top = "-9999px";
    this.document.body.appendChild(box);
    const size = box.getBoundingClientRect().right;
    this.document.body.removeChild(box);
    return size;
  }
};
_NativeScrollbarSizeFactory.ɵfac = function NativeScrollbarSizeFactory_Factory(t) {
  return new (t || _NativeScrollbarSizeFactory)(ɵɵinject(DOCUMENT), ɵɵinject(ScrollbarManager), ɵɵinject(Platform));
};
_NativeScrollbarSizeFactory.ɵprov = ɵɵdefineInjectable({
  token: _NativeScrollbarSizeFactory,
  factory: _NativeScrollbarSizeFactory.ɵfac,
  providedIn: "root"
});
var NativeScrollbarSizeFactory = _NativeScrollbarSizeFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NativeScrollbarSizeFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: ScrollbarManager
    }, {
      type: Platform
    }];
  }, null);
})();
var _HideNativeScrollbar = class _HideNativeScrollbar {
  constructor(el, renderer, hideNativeScrollbar) {
    this.renderer = renderer;
    this.hideNativeScrollbar = hideNativeScrollbar;
    this._subscriber = Subscription.EMPTY;
    this._subscriber = hideNativeScrollbar.scrollbarSize.subscribe((size) => {
      this.renderer.setStyle(el.nativeElement, "--native-scrollbar-size", `-${size}px`, RendererStyleFlags2.DashCase);
    });
  }
  ngOnDestroy() {
    this._subscriber.unsubscribe();
  }
};
_HideNativeScrollbar.ɵfac = function HideNativeScrollbar_Factory(t) {
  return new (t || _HideNativeScrollbar)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NativeScrollbarSizeFactory));
};
_HideNativeScrollbar.ɵdir = ɵɵdefineDirective({
  type: _HideNativeScrollbar,
  selectors: [["", "hideNativeScrollbar", ""]],
  standalone: true
});
var HideNativeScrollbar = _HideNativeScrollbar;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HideNativeScrollbar, [{
    type: Directive,
    args: [{
      selector: "[hideNativeScrollbar]",
      standalone: true
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: NativeScrollbarSizeFactory
    }];
  }, null);
})();
var _ResizeSensor = class _ResizeSensor {
  /** Debounce interval for emitting the changes. */
  get debounce() {
    return this._debounce;
  }
  set debounce(value) {
    this._debounce = coerceNumberProperty(value);
    this._subscribe();
  }
  /** Whether ResizeObserver is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this._unsubscribe() : this._subscribe();
  }
  constructor(zone, platform, scrollbar) {
    this.zone = zone;
    this.platform = platform;
    this.scrollbar = scrollbar;
    this._disabled = false;
    this._currentSubscription = null;
    this.event = new EventEmitter();
    if (!scrollbar) {
      throw new Error("[NgScrollbar Resize Sensor Directive]: Host element must be an NgScrollbar component.");
    }
  }
  ngAfterContentInit() {
    if (!this._currentSubscription && !this._disabled) {
      this._subscribe();
    }
  }
  ngOnDestroy() {
    this._unsubscribe();
  }
  _subscribe() {
    this._unsubscribe();
    if (this.platform.isBrowser) {
      const stream = new Observable((observer) => {
        this._resizeObserver = new ResizeObserver((e) => observer.next(e));
        this._resizeObserver.observe(this.scrollbar.viewport.nativeElement);
        if (this.scrollbar.viewport.contentWrapperElement) {
          this._resizeObserver.observe(this.scrollbar.viewport.contentWrapperElement);
        }
      });
      this.zone.runOutsideAngular(() => {
        this._currentSubscription = (this._debounce ? stream.pipe(debounceTime(this._debounce)) : stream).subscribe(this.event);
      });
    }
  }
  _unsubscribe() {
    this._resizeObserver?.disconnect();
    this._currentSubscription?.unsubscribe();
  }
};
_ResizeSensor.ɵfac = function ResizeSensor_Factory(t) {
  return new (t || _ResizeSensor)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(NgScrollbarBase));
};
_ResizeSensor.ɵdir = ɵɵdefineDirective({
  type: _ResizeSensor,
  selectors: [["", "resizeSensor", ""]],
  inputs: {
    debounce: [InputFlags.None, "sensorDebounce", "debounce"],
    disabled: [InputFlags.None, "sensorDisabled", "disabled"]
  },
  outputs: {
    event: "resizeSensor"
  },
  standalone: true
});
var ResizeSensor = _ResizeSensor;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResizeSensor, [{
    type: Directive,
    args: [{
      selector: "[resizeSensor]",
      standalone: true
    }]
  }], function() {
    return [{
      type: NgZone
    }, {
      type: Platform
    }, {
      type: NgScrollbarBase
    }];
  }, {
    debounce: [{
      type: Input,
      args: ["sensorDebounce"]
    }],
    disabled: [{
      type: Input,
      args: ["sensorDisabled"]
    }],
    event: [{
      type: Output,
      args: ["resizeSensor"]
    }]
  });
})();
var _NgScrollbar = class _NgScrollbar {
  /** Disable custom scrollbar and switch back to native scrollbar */
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
  }
  /** Whether ResizeObserver is disabled */
  get sensorDisabled() {
    return this._sensorDisabled;
  }
  set sensorDisabled(disabled) {
    this._sensorDisabled = coerceBooleanProperty(disabled);
  }
  /** A flag used to enable/disable the scrollbar thumb dragged event */
  get pointerEventsDisabled() {
    return this._pointerEventsDisabled;
  }
  set pointerEventsDisabled(disabled) {
    this._pointerEventsDisabled = coerceBooleanProperty(disabled);
  }
  /** Enable viewport mousemove event propagation (only when pointerEventsMethod="viewport") */
  get viewportPropagateMouseMove() {
    return this._viewportPropagateMouseMove;
  }
  set viewportPropagateMouseMove(disabled) {
    this._viewportPropagateMouseMove = coerceBooleanProperty(disabled);
  }
  /** Disable auto-height */
  get autoHeightDisabled() {
    return this._autoHeightDisabled;
  }
  set autoHeightDisabled(disabled) {
    this._autoHeightDisabled = coerceBooleanProperty(disabled);
  }
  /** Disable auto-width */
  get autoWidthDisabled() {
    return this._autoWidthDisabled;
  }
  set autoWidthDisabled(disabled) {
    this._autoWidthDisabled = coerceBooleanProperty(disabled);
  }
  get nativeElement() {
    return this.el.nativeElement;
  }
  constructor(el, zone, changeDetectorRef, dir, smoothScroll, manager) {
    this.el = el;
    this.zone = zone;
    this.changeDetectorRef = changeDetectorRef;
    this.dir = dir;
    this.smoothScroll = smoothScroll;
    this.manager = manager;
    this._disabled = false;
    this._sensorDisabled = this.manager.globalOptions.sensorDisabled;
    this._pointerEventsDisabled = this.manager.globalOptions.pointerEventsDisabled;
    this._autoHeightDisabled = this.manager.globalOptions.autoHeightDisabled;
    this._autoWidthDisabled = this.manager.globalOptions.autoWidthDisabled;
    this._viewportPropagateMouseMove = this.manager.globalOptions.viewportPropagateMouseMove;
    this.viewClass = this.manager.globalOptions.viewClass;
    this.trackClass = this.manager.globalOptions.trackClass;
    this.thumbClass = this.manager.globalOptions.thumbClass;
    this.minThumbSize = this.manager.globalOptions.minThumbSize;
    this.trackClickScrollDuration = this.manager.globalOptions.trackClickScrollDuration;
    this.pointerEventsMethod = this.manager.globalOptions.pointerEventsMethod;
    this.track = this.manager.globalOptions.track;
    this.visibility = this.manager.globalOptions.visibility;
    this.appearance = this.manager.globalOptions.appearance;
    this.position = this.manager.globalOptions.position;
    this.sensorDebounce = this.manager.globalOptions.sensorDebounce;
    this.scrollAuditTime = this.manager.globalOptions.scrollAuditTime;
    this.updated = new EventEmitter();
    this.state = {};
    this.destroyed = new Subject();
  }
  /**
   * Update local state with each change detection
   */
  updateState() {
    let verticalUsed = false;
    let horizontalUsed = false;
    let isVerticallyScrollable = false;
    let isHorizontallyScrollable = false;
    if (this.track === "all" || this.track === "vertical") {
      isVerticallyScrollable = this.viewport.scrollHeight > this.viewport.clientHeight;
      verticalUsed = this.visibility === "always" || isVerticallyScrollable;
    }
    if (this.track === "all" || this.track === "horizontal") {
      isHorizontallyScrollable = this.viewport.scrollWidth > this.viewport.clientWidth;
      horizontalUsed = this.visibility === "always" || isHorizontallyScrollable;
    }
    this.setState({
      position: this.position,
      track: this.track,
      appearance: this.appearance,
      visibility: this.visibility,
      deactivated: this.disabled,
      dir: this.dir.value,
      pointerEventsMethod: this.pointerEventsMethod,
      verticalUsed,
      horizontalUsed,
      isVerticallyScrollable,
      isHorizontallyScrollable
    });
  }
  setState(state) {
    this.state = __spreadValues(__spreadValues({}, this.state), state);
    this.changeDetectorRef.detectChanges();
  }
  getScrolledByDirection(property) {
    let event;
    return this.scrolled.pipe(tap((e) => event = e), map((e) => e.target[property]), pairwise(), filter(([prev, curr]) => prev !== curr), map(() => event));
  }
  /**
   * Set hovered state if a scrollbar is being hovered
   */
  setHovered(hovered) {
    this.zone.run(() => this.setState(__spreadValues({}, hovered)));
  }
  /**
   * Set dragging state if a scrollbar is being dragged
   */
  setDragging(dragging) {
    this.zone.run(() => this.setState(__spreadValues({}, dragging)));
  }
  /**
   * Set clicked state if a scrollbar track is being clicked
   */
  setClicked(scrollbarClicked) {
    this.zone.run(() => this.setState({
      scrollbarClicked
    }));
  }
  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      if (this.customViewPort) {
        this.viewport = this.customViewPort;
        this.defaultViewPort.setAsWrapper();
      } else {
        this.viewport = this.defaultViewPort;
      }
      this.viewport.setAsViewport(this.viewClass);
      let scrollStream = fromEvent(this.viewport.nativeElement, "scroll", {
        passive: true
      });
      scrollStream = this.scrollAuditTime ? scrollStream.pipe(auditTime(this.scrollAuditTime)) : scrollStream;
      this.scrolled = scrollStream.pipe(takeUntil(this.destroyed));
      this.verticalScrolled = this.getScrolledByDirection("scrollTop");
      this.horizontalScrolled = this.getScrolledByDirection("scrollLeft");
    });
  }
  ngOnChanges(changes) {
    if (this.viewport) {
      this.update();
    }
  }
  ngAfterViewInit() {
    this.update();
    this.dir.change.pipe(tap(() => this.update()), takeUntil(this.destroyed)).subscribe();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  /**
   * Update local state and the internal scrollbar controls
   */
  update() {
    if (!this.autoHeightDisabled) {
      this.updateHeight();
    }
    if (!this.autoWidthDisabled) {
      this.updateWidth();
    }
    this.updateState();
    this.updated.next();
  }
  /**
   * Smooth scroll functions
   */
  scrollTo(options) {
    return this.smoothScroll.scrollTo(this.viewport.nativeElement, options);
  }
  /**
   * Scroll to element by reference or selector
   */
  scrollToElement(target, options) {
    return this.smoothScroll.scrollToElement(this.viewport.nativeElement, target, options);
  }
  updateHeight() {
    if (this.appearance === "standard" && this.scrollbarX) {
      this.nativeElement.style.height = `${this.viewport.contentHeight + this.scrollbarX.nativeElement.clientHeight}px`;
    } else {
      this.nativeElement.style.height = `${this.viewport.contentHeight}px`;
    }
  }
  updateWidth() {
    if (this.appearance === "standard" && this.scrollbarY) {
      this.nativeElement.style.width = `${this.viewport.contentWidth + this.scrollbarY.nativeElement.clientWidth}px`;
    } else {
      this.nativeElement.style.width = `${this.viewport.contentWidth}px`;
    }
  }
};
_NgScrollbar.ɵfac = function NgScrollbar_Factory(t) {
  return new (t || _NgScrollbar)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(SmoothScrollManager), ɵɵdirectiveInject(ScrollbarManager));
};
_NgScrollbar.ɵcmp = ɵɵdefineComponent({
  type: _NgScrollbar,
  selectors: [["ng-scrollbar"]],
  contentQueries: function NgScrollbar_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, ScrollViewport, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customViewPort = _t.first);
    }
  },
  viewQuery: function NgScrollbar_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 5, ElementRef);
      ɵɵviewQuery(_c1, 5, ElementRef);
      ɵɵviewQuery(ScrollViewport, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scrollbarY = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scrollbarX = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.defaultViewPort = _t.first);
    }
  },
  hostVars: 2,
  hostBindings: function NgScrollbar_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ng-scrollbar", true);
    }
  },
  inputs: {
    disabled: "disabled",
    sensorDisabled: "sensorDisabled",
    pointerEventsDisabled: "pointerEventsDisabled",
    viewportPropagateMouseMove: "viewportPropagateMouseMove",
    autoHeightDisabled: "autoHeightDisabled",
    autoWidthDisabled: "autoWidthDisabled",
    viewClass: "viewClass",
    trackClass: "trackClass",
    thumbClass: "thumbClass",
    minThumbSize: "minThumbSize",
    trackClickScrollDuration: "trackClickScrollDuration",
    pointerEventsMethod: "pointerEventsMethod",
    track: "track",
    visibility: "visibility",
    appearance: "appearance",
    position: "position",
    sensorDebounce: "sensorDebounce",
    scrollAuditTime: "scrollAuditTime"
  },
  outputs: {
    updated: "updated"
  },
  exportAs: ["ngScrollbar"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NgScrollbarBase,
    useExisting: _NgScrollbar
  }]), ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  ngContentSelectors: _c2,
  decls: 6,
  vars: 4,
  consts: [["scrollbarX", ""], ["scrollbarY", ""], [1, "ng-scrollbar-wrapper", 3, "ngAttr"], [1, "ng-scroll-viewport-wrapper", 3, "resizeSensor", "sensorDebounce", "sensorDisabled"], ["scrollViewport", "", "hideNativeScrollbar", ""], [4, "ngIf"]],
  template: function NgScrollbar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 2)(1, "div", 3);
      ɵɵlistener("resizeSensor", function NgScrollbar_Template_div_resizeSensor_1_listener() {
        return ctx.update();
      });
      ɵɵelementStart(2, "div", 4)(3, "div");
      ɵɵprojection(4);
      ɵɵelementEnd()()();
      ɵɵtemplate(5, NgScrollbar_ng_container_5_Template, 3, 2, "ng-container", 5);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("ngAttr", ctx.state);
      ɵɵadvance();
      ɵɵproperty("sensorDebounce", ctx.sensorDebounce)("sensorDisabled", ctx.sensorDisabled);
      ɵɵadvance(4);
      ɵɵproperty("ngIf", !ctx.disabled);
    }
  },
  dependencies: [NgIf, NgAttr, ResizeSensor, ScrollViewport, HideNativeScrollbar, ScrollbarX, ScrollbarY],
  styles: [".ng-scrollbar-measure{scrollbar-width:none;-ms-overflow-style:none}  .ng-scrollbar-measure::-webkit-scrollbar{display:none}[_nghost-%COMP%]{--scrollbar-border-radius: 7px;--scrollbar-padding: 4px;--scrollbar-track-color: transparent;--scrollbar-thumb-color: rgba(0, 0, 0, .2);--scrollbar-thumb-hover-color: var(--scrollbar-thumb-color);--scrollbar-size: 5px;--scrollbar-hover-size: var(--scrollbar-size);--scrollbar-overscroll-behavior: initial;--scrollbar-transition-duration: .4s;--scrollbar-transition-delay: .8s;--scrollbar-thumb-transition: height ease-out .15s, width ease-out .15s;--scrollbar-track-transition: height ease-out .15s, width ease-out .15s;display:block;position:relative;height:100%;max-height:100%;max-width:100%;box-sizing:content-box!important}[_nghost-%COMP%] > .ng-scrollbar-wrapper[_ngcontent-%COMP%]{--scrollbar-total-size: calc(var(--scrollbar-size) + var(--scrollbar-padding) * 2);--vertical-scrollbar-size: var(--scrollbar-size);--horizontal-scrollbar-size: var(--scrollbar-size);--vertical-scrollbar-total-size: calc(var(--vertical-scrollbar-size) + var(--scrollbar-padding) * 2);--horizontal-scrollbar-total-size: calc(var(--horizontal-scrollbar-size) + var(--scrollbar-padding) * 2)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[verticalHovered=true][_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[verticalDragging=true][_ngcontent-%COMP%]{--vertical-scrollbar-size: var(--scrollbar-hover-size);--vertical-scrollbar-total-size: calc(var(--vertical-scrollbar-size) + var(--scrollbar-padding) * 2);cursor:default}[_nghost-%COMP%] > .ng-scrollbar-wrapper[horizontalHovered=true][_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[horizontalDragging=true][_ngcontent-%COMP%]{--horizontal-scrollbar-size: var(--scrollbar-hover-size);--horizontal-scrollbar-total-size: calc(var(--horizontal-scrollbar-size) + var(--scrollbar-padding) * 2);cursor:default}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%]{left:0;right:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{padding-right:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content{padding-right:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%]{left:var(--scrollbar-total-size);right:0}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{padding-left:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content{padding-left:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%]{left:var(--scrollbar-total-size);right:0}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport, [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{padding-left:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content, [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content{padding-left:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%]{left:0;right:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport, [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{padding-right:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content, [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content{padding-right:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%]{top:0;bottom:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{padding-bottom:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content{padding-bottom:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=scrollbar][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%]{top:var(--scrollbar-total-size);bottom:0}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport, [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{padding-top:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content, [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%] > .ng-scroll-content[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport>.ng-scroll-content{padding-top:var(--scrollbar-total-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{scrollbar-width:none;-ms-overflow-style:none}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%]::-webkit-scrollbar, [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport::-webkit-scrollbar{display:none}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][horizontalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-native-scrollbar-hider[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][horizontalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-native-scrollbar-hider{bottom:var(--native-scrollbar-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][verticalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-native-scrollbar-hider[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][verticalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-native-scrollbar-hider{left:0;right:var(--native-scrollbar-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][verticalUsed=true][dir=rtl][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-native-scrollbar-hider[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][verticalUsed=true][dir=rtl][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-native-scrollbar-hider{right:0;left:var(--native-scrollbar-size)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][visibility=hover][_ngcontent-%COMP%] > .scrollbar-control[_ngcontent-%COMP%]{opacity:0;transition-property:opacity;transition-duration:var(--scrollbar-transition-duration);transition-delay:var(--scrollbar-transition-delay)}[_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][visibility=hover][_ngcontent-%COMP%]:hover > .scrollbar-control[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][visibility=hover][_ngcontent-%COMP%]:active > .scrollbar-control[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[deactivated=false][visibility=hover][_ngcontent-%COMP%]:focus > .scrollbar-control[_ngcontent-%COMP%]{opacity:1;transition-duration:var(--scrollbar-transition-duration);transition-delay:0ms}[_nghost-%COMP%] > .ng-scrollbar-wrapper[horizontalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[horizontalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{overflow-x:auto;overflow-y:hidden}[_nghost-%COMP%] > .ng-scrollbar-wrapper[verticalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[verticalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%] > .ng-scrollbar-wrapper[verticalUsed=true][horizontalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > .ng-scroll-viewport[_ngcontent-%COMP%], [_nghost-%COMP%] > .ng-scrollbar-wrapper[verticalUsed=true][horizontalUsed=true][_ngcontent-%COMP%] > .ng-scroll-viewport-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] >   .ng-scroll-viewport{overflow:auto}.ng-scroll-viewport-wrapper[_ngcontent-%COMP%]{overflow:hidden}.ng-scroll-viewport[_ngcontent-%COMP%]{-webkit-overflow-scrolling:touch;contain:strict;will-change:scroll-position;overscroll-behavior:var(--scrollbar-overscroll-behavior)}  .ng-scroll-content{display:inline-block;min-width:100%}.ng-scrollbar-wrapper[_ngcontent-%COMP%], .ng-scroll-viewport-wrapper[_ngcontent-%COMP%], .ng-scroll-layer[_ngcontent-%COMP%],   .ng-scroll-viewport{position:absolute;inset:0}", ".ng-scrollbar-wrapper[pointerEventsMethod=viewport]>.scrollbar-control{pointer-events:none}  .ng-scrollbar-wrapper[horizontalDragging=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,   .ng-scrollbar-wrapper[horizontalDragging=true]>.ng-scroll-viewport-wrapper>*>*>  .ng-scroll-viewport,   .ng-scrollbar-wrapper[verticalDragging=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,   .ng-scrollbar-wrapper[verticalDragging=true]>.ng-scroll-viewport-wrapper>*>*>  .ng-scroll-viewport,   .ng-scrollbar-wrapper[scrollbarClicked=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,   .ng-scrollbar-wrapper[scrollbarClicked=true]>.ng-scroll-viewport-wrapper>*>*>  .ng-scroll-viewport{-webkit-user-select:none;-moz-user-select:none;user-select:none}  .ng-scrollbar-wrapper>.scrollbar-control{position:absolute;display:flex;justify-content:center;align-items:center;transition:var(--scrollbar-track-transition)}  .ng-scrollbar-wrapper>.scrollbar-control[scrollable=false] .ng-scrollbar-thumb{display:none}  .ng-scrollbar-track{height:100%;width:100%;z-index:1;border-radius:var(--scrollbar-border-radius);background-color:var(--scrollbar-track-color);overflow:hidden;transition:var(--scrollbar-track-transition);cursor:default}  .ng-scrollbar-thumb{box-sizing:border-box;position:relative;border-radius:inherit;background-color:var(--scrollbar-thumb-color);transform:translateZ(0);transition:var(--scrollbar-thumb-transition)}"],
  changeDetection: 0
});
var NgScrollbar = _NgScrollbar;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbar, [{
    type: Component,
    args: [{
      selector: "ng-scrollbar",
      exportAs: "ngScrollbar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.ng-scrollbar]": "true"
      },
      providers: [{
        provide: NgScrollbarBase,
        useExisting: NgScrollbar
      }],
      standalone: true,
      imports: [NgIf, NgAttr, ResizeSensor, ScrollViewport, HideNativeScrollbar, ScrollbarX, ScrollbarY],
      template: '<div class="ng-scrollbar-wrapper" [ngAttr]="state">\r\n  <div class="ng-scroll-viewport-wrapper"\r\n       (resizeSensor)="update()"\r\n       [sensorDebounce]="sensorDebounce"\r\n       [sensorDisabled]="sensorDisabled">\r\n    <div scrollViewport\r\n         hideNativeScrollbar>\r\n      <div>\r\n        <ng-content></ng-content>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <ng-container *ngIf="!disabled">\r\n    <scrollbar-x #scrollbarX\r\n                 *ngIf="state.horizontalUsed"\r\n                 [attr.scrollable]="state.isHorizontallyScrollable"\r\n                 [attr.fit]="state.verticalUsed">\r\n    </scrollbar-x>\r\n    <scrollbar-y #scrollbarY\r\n                 *ngIf="state.verticalUsed"\r\n                 [attr.scrollable]="state.isVerticallyScrollable"\r\n                 [attr.fit]="state.horizontalUsed">\r\n    </scrollbar-y>\r\n  </ng-container>\r\n</div>\r\n\r\n',
      styles: ["::ng-deep .ng-scrollbar-measure{scrollbar-width:none;-ms-overflow-style:none}::ng-deep .ng-scrollbar-measure::-webkit-scrollbar{display:none}:host{--scrollbar-border-radius: 7px;--scrollbar-padding: 4px;--scrollbar-track-color: transparent;--scrollbar-thumb-color: rgba(0, 0, 0, .2);--scrollbar-thumb-hover-color: var(--scrollbar-thumb-color);--scrollbar-size: 5px;--scrollbar-hover-size: var(--scrollbar-size);--scrollbar-overscroll-behavior: initial;--scrollbar-transition-duration: .4s;--scrollbar-transition-delay: .8s;--scrollbar-thumb-transition: height ease-out .15s, width ease-out .15s;--scrollbar-track-transition: height ease-out .15s, width ease-out .15s;display:block;position:relative;height:100%;max-height:100%;max-width:100%;box-sizing:content-box!important}:host>.ng-scrollbar-wrapper{--scrollbar-total-size: calc(var(--scrollbar-size) + var(--scrollbar-padding) * 2);--vertical-scrollbar-size: var(--scrollbar-size);--horizontal-scrollbar-size: var(--scrollbar-size);--vertical-scrollbar-total-size: calc(var(--vertical-scrollbar-size) + var(--scrollbar-padding) * 2);--horizontal-scrollbar-total-size: calc(var(--horizontal-scrollbar-size) + var(--scrollbar-padding) * 2)}:host>.ng-scrollbar-wrapper[verticalHovered=true],:host>.ng-scrollbar-wrapper[verticalDragging=true]{--vertical-scrollbar-size: var(--scrollbar-hover-size);--vertical-scrollbar-total-size: calc(var(--vertical-scrollbar-size) + var(--scrollbar-padding) * 2);cursor:default}:host>.ng-scrollbar-wrapper[horizontalHovered=true],:host>.ng-scrollbar-wrapper[horizontalDragging=true]{--horizontal-scrollbar-size: var(--scrollbar-hover-size);--horizontal-scrollbar-total-size: calc(var(--horizontal-scrollbar-size) + var(--scrollbar-padding) * 2);cursor:default}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper{left:0;right:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{padding-right:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content{padding-right:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper{left:var(--scrollbar-total-size);right:0}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{padding-left:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content{padding-left:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper{left:var(--scrollbar-total-size);right:0}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{padding-left:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=ltr][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content{padding-left:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper{left:0;right:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{padding-right:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertY][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][verticalUsed=true][position=invertAll][dir=rtl][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content{padding-right:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper{top:0;bottom:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{padding-bottom:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content{padding-bottom:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=scrollbar]>.ng-scroll-viewport-wrapper{top:var(--scrollbar-total-size);bottom:0}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{padding-top:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertX][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport>.ng-scroll-content,:host>.ng-scrollbar-wrapper[deactivated=false][appearance=standard][horizontalUsed=true][position=invertAll][pointerEventsMethod=viewport]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport>.ng-scroll-content{padding-top:var(--scrollbar-total-size)}:host>.ng-scrollbar-wrapper[deactivated=false]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[deactivated=false]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{scrollbar-width:none;-ms-overflow-style:none}:host>.ng-scrollbar-wrapper[deactivated=false]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport::-webkit-scrollbar,:host>.ng-scrollbar-wrapper[deactivated=false]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport::-webkit-scrollbar{display:none}:host>.ng-scrollbar-wrapper[deactivated=false][horizontalUsed=true]>.ng-scroll-viewport-wrapper>.ng-native-scrollbar-hider,:host>.ng-scrollbar-wrapper[deactivated=false][horizontalUsed=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-native-scrollbar-hider{bottom:var(--native-scrollbar-size)}:host>.ng-scrollbar-wrapper[deactivated=false][verticalUsed=true]>.ng-scroll-viewport-wrapper>.ng-native-scrollbar-hider,:host>.ng-scrollbar-wrapper[deactivated=false][verticalUsed=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-native-scrollbar-hider{left:0;right:var(--native-scrollbar-size)}:host>.ng-scrollbar-wrapper[deactivated=false][verticalUsed=true][dir=rtl]>.ng-scroll-viewport-wrapper>.ng-native-scrollbar-hider,:host>.ng-scrollbar-wrapper[deactivated=false][verticalUsed=true][dir=rtl]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-native-scrollbar-hider{right:0;left:var(--native-scrollbar-size)}:host>.ng-scrollbar-wrapper[deactivated=false][visibility=hover]>.scrollbar-control{opacity:0;transition-property:opacity;transition-duration:var(--scrollbar-transition-duration);transition-delay:var(--scrollbar-transition-delay)}:host>.ng-scrollbar-wrapper[deactivated=false][visibility=hover]:hover>.scrollbar-control,:host>.ng-scrollbar-wrapper[deactivated=false][visibility=hover]:active>.scrollbar-control,:host>.ng-scrollbar-wrapper[deactivated=false][visibility=hover]:focus>.scrollbar-control{opacity:1;transition-duration:var(--scrollbar-transition-duration);transition-delay:0ms}:host>.ng-scrollbar-wrapper[horizontalUsed=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[horizontalUsed=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{overflow-x:auto;overflow-y:hidden}:host>.ng-scrollbar-wrapper[verticalUsed=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[verticalUsed=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{overflow-y:auto;overflow-x:hidden}:host>.ng-scrollbar-wrapper[verticalUsed=true][horizontalUsed=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,:host>.ng-scrollbar-wrapper[verticalUsed=true][horizontalUsed=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{overflow:auto}.ng-scroll-viewport-wrapper{overflow:hidden}.ng-scroll-viewport{-webkit-overflow-scrolling:touch;contain:strict;will-change:scroll-position;overscroll-behavior:var(--scrollbar-overscroll-behavior)}::ng-deep .ng-scroll-content{display:inline-block;min-width:100%}.ng-scrollbar-wrapper,.ng-scroll-viewport-wrapper,.ng-scroll-layer,::ng-deep .ng-scroll-viewport{position:absolute;inset:0}\n", "::ng-deep .ng-scrollbar-wrapper[pointerEventsMethod=viewport]>.scrollbar-control{pointer-events:none}::ng-deep .ng-scrollbar-wrapper[horizontalDragging=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,::ng-deep .ng-scrollbar-wrapper[horizontalDragging=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport,::ng-deep .ng-scrollbar-wrapper[verticalDragging=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,::ng-deep .ng-scrollbar-wrapper[verticalDragging=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport,::ng-deep .ng-scrollbar-wrapper[scrollbarClicked=true]>.ng-scroll-viewport-wrapper>.ng-scroll-viewport,::ng-deep .ng-scrollbar-wrapper[scrollbarClicked=true]>.ng-scroll-viewport-wrapper>*>*>::ng-deep .ng-scroll-viewport{-webkit-user-select:none;-moz-user-select:none;user-select:none}::ng-deep .ng-scrollbar-wrapper>.scrollbar-control{position:absolute;display:flex;justify-content:center;align-items:center;transition:var(--scrollbar-track-transition)}::ng-deep .ng-scrollbar-wrapper>.scrollbar-control[scrollable=false] .ng-scrollbar-thumb{display:none}::ng-deep .ng-scrollbar-track{height:100%;width:100%;z-index:1;border-radius:var(--scrollbar-border-radius);background-color:var(--scrollbar-track-color);overflow:hidden;transition:var(--scrollbar-track-transition);cursor:default}::ng-deep .ng-scrollbar-thumb{box-sizing:border-box;position:relative;border-radius:inherit;background-color:var(--scrollbar-thumb-color);transform:translateZ(0);transition:var(--scrollbar-thumb-transition)}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }, {
      type: Directionality
    }, {
      type: SmoothScrollManager
    }, {
      type: ScrollbarManager
    }];
  }, {
    disabled: [{
      type: Input
    }],
    sensorDisabled: [{
      type: Input
    }],
    pointerEventsDisabled: [{
      type: Input
    }],
    viewportPropagateMouseMove: [{
      type: Input
    }],
    autoHeightDisabled: [{
      type: Input
    }],
    autoWidthDisabled: [{
      type: Input
    }],
    viewClass: [{
      type: Input
    }],
    trackClass: [{
      type: Input
    }],
    thumbClass: [{
      type: Input
    }],
    minThumbSize: [{
      type: Input
    }],
    trackClickScrollDuration: [{
      type: Input
    }],
    pointerEventsMethod: [{
      type: Input
    }],
    track: [{
      type: Input
    }],
    visibility: [{
      type: Input
    }],
    appearance: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    sensorDebounce: [{
      type: Input
    }],
    scrollAuditTime: [{
      type: Input
    }],
    updated: [{
      type: Output
    }],
    scrollbarY: [{
      type: ViewChild,
      args: ["scrollbarY", {
        read: ElementRef
      }]
    }],
    scrollbarX: [{
      type: ViewChild,
      args: ["scrollbarX", {
        read: ElementRef
      }]
    }],
    defaultViewPort: [{
      type: ViewChild,
      args: [ScrollViewport, {
        static: true
      }]
    }],
    customViewPort: [{
      type: ContentChild,
      args: [ScrollViewport, {
        static: true
      }]
    }]
  });
})();
var _NgScrollbarModule = class _NgScrollbarModule {
};
_NgScrollbarModule.ɵfac = function NgScrollbarModule_Factory(t) {
  return new (t || _NgScrollbarModule)();
};
_NgScrollbarModule.ɵmod = ɵɵdefineNgModule({
  type: _NgScrollbarModule,
  imports: [NgScrollbar, ScrollViewport],
  exports: [NgScrollbar, ScrollViewport]
});
_NgScrollbarModule.ɵinj = ɵɵdefineInjector({});
var NgScrollbarModule = _NgScrollbarModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarModule, [{
    type: NgModule,
    args: [{
      imports: [NgScrollbar, ScrollViewport],
      exports: [NgScrollbar, ScrollViewport]
    }]
  }], null, null);
})();
export {
  NG_SCROLLBAR_OPTIONS,
  NgScrollbar,
  NgScrollbarModule,
  ScrollViewport,
  ScrollbarManager
};
//# sourceMappingURL=ngx-scrollbar.js.map
