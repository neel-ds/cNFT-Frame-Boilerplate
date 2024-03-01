# Mint cNFT Farcaster Frame on Solana Boilerplate
This is an example repo of cNFT minting [Farcaster Frame](https://www.farcaster.xyz/) on Solana using [Underdog Protocol](http://underdogprotocol.com/) and [Onchainkit](https://onchainkit.xyz/). The boilerplate includes a detailed implementation of creating the basic mint frame and validating user engagement on the cast. 

## 🧩 Prerequisites & Manual Setup

You must have a Solana wallet address to interact with this frame. Check out how to create a Phantom wallet from [here](https://phantom.app/download). 

Follow the instructions for the local environment: The user must have Node.js and pnpm to run this platform. Just download Node.js from [here](https://nodejs.org/en/download/).

### Underdog Protocol API Setup
Create an account at [Underdog Protocol](https://app.underdogprotocol.com/)  and get your `API Key` from the developer dashboard.

1. Create a project on [devnet](https://app.underdogprotocol.com/projects?network=DEVNET&page=1) or [mainnet](https://app.underdogprotocol.com/projects?network=MAINNET&page=1)

2. Generate an API key and paste it into the env file. [[devnet](https://app.underdogprotocol.com/developers?network=DEVNET&page=1)] [[mainnet](https://app.underdogprotocol.com/developers?network=MAINNET&page=1)]

3. You can generate your cNFTs through their [API playground](https://underdog.readme.io/reference/post_v2-projects-projectid-nfts) by providing projectId, API KEY, and metadata.

### Redis Setup
Create an account at [Upstash](https://console.upstash.com/) and get your Redis URL and token from the dashboard. 

1. Create a database in your preferred region and cloud provider.

2. Get your `REDIS_REST_URL` and `REDIS_REST_TOKEN` from the REST API section of your created database dashboard.

## 🛠️ Local Setup Instructions

**Clone the repo via CLI:**

```sh
git clone https://github.com/neel-ds/cNFT-Frame-Boilerplate.git 
cd cNFT-Frame-Boilerplate
```

**Install the required packages:**

```sh
pnpm install
```

**Add required environment variables mentioned in `.env.example` file**

```sh
touch .env.local  #Paste env variables in this file and your values
```

**In the project directory, you can run:**

```sh
pnpm dev
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**In the terminal, you can run: [OPTIONAL]**

Install ngrok in your system and do the needful config to run your app locally and test in [Frames Validator](https://warpcast.com/~/developers/frames). 
```sh
ngrok http http://localhost:3000
```
Check out [Ngrok docs](https://ngrok.com/docs/getting-started/) for more details.

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
