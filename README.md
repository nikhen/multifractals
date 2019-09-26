This is a docker image containig a webpage served by nginx displaying multifractal cartoons.

The frontend uses openUI5 controls and the plotly library.

To run this container, execute

docker build . -t <SOME_TAG>
docker run --name <SOME_NAME> -d -p 8080:80 <SOME_TAG>

in the directory where this README.md file is located. Note that suitable values for <SOME_TAG> and <SOME_NAME> have to be substituted.

The webpage can be viewed on localhost:8080.
