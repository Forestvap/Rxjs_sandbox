export const writeToSelector =
  <T>(selector: string, content: T): T => {
    const selection = document.querySelectorAll(selector);
    if(selection.length < 1) {
      throw new Error(`Couldn't find any elements using the selector "${selector}"`);
    }

    Array.from(selection)
      .forEach(elem =>
        Object.assign(elem, { innerHTML: content })
      );
    return content;
  };

export const isHtmlElement =
  (x: any): x is HTMLElement => {
    return x !== null
      && typeof x === 'object'
      && typeof x.tagName === 'string';
  };

type ElementSwapFunction = (parent: HTMLElement, children: HTMLElement[], newChild: HTMLElement) => void;

const defaultSwapFunction: ElementSwapFunction =
  (parent, children, newChild) => {
    children.forEach(child => child.remove());
    parent.appendChild(newChild);
  };

export const htmlFromString: (innerHTML: string) => HTMLElement =
  innerHTML => {
    const template = document.createElement('template');
    template.innerHTML = innerHTML;
    if(template.content.children.length !== 1) {
      console.error('A template did not produce a valid HTML Element!', innerHTML);
    }
    /* Extract the first child from the <template> */
    const element = Array.from(template.content.children)[0];
    element.innerHTML = element.innerHTML.trim();
    return element as HTMLElement;
  };

export const replaceContentAtSelector =
  (
    parentSelector: string,
    newElementOrString: HTMLElement | string,
    swapFunction = defaultSwapFunction
  ): HTMLElement => {
    const newElement = isHtmlElement(newElementOrString) ? newElementOrString : htmlFromString(newElementOrString);
    const selection = document.querySelectorAll(parentSelector);
    if(selection.length < 1) {
      throw new Error(`Couldn't find any elements using the selector "${parentSelector}"`);
    }

    Array.from(selection)
      .forEach((parentElement: HTMLElement) => {
        const children = (Array.from(parentElement.children) || []) as HTMLElement[];
        swapFunction(
          parentElement, // The parent element
          children, // The parent element's children
          newElement
        );
      });
    return newElement;
  };