import React, { useContext,useState } from 'react'
import NewsContext from '../../context/news/newsContext'

const Form = ({classification}) => {
    const newsContext = useContext(NewsContext)
    const {setTitle,setText,setError,getClassification} = newsContext
    const [state,setState] = useState({title:"",text:""})
    const onChange = (e) => {
        setState({...state,[e.target.name]:e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault()
        getClassification(state)
        setState({title:"",text:""})
    }

    const  {title,text} = state;
    return (
        <div className="card card-body mt-4 mb-4">
            <h5 class="card-title text-center mb-1">
                {classification.title}
            </h5>
            <table className="table table-responsive-sm">
                <tbody>
                    <tr>
                        <td>Classification</td>
                        <td>{classification.classification == 0 ? "Fake" : "Legit"}</td>
                    </tr>
                    <tr>
                        <td>Polarity</td>
                        <td>{classification.polarity}</td>
                    </tr>
                    <tr>
                        <td>Subjectivity</td>
                        <td>{classification.subjectivity}</td>
                    </tr>
                    <tr>
                        <td>Title Polarity</td>
                        <td>{classification.tpolarity}</td>
                    </tr>
                    <tr>
                        <td>Title Subjectivity</td>
                        <td>{classification.tsubjectivity}</td>
                    </tr>
                </tbody>
            </table>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input onChange={onChange} className="form-control" 
                    name="title" placeholder="headline" type="text" value={title} />
                </div>
                <div className="form-group">
                <input onChange={onChange} className="form-control" 
                    name="text" placeholder="article text" type="text" value={text} />
                </div>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary form-control">Classify</button>
                </div>
            </form>
        </div>
    )
}

export default Form
