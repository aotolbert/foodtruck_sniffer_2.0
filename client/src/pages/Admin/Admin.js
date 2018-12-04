import React, { Component } from 'react';
import { FormBtn, Input } from '../../components/Form';
import { Container } from '../../components/Grid';
import API from '../../utils/API';

class Admin extends Component {
  state = {
    truckName: '',
    truckTwitterId: '',
    truckUrl: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.truckName && this.state.truckTwitterId && this.state.truckUrl) {
      API.saveTruck({
        name: this.state.truckName,
        twitterId: this.state.truckTwitterId,
        url: this.state.truckUrl
      })
      .then(res => console.log('truck added'))
      .catch(err => console.log(err));
    }
  };

  render() {
    <Container>
      <form>
        <Input 
          label='Truck Name:'
          elementId='truck-name'
          handleInputChange={this.handleInputChange}
        />
        <Input 
          label='Twitter ID:'
          elementId='truck-twitter'
          handleInputChange={this.handleInputChange} 
        />
        <Input
          label='Truck URL:'
          elementId='truck-url' 
          handleInputChange={this.handleInputChange} 
        />
        <FormBtn 
          handleFormSubmit={this.handleFormSubmit}
        >Submit</FormBtn>
      </form>
    </Container>
  }
}

export default Admin;