import React from 'react';

function App() {
  return (
    <div className="app">
      <section className="side-bar">
        <button>New Chat</button>
        <ul className="history">
          <li></li>
        </ul>
        <nav>
          <p>Made by Ali</p>
        </nav>
      </section>
      <section className="main">
        <h1>AliGPT</h1>
        <ul className="feed"></ul>
        <div className="bottom-section">
          <div className="input-container">

            <input />
            <div id="submit">✅</div>
          </div>
        </div>
        <p className="info">
          Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 12 Version
        </p>
      </section>
    </div>
  );
}

export default App;
