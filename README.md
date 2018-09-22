# Socket.IO Demo

This is a small demo created for Socket.IO (website: https://socket.io/), a JavaScript library which enables real-time, two way communication between clients and servers. The demo was created as part of Assignment 2 for Advanced Internet Programming 2018 at the University of Technology, Sydney. A walkthrough of the demo is provided in the following YouTube video: https://youtu.be/PT2vd-eaefQ

*Author: Mitchell Clarke*



## Installation

* Ensure that you have **node.js** and **npm** installed on your computer. You can get them from the following website: https://nodejs.org/en/. In particular, this project is confirmed to work with the latest long-term support (LTS) version, which at the time of writing is 8.12.0.

* Clone this repository using your preferred method. If you're using git through terminal, you can use the following command:

  ```sh
  git clone https://github.com/MJClarke93/SocketDemo.git
  ```

* Open the root folder (where package.json is located) of the project in terminal and install **Express**, **Socket.IO** and their dependencies using the following command:

  ```shell
  npm install
  ```



## Usage

Three demo files are provided: **server.js**, **demo.html** and **colour.html**

* Server.js is an Express/Socket.IO server which acts as a back-end to the two HTML web-pages. The code which starts the server, manages sockets, responds to client messages and passes client messages between each other can be found here. It listens at http://localhost:4000.
* Demo.html is an HTML page which connects to the back-end server via Socket.IO. Clicking 'Send to Server' will cause the message entered in the input box to appear in the server's console, provided the server is running. Clicking 'Broadcast' will send the message to all other clients connected to /demo.
* Colour.html is also an HTML page which connects to the back-end server via Socket.IO. Clicking 'Join Blue' or 'Join Red' will cause your client to opt in to receive messages of that colour. Clicking 'Send' will send the message in the input box to every other client that has opted into that colour. Additionally, the server will periodically send small or large random numbers to the clients, depending on their colour.

To view the demos, open a terminal in the root folder of the project and use the following command to start the server:

```shell
node server.js
```

Then open http://localhost:4000/demo and http://localhost:4000/colour to view the respective demo pages.



---

If you encounter any issues or have any questions, feel free to leave a comment.
