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

### Privacy

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

The GraphQL server assumes a PGSQL database that is accessible. Configure the
settings using the environment variables `DBHOST`, `DBUSER`, `DBDATABASE` and
`DBPASSWORD`.

## Disclaimer

**I ONLY CONDONE THE USE OF THIS SOFTWARE FOR PERSONAL USE.**

This is mostly because I don't want to get in trouble with the big G..

