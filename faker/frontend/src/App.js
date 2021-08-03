import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import NewsState from "./context/news/NewsState"
import Header from "./components/layout/Header"
import News from "./components/pages/News"
export const App = () => {
    return (
        <NewsState>
            <Header />
            <div className="container-sm align-middle">
                <News/>
                {/* <h1>Hello World</h1>             */}
            </div>
        </NewsState>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))