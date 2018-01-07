# Contributing

So you want to help the LibreTube project? Awesome! I don't have much time to
work on projects, so any contribution, large or small, is greatly appreciated.
This document sets out some guidelines on how you can get started as easily as
possible.

This project adheres to the [Contributor Covenant Code of Conduct][COC], so rest
assured that all contributions will be treated with respect and empathy.

If you do not feel like contributing code, creating issues on any bugs you find
or suggestions for improvements are also appreciated. Writing documentation and
spreading the word about the project is also helpful. Also feel free to
participate in discussions in issues if you have an opinion.

## Required software

In order to work on this project, you're going to need a few tools. Ensure you
have the below set up on your machine.

### [nvm](https://github.com/creationix/nvm)

`nvm` ensures that you are running the correct version of `node` when compiling
the project. If you have a version that is too low, you might see
incompatibilities with webpack and plugins.

Alternately you can install node >= 8.x and npm >= 5.x on your machine

### [yarn](https://yarnpkg.com/en/docs/install)

This project uses an alternative package manager for `npm` called `yarn` to
install dependencies. There are many reasons for this, most notably speed and
consistency. If you need to read up on how it works, [this document explains
yarn](https://yarnpkg.com/en/docs/usage)

### [docker-compose](https://docs.docker.com/compose/install)

Compose is a tool for defining and running multi-container Docker applications.
This is used in development for setting up a database server with the correct
database and user and connecting it with the application on your machine. This
makes the setup trivial.

You can do development without this, but it is not recommended, as it means the
setup will be a lot harder.

## Setting up the project

Now that you have made sure you have the required tools, we can start setting up
the project. First you should make a fork and clone it to your machine so you
get a copy of the source code.

    git clone git@github.com:YOUR_USERNAME/LibreTube.git

To make it easier for you to keep the `master` branch up to date, you could
create a branch based on `master` for each feature you would like to work on,
but this is not required. It's just best practice.

    git checkout -b your-feature master

### Compiling

Now that the project is set up, we need to start compiling the code. This is
done in a few steps, and these need to be done every time you want to start
developing.

First we install the correct version of `node`. Skip this if you are not using
`nvm` and have the correct version installed globally instead.

    nvm install

Now we download and install all the dependencies into the `node_modules`
directory with the following command.

    yarn

Now we are ready to start the development server. Because the application
requires a database server, the project includes docker-compose configuration to
automatically set up the correct tables and users in a docker container. This
obviously requires that the docker is installed and the daemon is started, which
I assume you did as described earlier in this document.

    sudo docker-compose up

Now the server is set up and you can open http://localhost:3000 to open the app.

### First time use

If you have not logged in to the server before, you need to set up a few things
for it to work. First, let's create an account.

Navigate to http://localhost:3000/setupAccount and fill out the form. Once this
form is submitted, you should have an account that you can use to log in with.

Once you have logged in, navigate to the settings menu. Here you will need to
set up an API key that can be used to fetch subcriptions from YouTube.

In order to get an API key, follow the [API key setup guide][API_KEY].

[COC]: https://github.com/LibreTubeApp/LibreTube/blob/master/CODE_OF_CONDUCT.md
[API_KEY]: https://support.google.com/cloud/answer/6158862
