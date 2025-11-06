# WDD 231: Web Frontend Development I

Welcome to Web Frontend Development. This course builds on your prior experience with the core
technologies of web design and development including HTML, CSS, JavaScript, and design. The
course focuses on user experience, accessibility, compliance, performance optimization, and
basic API use. It is anticipated that students who complete this course will have very firm
grasp of the core web technologies of HTML, CSS, and JavaScript and be ready for the next
sequence of application courses.

## Serve Pages with Vite

Install node dependencies and start development environment, this will create an hot reload
module (HRM) to ensure a fast development with refresh page on when editing files on the
project.

Install `node dependencies` and start the development server:
```bash
npm install
npm run dev
```

## Python Environment

This project uses `conda` and `uv` to manage the Python environment. Make sure you have
`conda` installed before proceeding.

Create and activate the conda environment:
```bash
conda env create -f environment.yml
conda activate wdd
make env
```
> This will set the `UV_PROJECT_ENVIRONMENT` variable to the conda environment path. However,
> you may need to start a new terminal session and activate the environment for the changes
> to take effect.

Install the package in editable mode:
```bash
uv pip install -e .
```
> Remove the `-e` flag to install the package in normal mode.

# License Notice

> [!IMPORTANT]
> The logo on this page is not licensed for reuse. It is used here for educational purposes only.
