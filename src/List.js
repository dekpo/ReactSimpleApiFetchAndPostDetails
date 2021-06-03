import React,{ useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// composant fonction
const Like = () => {
  const [count,setCount] = useState(0)
  const [liked,setLike] = useState(false)
  const [display,setDisplay] = useState(true)

  useEffect(()=>{
    if (count>0) console.log(`you liked ${count} times `)
    if (count===20) {
      alert("Euh stop stp !")
      setDisplay(false)
    }
  },[count])

  useEffect(()=>{
   if (liked) console.log(`you clicked liked ! ${liked.toString()}  `)
  },[liked])

 return(
  <>
  {(() => display ? <button onClick={()=>setCount(count+1)}>{count} Like(s)</button> : <span>{count} likes</span> )()}<br />
  <button onClick={()=>setLike(!liked)}>Liked {liked.toString()}</button>
  </>
 )
}

// conposant fonction form
const Form = ({id}) => {

  const handleSubmit = (e) => {

    // ne pas poster le formulaire
    e.preventDefault()
    // on définit le contenu de notre formulaire à poster
    const JsonBody = {
      title: e.target.title.value,
      text: e.target.text.value
    }
    // on effectue la requête fetch avec la méthode post
    fetch('http://localhost:443/posts/',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JsonBody)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log('The script response is: ',data)
    })
    e.target.reset()
  }

  return(
    <form onSubmit={(e)=>handleSubmit(e)}>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="text" placeholder="Text" />
      <input type="submit" value="Post" />
    </form>
  )
}

// composant class
class List extends React.Component {

  state = {
    displayList: true,
    error: false,
    isLoaded: false,
    items: []
  }

  componentDidMount() {
    console.log("componentDidMount");

    fetch('http://localhost:443/posts/')
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            items: data.reverse()
          })
          console.log('Fetch success', data)
        },
        error => {
          this.setState({
            error: error
          })
          console.log(error)
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return (
        <>
        <div>NEW FORM</div>
        <Form />
        </>
      )
    } else if (!isLoaded) {
      return (
        <div>Chargement toujours en cours...</div>
      )
    } else {
      return (      
        items.map(item => (
          <article key={item._id}>
            <p><Like /></p>
            <NavLink to={"/details/" + item._id}>
            {
            (() => {
              if (item.img) {
                return(
                  <img src={"http://localhost:443/posts/" + item.img} width="100" alt={item.title} />
                )
              }
            })()
            }
          <p>{item.title}</p>
          </NavLink>
          <hr />
          </article>
        ))     
      )
    }
  }
}

export default List;
