1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
- getElementById: Finds one element by its ID.
- getElementsByClassName: Finds many elements with the same class (returns a list).
- querySelector: Finds the first element that matches a CSS selector.
- querySelectorAll: Finds all elements that match a CSS selector (returns a list).


2. How to create and insert a new element into the DOM
- Use document.createElement("tagName") to create.
- Use parent.appendChild(newElement) or parent.insertBefore(newElement, reference) to insert.


3. Event Bubbling: When an event happens on a child element, it also “bubbles up” to its parent and ancestors, triggering their event listeners.


4. Event Delegation
- Instead of adding listeners to many child elements, you add one to their parent.
- Useful because it saves memory and works even for new elements added later.


5. Difference between preventDefault() and stopPropagation()
- preventDefault(): Stops the default action (like stopping a form from submitting).
- stopPropagation(): Stops the event from bubbling up to parent elements.
  
preventDefault(): This will cancel the default operation that is supposed to be performed e.g. cancel submission of a form.
stopPropagation(): This will cancel the event from propagating to the parent elements.
