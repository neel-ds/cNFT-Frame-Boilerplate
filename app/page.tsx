/* This is the main page of the app. 
   It uses the FrameMetadata component to display
   the mint button & the image of the NFT. */
import { FrameMetadata } from "@coinbase/onchainkit";

export default function Home() {
  return (
    <FrameMetadata
      buttons={[
        {
          label: "Mint",
          action: "post",
        },
      ]}
      image={{
        src: `${process.env.HOST_URL}/cnft.png`,
        aspectRatio: "1:1",
      }}
      postUrl={`${process.env.HOST_URL}/mint`}
    />
  );
}
