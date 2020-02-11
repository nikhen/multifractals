### Multifractal Cartoons
Here is a webpage implementing B. Mandelbrot's algorithm for multifractal cartoons.

#### Run as a webpage
In the root directory of this repository, run

    firefox index.html

#### Run as docker container
Run


    docker build . -t <SOME_TAG>
    docker run --name <SOME_NAME> -d -p 8080:80 <SOME_TAG>

in the directory where this README.md file is located. Note that suitable values for <SOME_TAG> and <SOME_NAME> have to be substituted.

The webpage can be viewed on localhost:8080.
