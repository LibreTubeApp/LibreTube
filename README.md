# nextube

A self-hosted YouTube player

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

## Setup

The GraphQL server assumes a PGSQL database that is accessible. Configure the
settings using the environment variables `DBHOST`, `DBUSER`, `DBDATABASE` and
`DBPASSWORD`.
