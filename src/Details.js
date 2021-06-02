import React from 'react';
import { NavLink } from 'react-router-dom';

class Details extends React.Component{

    state = {
        error: null,
        isLoaded: false,
        details: {}
      }
    
      componentDidMount() {
        console.log("id:",this.props.match.params.id);
    
        fetch('https://dekpo.herokuapp.com/posts/' + this.props.match.params.id)
          .then(response => response.json())
          .then(
            data => {
              this.setState({
                isLoaded: true,
                details: data
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
    
    render(){

        const { error, isLoaded, details } = this.state;

        if (error) {
          return (
            <div>Oups ERROR</div>
          )
        } else if (!isLoaded) {
          return (
            <div>Chargement toujours en cours...</div>
          )
        } else {
          return (
              <article>
              <div>{details._id}</div>
              <h2>{details.title}</h2>
              <h3>{details.img}</h3>
              <p>{details.text}</p>
              <NavLink to="/">Retour à la liste</NavLink>
              </article>
          )
        }
    }
}

export default Details