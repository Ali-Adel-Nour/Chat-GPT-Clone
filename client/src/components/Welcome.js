import React, { useEffect, useState } from "react";
import axios from "axios";
import './Chat.css';

const Welcome = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  useEffect(() => {
    let firstRender = true;
    const refreshToken = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/refresh", {
        withCredentials: true,
      }).catch((err) => console.log(err));

      const data = await res.data;
      return data;
    };

    const sendRequest = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/user", {
        withCredentials: true,
      }).catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);

  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue('');
  };

  const fetchRandomJoke = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      const data = await response.json();
      if (data.error) {
        console.log('Error:', data.error);
      } else {
        const joke = data.type === 'twopart' ? `${data.setup} ${data.delivery}` : data.joke;
        setMessage({ role: 'ChatGPT', content: joke });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/user', options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }

    // Fetch a random joke
    fetchRandomJoke();
  };

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: 'user',
          content: value
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content
        }
      ]);
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter(previousChat=>previousChat.title === currentTitle)
  const uniqueTitles =Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Ali</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>AliGPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              ✅
            </div>
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 12 Version
          </p>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
