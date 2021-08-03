import React, { useContext } from "react";
import NewsContext from "../../context/news/newsContext"

const Alert = () => {
    const newsContext = useContext(NewsContext)
    const { error } = newsContext
    return (
        error !== null && (
            <div className="alert alert-danger mt-2" role="alert">
                {error.msg}
            </div>
        )
    )
}

export default Alert
