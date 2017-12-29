# LibreTube

_Liberate the airwaves_

Problem: Most of the world's video content is hosted in YouTube. You don't
have a google account, but still wish to follow your favourite channels' videos.

Solution: Use self-hosted software to register your channels, then use YouTube's
data API to fetch them. No Google account required!

This project aims to supply that niche with a solution that can work for them.
This project enables you to take back ownership of your data while still being
able to watch the great content on YouTube.

![Screenshot of the app][screenshot]

## How does it work?

Create an API key for consuming API data, then register it in the app. If
worried about privacy, you can create a throwaway google account for the
purpose of consuming from the YouTube API.

In a nutshell, this project includes:

- A Server which reads from the YouTube API
- A Client where user sets an API token
- The server fetches the registered user's subscriptions
- A PWA client which can be installed on a user's phone

See also the [companion browser extension][webext].

## Privacy

> I need to create an account to get a YouTube API key? But how is that
> different from having a throwaway YouTube account?

It isn't. Creating an account for the purpose of consuming from the YouTube API
is the same idea as having a throwaway google account that you have your
subscriptions in. If that seems like a more appealing option for you, don't let
me stop you. However, consider the following points:

There is a difference in terms of tracking. This project proxies all assets
through the included web server, which makes it impossible for anyone to
include any tracking cookies with the assets. This also means you're not running
any proprietary javascript when watching YouTube, if that's something you care
about.

> Note: Thumbnails are currently not proxied

When using this service, it means you're not logged in to google in order to
view your subscriptions. This means it's much harder for google to track your
movements around the web using share buttons and google analytics and build
a profile on you.

Another cool aspect of the proxy server is that it is impossible for YouTube to
know how many users are on the other side, since we are using an API token and
not an idividual login. It could just as easily be many users that are using
this API token as far as google is concernec, which again makes it very hard to
build a profile on you.

## Censorship

LibreTube works great if you're in a situation where you are encountering
censorship. In the case YouTube is blocked, it is easy to spin up a VPS and put
LibreTube on it and watch videos from there instead. That way you are able to
use the application as a proxy, going around any blocks that have been placed on
the YouTube domain or IP adresses.

## Security

Security is something I take very seriously.

- The app uses a strong and modern algorithm to hash passwords.
- The app sets security headers via the helmet security library.
- The app includes CSP by default. The implementation is somewhat hamstrung by
  Next.js' lacking support though.

If you find any security sensitive flaws, feel free to contact me by email
directly. You can find it at henriksen.is.

## Technology

The app is very modern, using the latest in buzzword technology. The frontend is
a serverside rendered progressive webapp. The backend is
a nodejs fullstack javascript expressjs powered next.js rendered react app with
an Apollo GraphQL API wich is rehydrated on the client.

Enough buzzwords? Okay. Check this out:

INSERT GIF OF INSTALLING THE APP HERE.

That's PWA being installed on a phone. This way it should be able to replace
your YouTube app if your OS supports PWAs.

## Support

This project will never support any browsers other than the newest version of
the major browsers (excluding IE). It probably will work in earlier versions up
to a point, but your milage may vary.

## Setup

The easy way is to use docker-compose to automatically set up and configure
docker containers for you. If you set up an "ubuntu docker" one-click app on
digitalocean, for example, you can follow the following steps:

First, ensure all the required software is installed on your server:

- [Install yarn][install-yarn]
- [Install docker-compose][install-compose]
- [Node.js 8][install-node]

Then we check the code out from version control.

    git clone https://github.com/LibreTubeApp/LibreTube.git
    cd libretube

Almost there - now we install the project's dependant libaries.

    yarn

Then we ensure all project files are compiled into their runtime forms.

    yarn run build

Finally we run the server, which will run it on facing on port 80. Edit
`docker-compose.prod.yml` if you need to change any of this.

    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

> Note: Many production optimizations are currently not enabled, so it will be
> slower than it can potentially be

### Updating

When updating, simply pull and update the project.

    git pull
    yarn
    yarn run build
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml restart web

_TODO: Database migrations. Until this is implemented you may have to wipe your
db when upgrading._

To check for updates without updating, do a `git fetch` and `git status`. If it
says that you are behind remote origin, then you have updates available to pull.

### Without docker

The GraphQL server assumes a PGSQL database that is accessible. Configure the
settings using the environment variables `DBHOST`, `DBUSER`, `DBDATABASE` and
`DBPASSWORD`.

## Disclaimer

**I ONLY CONDONE THE USE OF THIS SOFTWARE FOR PERSONAL USE.**

This is mostly because the big G probably would take offense to anyone using
a proxy like this to make a competing product. This is entirely intended as an
alternative viewing platform for an individual with specific needs, not as
a competing product in any way.

[webext]: https://github.com/LibreTubeApp/LibreTube-webext
[install-yarn]: https://yarnpkg.com/en/docs/install#linux-tab
[install-compose]: https://docs.docker.com/compose/install/
[install-node]: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
[screenshot]: https://github.com/LibreTubeApp/LibreTube/raw/master/assets/screenshot.png
