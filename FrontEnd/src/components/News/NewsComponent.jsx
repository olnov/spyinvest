import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from "react-bootstrap/esm/CardBody";
import CardLink from "react-bootstrap/esm/CardLink";
import CardText from "react-bootstrap/esm/CardText";
import CardTitle from "react-bootstrap/esm/CardTitle";
const ALPACA_KEY = import.meta.env.VITE_APCA_API_KEY_ID;
const ALPACA_SEC = import.meta.env.VITE_APCA_API_SECRET_KEY;

export const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    let socket;

    const fetchFeed = async () => {
      try {
        socket = new WebSocket('wss://stream.data.alpaca.markets/v1beta1/news');

        await new Promise((resolve, reject) => {
          socket.onopen = () => {
            console.log("WebSocket connected");
            resolve();
          };

          socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            reject(error);
          };
        });

        // Send authentication message
        const authMessage = {
          action: "auth",
          key: ALPACA_KEY,
          secret: ALPACA_SEC
        };
        socket.send(JSON.stringify(authMessage));

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received:', data);
           
  
            // Handle successful authentication response
            if (data[0]?.T === 'success' && data[0]?.msg === 'authenticated') {
              console.log('Authentication successful, subscribing to news...');
              // Only send the subscription message after authentication succeeds
              const subscribeMessage = {
                action: "subscribe",
                news: ["*"]
              };
              socket.send(JSON.stringify(subscribeMessage));
              console.log("Subscribe message sent");
            }
  
            // Handle incoming news messages after subscription
            if (data[0].T === 'n') { // 'n' stands for news. Please see Alpaca docs -https://docs.alpaca.markets/docs/streaming-real-time-news
              setNews((prevNews) => [data[0], ...prevNews]);
                // setNews(data)
                console.log('News item received:', data[0]);
            }
          };

        // Handle WebSocket closure
        socket.onclose = () => {
          console.log("WebSocket disconnected");
        };

      } catch (error) {
        console.error("Can't connect to WebSocket:", error);
      }
    };

    fetchFeed();

    // Cleanup function
    return () => {
      if (socket) {
        socket.close();
        console.log("WebSocket closed on cleanup");
      }
    };
  }, []);  // Runs only once on mount

  // Function to safely decode HTML entities in strings
  const decodeEntities = (encodedString) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = encodedString;
    return textArea.value;
  };


  return (
    <>
      <h4>Latest News</h4>
      <div>
        {news.length > 0 ? (
          <ul style={{ listStyleType: "none" }}>
            {news.map((item, index) => (
              <>
              <li key={index}>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                {decodeEntities(item.headline)}
                            </CardTitle>
                            <CardText>
                                {decodeEntities(item.summary)}
                            </CardText>
                            <CardLink href={item.url}>
                                Read more
                            </CardLink>
                        </CardBody>
                    </Card>
                </li>
                <p> </p>
                </>
            ))}
          </ul>
        ) : (
          <p>No news available yet. It's a realtime feed with no history. Please wait.</p>
        )}
      </div>
    </>
  );
};

export default News;
