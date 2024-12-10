import React from "react";

interface TweetButtonProps {
  quote: string;
  url: string;
  image: string;
}

const TweetButton: React.FC<TweetButtonProps> = ({ quote, url }) => {
  const tweetURL = encodeURIComponent(url);
  const tweetText = encodeURIComponent(`"${quote}"`);

  const twitterIntentURL = `https://twitter.com/intent/tweet?url=${tweetURL}&text=Yeni%20Yıl%20Mesajım%20:%20${tweetText}&hashtags=HappyNewYear&via=mommytsx`;
  return (
    <a
      href={twitterIntentURL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: "#1DA1F2",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "5px",
        textDecoration: "none",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-4 text-white fill-current"
        >
          <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
        </svg>
      </div>
      Twitter'da Paylaş
    </a>
  );
};

export default TweetButton;
