/* This is the route file which cooks the response for the mint button. 
   Make sure to paste the env variables before deploying the app. */
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const redis = new Redis({
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_KEY!,
  });
  const nftId = (await redis.get("nftId")) as number;
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  // Verify that request received from the Frame is valid
  if (!isValid) {
    return new NextResponse("Invalid Frame Request", { status: 400 });
  }

  // Check if the user has liked and recasted the cast
  if (!message?.liked && !message?.recasted) {
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: "Engage with cast",
        buttons: [
          {
            label: "Like & Recast!!",
            action: "post",
          },
        ],
        image: `${process.env.HOST_URL}/invalid.png`,
        postUrl: `${process.env.HOST_URL}`,
      })
    );
  }

  // Check if all the cNFTs are claimed
  if (nftId === 200) {
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: "Sold out",
        buttons: [
          {
            label: "Follow me",
            action: "link",
            target: "https://warpcast.com/neelpatel",
          },
        ],
        image: `${process.env.HOST_URL}/not-available.png`,
      })
    );
  }

  // Get the verified solana address of the user
  const address = message?.interactor?.verified_addresses?.sol_addresses?.[0];

  // If the user has not verified the address, redirect them to the verify the address
  if (!address) {
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: "No address found",
        buttons: [
          {
            label: "Connect your SOL wallet",
            action: "link",
            target: `https://verify.warpcast.com/verify/${message?.interactor?.fid}?redirect=https%3A%2F%2Fwarpcast.com%2F%7E%2Fsettings%2Fverifed-addresses&network=solana`,
          },
        ],
        image: `${process.env.HOST_URL}/not-found.png`,
      })
    );
  }

  // Using Underdog Protocol endpoint to mint the cNFT
  const bearer = process.env.UNDERDOG_API_KEY!;
  const UNDERDOG_URL = `https://devnet.underdogprotocol.com/v2/projects/${process.env.PROJECT_ID}/nfts/${nftId}/transfer`;
  const OPTIONS = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: bearer,
    },
    body: JSON.stringify({ receiverAddress: address }),
  };

  const response = await fetch(UNDERDOG_URL, OPTIONS).then((response) =>
    response.json()
  );

  /* If the minting fails, show the error message and a button to try again
    else show the success message and a button to view the cNFT on Explorer */
  if (response.code) {
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: "Mint Error",
        buttons: [
          {
            label: "Minting error! Try again",
            action: "post",
          },
        ],
        image: `${process.env.HOST_URL}/error.png`,
        postUrl: `${process.env.HOST_URL}`,
      })
    );
  } else {
    await redis.set("nftId", nftId + 1);
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: "Minted",
        buttons: [
          {
            label: "View your cNFT",
            action: "link",
            target: `https://solscan.io/account/${address}?cluster=devnet#portfolio`,
          },
        ],
        image: `${process.env.HOST_URL}/success.png`,
      })
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
