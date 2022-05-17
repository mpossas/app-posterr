# Posterr

## Getting Started

- Install [Node LTS](https://nodejs.org/en/)
- Install dependencies: 
``` bash
$ npm i
```

## Running

``` bash
$ npm start
```
- Open http://localhost:3000/

## Features

### Home
![](/src/assets/images/dark.png)
![](/src/assets/images/light.png)
![](/src/assets/images/desktop.png)

### Profile
![](/src/assets/images/user.png)
![](/src/assets/images/unfollow.png)
![](/src/assets/images/follow.png)

### Post
![](/src/assets/images/draft.png)
![](/src/assets/images/post.png)

### Repost
![](/src/assets/images/repost-action.png)
![](/src/assets/images/repost.png)

### Quote
![](/src/assets/images/quote-action.png)
![](/src/assets/images/quote-modal.png)
![](/src/assets/images/quote.png)

## Critique

In a real-life situation, I would use Vuex to implement state management for the application. It provides a more structured and decoupled access to data.

I would also use NuxtJS for SSR. The service layer, that mutates data from the back-end, would be handled by a server with superior computing power.

We could also break down the feed and user profile into microfrontends, each handling their own responsibilities.

Thinking about maintenance, we could add unit tests (Jest) and E2E (Cypress) to ensure the code is working, and add logs (Sentry) to monitor application health.

The content could also be cached by a CDN (Amazon CloudFront), providing faster content loading to the user.
