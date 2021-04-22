class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };
 
  _element = null;
  _meta = null;
 
  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
 
    this.props = this._makePropsProxy(props);
 
    this.eventBus = () => eventBus;
 
    this._registerEvents(eventBus);
 
    eventBus.emit(Block.EVENTS.INIT);
  }
 
  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }
 
  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }
 
  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
 
  _componentDidMount() {
    this.componentDidMount();
  }
 
  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
 
  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
 
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
 
  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return oldProps !== newProps;
  }
 
  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
 
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._meta.props, nextProps);
  };
 
  get element() {
    return this._element;
  }
 
  _render() {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }
 
  // Может переопределять пользователь, необязательно трогать
  render() {}
 
  getContent() {
    return this.element;
  }
 
  _makePropsProxy(props) {
    const proxyProps = new Proxy(props, {
  get(target, prop) {
    if(prop.startsWith('_')){
      throw new Error('нет доступа')
    } else {
      let value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value;
    }
  },
  set(target, prop, val) { // перехватываем запись свойства
    if (prop.startsWith('_')) {
      throw new Error("нет доступа");
    } else {
      target[prop] = val;
      return true;
    }
  },
   deleteProperty(target, prop) { // перехватываем удаление свойства
    if (prop.startsWith('_')) {
      throw new Error("нет доступа");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) { // перехватываем попытку итерации
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});
    return proxyProps;
  }
 
  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }
 
  show() {
    this._element.style.display = "block";
  }
 
  hide() {
    this._element.style.display = "none";
  }
}
 