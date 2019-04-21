### Inside Node

To show how Node works from the inside and how some like, works:

```
console.log('Starting')

setTimeout(() => {
  console.log('2 second timer')
}, 2000)

setTimeout(() => {
  console.log('0 second timer')
}, 0)

console.log('Stopping')
```

#### Call Stack

 - Provided by V8
 - Single thread meaning only function can happen at a time
 - Holds the functions that are corrently running
 - Is a First In, Last Out sturture meaning the first function that goes inside of it is the last to go.
 - Node's starting function is called `main()` and add to the call stack
 - Once a function is done by returning a value either stated by the developer or `undefined` its remove the Call Stack

  Example: In the `main()` `console.log()` is called once `console.log()` display the text in the console its removed from the Call Stack and once all functions are removed, from the Call Stack, and no other code needs to execute the `main()` is removed.

#### Node APIs

 - Runs Node functions such as `setTimeout`
 - Add by the Call Stack when those functions run so once a Node function gets add to the Call Stack its transfer over to the Node APIs quere and the Node function is then removed from the Call Stack as it is not a native JavaScript function.
 - Goes top to bottom *NOT* waiting for any Node functions to finish as its mutiple thread. However, the functions themselfs are still single thread.

 Example: When two `setTimeout`, one set to 2 seconds then another is set to 0 seconds when the Node APIs is called. The 0 seconds timeout will be executed first then the 2 seconds even tho 2 second timeout was called first. 

#### Callback Queue

 - Holds any callback functions that the Node functions created end up here
 - First In, First Out sturture, meaning first function that goes inside of it is the first one that goes out

#### Event Loop

 - Is part of Node where it waits for the Call Stack to be empty
 - So once the Call Stack is empty, gets the first function from the callback queue and adds it to the Call Stack as that is were all functions are executed. 
 - Then once that Callback function is complated, takes the next function, if there is one and adds that to the Call Stack to run until there is no functions, in the Callback Queue left.

Once all Callback functions are done and there are no functions in Node APIs or Call Stack, the Node app ends.
