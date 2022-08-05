var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => ScrollSpeed
});
var import_obsidian = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  speed: 5,
  altMultiplier: 5
};
var ScrollSpeed = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.scrollListener = (event) => {
      event.preventDefault();
      let { deltaX, deltaY } = event;
      if (event.shiftKey) {
        deltaX = deltaX || deltaY;
        deltaY = 0;
      }
      if (event.altKey) {
        deltaX *= this.settings.altMultiplier;
        deltaY *= this.settings.altMultiplier;
      }
      const isHorizontal = deltaX && !deltaY;
      const path = event.path || event.composedPath && event.composedPath();
      for (const element of path) {
        if (this.isScrollable(element, isHorizontal)) {
          element.scrollBy(deltaX * this.settings.speed, deltaY * this.settings.speed);
          break;
        }
      }
    };
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new SettingsTab(this.app, this));
      window.addEventListener("wheel", this.scrollListener, { passive: false });
    });
  }
  isScrollable(element, horizontal) {
    return this.isContentOverflowing(element, horizontal) && this.hasOverflowStyle(element, horizontal);
  }
  isContentOverflowing(element, horizontal) {
    const client = horizontal ? element.clientWidth : element.clientHeight;
    const scroll = horizontal ? element.scrollWidth : element.scrollHeight;
    return client < scroll;
  }
  hasOverflowStyle(element, horizontal) {
    const style = getComputedStyle(element);
    const overflow = style.getPropertyValue(horizontal ? "overflow-x" : "overflow-y");
    return /^(scroll|auto)$/.test(overflow);
  }
  onunload() {
    window.removeEventListener("wheel", this.scrollListener);
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
var SettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    let speedSlider;
    new import_obsidian.Setting(containerEl).setName("Mouse Scroll Speed").setDesc("1 is the default scroll speed, higher is faster").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.speed = DEFAULT_SETTINGS.speed;
        speedSlider.setValue(DEFAULT_SETTINGS.speed);
        yield this.plugin.saveSettings();
      }));
    }).addSlider((slider) => {
      speedSlider = slider;
      slider.setValue(this.plugin.settings.speed).setLimits(1, 10, 1).setDynamicTooltip().onChange((value) => __async(this, null, function* () {
        this.plugin.settings.speed = value;
        yield this.plugin.saveSettings();
      }));
    });
    let altMultiplierSlider;
    new import_obsidian.Setting(containerEl).setName("Alt Multiplier").setDesc("Multiply scroll speed when the ALT key is pressed").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.altMultiplier = DEFAULT_SETTINGS.altMultiplier;
        altMultiplierSlider.setValue(DEFAULT_SETTINGS.altMultiplier);
        yield this.plugin.saveSettings();
      }));
    }).addSlider((slider) => {
      altMultiplierSlider = slider;
      slider.setValue(this.plugin.settings.altMultiplier).setLimits(1, 10, 1).setDynamicTooltip().onChange((value) => __async(this, null, function* () {
        this.plugin.settings.altMultiplier = value;
        yield this.plugin.saveSettings();
      }));
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtBcHAsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgU2xpZGVyQ29tcG9uZW50fSBmcm9tICdvYnNpZGlhbidcclxuXHJcbmludGVyZmFjZSBBdWdtZW50ZWRXaGVlbEV2ZW50IGV4dGVuZHMgV2hlZWxFdmVudCB7XHJcbiAgcGF0aDogRWxlbWVudFtdXHJcbn1cclxuXHJcbmludGVyZmFjZSBTZXR0aW5ncyB7XHJcbiAgc3BlZWQ6IG51bWJlclxyXG4gIGFsdE11bHRpcGxpZXI6IG51bWJlclxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTZXR0aW5ncyA9IHtcclxuICBzcGVlZDogNSxcclxuICBhbHRNdWx0aXBsaWVyOiA1LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxTcGVlZCBleHRlbmRzIFBsdWdpbiB7XHJcbiAgc2V0dGluZ3M6IFNldHRpbmdzXHJcblxyXG4gIGFzeW5jIG9ubG9hZCgpIHtcclxuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKClcclxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5zY3JvbGxMaXN0ZW5lciwge3Bhc3NpdmU6IGZhbHNlfSlcclxuICB9XHJcblxyXG4gIHNjcm9sbExpc3RlbmVyID0gKGV2ZW50OiBBdWdtZW50ZWRXaGVlbEV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgbGV0IHtkZWx0YVgsIGRlbHRhWX0gPSBldmVudFxyXG5cclxuICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICBkZWx0YVggPSBkZWx0YVggfHwgZGVsdGFZXHJcbiAgICAgIGRlbHRhWSA9IDBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQuYWx0S2V5KSB7XHJcbiAgICAgIGRlbHRhWCAqPSB0aGlzLnNldHRpbmdzLmFsdE11bHRpcGxpZXJcclxuICAgICAgZGVsdGFZICo9IHRoaXMuc2V0dGluZ3MuYWx0TXVsdGlwbGllclxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IGRlbHRhWCAmJiAhZGVsdGFZXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5MjQ1NjM4Lzg1ODY4MDNcclxuICAgIGNvbnN0IHBhdGggPSBldmVudC5wYXRoIHx8IChldmVudC5jb21wb3NlZFBhdGggJiYgKGV2ZW50LmNvbXBvc2VkUGF0aCgpIGFzIEVsZW1lbnRbXSkpXHJcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcGF0aCkge1xyXG4gICAgICBpZiAodGhpcy5pc1Njcm9sbGFibGUoZWxlbWVudCwgaXNIb3Jpem9udGFsKSkge1xyXG4gICAgICAgIC8vIFRPRE8gc2Nyb2xsIGFuaW1hdGlvbiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDcyMDYyODkvODU4NjgwM1xyXG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsQnkoZGVsdGFYICogdGhpcy5zZXR0aW5ncy5zcGVlZCwgZGVsdGFZICogdGhpcy5zZXR0aW5ncy5zcGVlZClcclxuICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1Njcm9sbGFibGUoZWxlbWVudDogRWxlbWVudCwgaG9yaXpvbnRhbDogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5pc0NvbnRlbnRPdmVyZmxvd2luZyhlbGVtZW50LCBob3Jpem9udGFsKSAmJiB0aGlzLmhhc092ZXJmbG93U3R5bGUoZWxlbWVudCwgaG9yaXpvbnRhbClcclxuICAgIClcclxuICB9XHJcblxyXG4gIGlzQ29udGVudE92ZXJmbG93aW5nKGVsZW1lbnQ6IEVsZW1lbnQsIGhvcml6b250YWw6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGNsaWVudCA9IGhvcml6b250YWwgPyBlbGVtZW50LmNsaWVudFdpZHRoIDogZWxlbWVudC5jbGllbnRIZWlnaHRcclxuICAgIGNvbnN0IHNjcm9sbCA9IGhvcml6b250YWwgPyBlbGVtZW50LnNjcm9sbFdpZHRoIDogZWxlbWVudC5zY3JvbGxIZWlnaHRcclxuICAgIHJldHVybiBjbGllbnQgPCBzY3JvbGxcclxuICB9XHJcblxyXG4gIGhhc092ZXJmbG93U3R5bGUoZWxlbWVudDogRWxlbWVudCwgaG9yaXpvbnRhbDogYm9vbGVhbikge1xyXG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXHJcbiAgICBjb25zdCBvdmVyZmxvdyA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoaG9yaXpvbnRhbCA/ICdvdmVyZmxvdy14JyA6ICdvdmVyZmxvdy15JylcclxuICAgIHJldHVybiAvXihzY3JvbGx8YXV0bykkLy50ZXN0KG92ZXJmbG93KVxyXG4gIH1cclxuXHJcbiAgb251bmxvYWQoKSB7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnNjcm9sbExpc3RlbmVyKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSlcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncylcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcbiAgcGx1Z2luOiBTY3JvbGxTcGVlZFxyXG5cclxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBTY3JvbGxTcGVlZCkge1xyXG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pXHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpblxyXG4gIH1cclxuXHJcbiAgZGlzcGxheSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzXHJcbiAgICBjb250YWluZXJFbC5lbXB0eSgpXHJcblxyXG4gICAgbGV0IHNwZWVkU2xpZGVyOiBTbGlkZXJDb21wb25lbnRcclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnTW91c2UgU2Nyb2xsIFNwZWVkJylcclxuICAgICAgLnNldERlc2MoJzEgaXMgdGhlIGRlZmF1bHQgc2Nyb2xsIHNwZWVkLCBoaWdoZXIgaXMgZmFzdGVyJylcclxuICAgICAgLmFkZEV4dHJhQnV0dG9uKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uXHJcbiAgICAgICAgICAuc2V0SWNvbigncmVzZXQnKVxyXG4gICAgICAgICAgLnNldFRvb2x0aXAoJ1Jlc3RvcmUgZGVmYXVsdCcpXHJcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNwZWVkID0gREVGQVVMVF9TRVRUSU5HUy5zcGVlZFxyXG4gICAgICAgICAgICBzcGVlZFNsaWRlci5zZXRWYWx1ZShERUZBVUxUX1NFVFRJTkdTLnNwZWVkKVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLmFkZFNsaWRlcihzbGlkZXIgPT4ge1xyXG4gICAgICAgIHNwZWVkU2xpZGVyID0gc2xpZGVyXHJcbiAgICAgICAgc2xpZGVyXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3BlZWQpXHJcbiAgICAgICAgICAuc2V0TGltaXRzKDEsIDEwLCAxKVxyXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcclxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNwZWVkID0gdmFsdWVcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKClcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgbGV0IGFsdE11bHRpcGxpZXJTbGlkZXI6IFNsaWRlckNvbXBvbmVudFxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdBbHQgTXVsdGlwbGllcicpXHJcbiAgICAgIC5zZXREZXNjKCdNdWx0aXBseSBzY3JvbGwgc3BlZWQgd2hlbiB0aGUgQUxUIGtleSBpcyBwcmVzc2VkJylcclxuICAgICAgLmFkZEV4dHJhQnV0dG9uKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uXHJcbiAgICAgICAgICAuc2V0SWNvbigncmVzZXQnKVxyXG4gICAgICAgICAgLnNldFRvb2x0aXAoJ1Jlc3RvcmUgZGVmYXVsdCcpXHJcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFsdE11bHRpcGxpZXIgPSBERUZBVUxUX1NFVFRJTkdTLmFsdE11bHRpcGxpZXJcclxuICAgICAgICAgICAgYWx0TXVsdGlwbGllclNsaWRlci5zZXRWYWx1ZShERUZBVUxUX1NFVFRJTkdTLmFsdE11bHRpcGxpZXIpXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICAuYWRkU2xpZGVyKHNsaWRlciA9PiB7XHJcbiAgICAgICAgYWx0TXVsdGlwbGllclNsaWRlciA9IHNsaWRlclxyXG4gICAgICAgIHNsaWRlclxyXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFsdE11bHRpcGxpZXIpXHJcbiAgICAgICAgICAuc2V0TGltaXRzKDEsIDEwLCAxKVxyXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcclxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFsdE11bHRpcGxpZXIgPSB2YWx1ZVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQXNFO0FBV3RFLElBQU0sbUJBQTZCO0FBQUEsRUFDakMsT0FBTztBQUFBLEVBQ1AsZUFBZTtBQUFBO0FBR2pCLGdDQUF5Qyx1QkFBTztBQUFBLEVBQWhELGNBaEJBO0FBZ0JBO0FBU0UsMEJBQWlCLENBQUMsVUFBK0I7QUFDL0MsWUFBTTtBQUVOLFVBQUksRUFBQyxRQUFRLFdBQVU7QUFFdkIsVUFBSSxNQUFNLFVBQVU7QUFDbEIsaUJBQVMsVUFBVTtBQUNuQixpQkFBUztBQUFBO0FBR1gsVUFBSSxNQUFNLFFBQVE7QUFDaEIsa0JBQVUsS0FBSyxTQUFTO0FBQ3hCLGtCQUFVLEtBQUssU0FBUztBQUFBO0FBRzFCLFlBQU0sZUFBZSxVQUFVLENBQUM7QUFHaEMsWUFBTSxPQUFPLE1BQU0sUUFBUyxNQUFNLGdCQUFpQixNQUFNO0FBQ3pELGlCQUFXLFdBQVcsTUFBTTtBQUMxQixZQUFJLEtBQUssYUFBYSxTQUFTLGVBQWU7QUFFNUMsa0JBQVEsU0FBUyxTQUFTLEtBQUssU0FBUyxPQUFPLFNBQVMsS0FBSyxTQUFTO0FBQ3RFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTdCQSxTQUFTO0FBQUE7QUFDYixZQUFNLEtBQUs7QUFDWCxXQUFLLGNBQWMsSUFBSSxZQUFZLEtBQUssS0FBSztBQUM3QyxhQUFPLGlCQUFpQixTQUFTLEtBQUssZ0JBQWdCLEVBQUMsU0FBUztBQUFBO0FBQUE7QUFBQSxFQStCbEUsYUFBYSxTQUFrQixZQUFxQjtBQUNsRCxXQUNFLEtBQUsscUJBQXFCLFNBQVMsZUFBZSxLQUFLLGlCQUFpQixTQUFTO0FBQUE7QUFBQSxFQUlyRixxQkFBcUIsU0FBa0IsWUFBcUI7QUFDMUQsVUFBTSxTQUFTLGFBQWEsUUFBUSxjQUFjLFFBQVE7QUFDMUQsVUFBTSxTQUFTLGFBQWEsUUFBUSxjQUFjLFFBQVE7QUFDMUQsV0FBTyxTQUFTO0FBQUE7QUFBQSxFQUdsQixpQkFBaUIsU0FBa0IsWUFBcUI7QUFDdEQsVUFBTSxRQUFRLGlCQUFpQjtBQUMvQixVQUFNLFdBQVcsTUFBTSxpQkFBaUIsYUFBYSxlQUFlO0FBQ3BFLFdBQU8sa0JBQWtCLEtBQUs7QUFBQTtBQUFBLEVBR2hDLFdBQVc7QUFDVCxXQUFPLG9CQUFvQixTQUFTLEtBQUs7QUFBQTtBQUFBLEVBR3JDLGVBQWU7QUFBQTtBQUNuQixXQUFLLFdBQVcsT0FBTyxPQUFPLElBQUksa0JBQWtCLE1BQU0sS0FBSztBQUFBO0FBQUE7QUFBQSxFQUczRCxlQUFlO0FBQUE7QUFDbkIsWUFBTSxLQUFLLFNBQVMsS0FBSztBQUFBO0FBQUE7QUFBQTtBQUk3QixnQ0FBMEIsaUNBQWlCO0FBQUEsRUFHekMsWUFBWSxLQUFVLFFBQXFCO0FBQ3pDLFVBQU0sS0FBSztBQUNYLFNBQUssU0FBUztBQUFBO0FBQUEsRUFHaEIsVUFBZ0I7QUFDZCxVQUFNLEVBQUMsZ0JBQWU7QUFDdEIsZ0JBQVk7QUFFWixRQUFJO0FBQ0osUUFBSSx3QkFBUSxhQUNULFFBQVEsc0JBQ1IsUUFBUSxtREFDUixlQUFlLFlBQVU7QUFDeEIsYUFDRyxRQUFRLFNBQ1IsV0FBVyxtQkFDWCxRQUFRLE1BQVk7QUFDbkIsYUFBSyxPQUFPLFNBQVMsUUFBUSxpQkFBaUI7QUFDOUMsb0JBQVksU0FBUyxpQkFBaUI7QUFDdEMsY0FBTSxLQUFLLE9BQU87QUFBQTtBQUFBLE9BR3ZCLFVBQVUsWUFBVTtBQUNuQixvQkFBYztBQUNkLGFBQ0csU0FBUyxLQUFLLE9BQU8sU0FBUyxPQUM5QixVQUFVLEdBQUcsSUFBSSxHQUNqQixvQkFDQSxTQUFTLENBQU0sVUFBUztBQUN2QixhQUFLLE9BQU8sU0FBUyxRQUFRO0FBQzdCLGNBQU0sS0FBSyxPQUFPO0FBQUE7QUFBQTtBQUkxQixRQUFJO0FBQ0osUUFBSSx3QkFBUSxhQUNULFFBQVEsa0JBQ1IsUUFBUSxxREFDUixlQUFlLFlBQVU7QUFDeEIsYUFDRyxRQUFRLFNBQ1IsV0FBVyxtQkFDWCxRQUFRLE1BQVk7QUFDbkIsYUFBSyxPQUFPLFNBQVMsZ0JBQWdCLGlCQUFpQjtBQUN0RCw0QkFBb0IsU0FBUyxpQkFBaUI7QUFDOUMsY0FBTSxLQUFLLE9BQU87QUFBQTtBQUFBLE9BR3ZCLFVBQVUsWUFBVTtBQUNuQiw0QkFBc0I7QUFDdEIsYUFDRyxTQUFTLEtBQUssT0FBTyxTQUFTLGVBQzlCLFVBQVUsR0FBRyxJQUFJLEdBQ2pCLG9CQUNBLFNBQVMsQ0FBTSxVQUFTO0FBQ3ZCLGFBQUssT0FBTyxTQUFTLGdCQUFnQjtBQUNyQyxjQUFNLEtBQUssT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
