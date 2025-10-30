# WDD 231: Web Frontend Development I

Welcome to Web Frontend Development. This course builds on your prior experience with the core
technologies of web design and development including HTML, CSS, JavaScript, and design. The
course focuses on user experience, accessibility, compliance, performance optimization, and
basic API use. It is anticipated that students who complete this course will have very firm
grasp of the core web technologies of HTML, CSS, and JavaScript and be ready for the next
sequence of application courses.

## Serve Pages with PHP

Define the host and port, along with the location folder that you want to serve the web server.
```bash
php -S localhost:8000
```
> Add `-t <folder>` to specify a different folder to serve.

For instance, to server the current folder, you would run:
```bash
php -S localhost:8000 -t .
```
> This will start a web server at `http://localhost:8000` serving the current folder.

For an specific folder like `week01`, you would run:
```bash
php -S localhost:8000 -t week01
```
> This will start a web server at `http://localhost:8000` serving the `week01` folder.
