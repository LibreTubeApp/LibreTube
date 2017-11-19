# libretube

Liberate the airwaves

Problem: Most of the world's video content is hosted in YouTube. You don't
have a google account, but still wish to follow your favourite channels' videos.

Solution: Use self-hosted software to register your channels, then use YouTube's
data API to fetch them. No Google account required!

Current plan:
- Server which reads from the YouTube API
- Client where user sets an API token
- Server which fetches the registered user's subscriptions
- PWA client which lists subscriptions' new videos
- Clicking on a video shows a youtube-nocookie.com iframe

## How does it work?

Create an API key for consuming API data, then register it in the app. If
worried about privacy, you can create a throwaway google account for the
purpose of consuming from the YouTube API.

## Privacy

> I need to create an account to get a YouTube API key? But how is that
> different from having a throwaway YouTube account?

It isn't. Creating an account for the purpose of consuming from the YouTube API
is the same idea as having a throwaway google account that you have your
subscriptions in. If that seems like a more appealing option for you, don't let
me stop you. However, consider the following points:

There is a difference in terms of tracking, though. This project proxies all
assets through the included web server, which makes it impossible for YouTube to
include any tracking elements with the video. This also means you're not running
any proprietary javascript when watching YouTube, if that's something you care
about.

> Note: Thumbnails are currently not proxied

When using this service, it means you're not logged in to google in order to
view your subscriptions. This means it's much harder for google to track your
movements around the web using share buttons and google analytics and build
a profile on you.

Another cool aspect of the proxy server is that it is impossible for YouTube to
know how many users are on the other side, since we are using an API token and
not an idividual login. It could just as easily be one or a small subset of
users, which again makes it very hard to build a profile on you.

## Setup

The easy way is to use docker-compose to automatically set up and configure
docker containers for you. If you set up an "ubuntu docker" one-click app on
digitalocean, for example, you can follow the following steps:

First we check the code out from version control.

    git clone https://gitlab.henriksen.is/espen/libretube.git
    cd libretube

Next, we install the required software.

- [Install yarn][install-yarn]
- [Install docker-compose][install-compose]
- [Node.js 8][install-node]

Almost there - now we install the project's dependant libaries.

    yarn

Finally we run the server, which will run it on facing on port 80. Edit
`docker-compose.prod.yml` if you need to change any of this.

    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

> Note: Many production optimizations are currently not enabled, so it will be
> slower than it can potentially be

### Without docker

The GraphQL server assumes a PGSQL database that is accessible. Configure the
settings using the environment variables `DBHOST`, `DBUSER`, `DBDATABASE` and
`DBPASSWORD`.

## Disclaimer

**I ONLY CONDONE THE USE OF THIS SOFTWARE FOR PERSONAL USE.**

This is mostly because I don't want to get in trouble with the big G..

[install-yarn]: https://yarnpkg.com/en/docs/install#linux-tab
[install-compose]: https://docs.docker.com/compose/install/
[install-node]: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
