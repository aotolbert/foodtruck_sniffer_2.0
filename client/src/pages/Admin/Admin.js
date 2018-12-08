import React, { Component } from 'react';
import { FormBtn, Input } from '../../components/Form';
import { Container } from '../../components/Grid';
import API from '../../utils/API';
import SignOutButton from '../../components/SignOutButton';

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
    return (
      <Container>
        <form>
          <Input
            name='truckName'
            value={this.state.truckName}
            label='Truck Name:'
            elementId='truck-name'
            handleInputChange={this.handleInputChange}
          />
          <Input
            name='truckTwitterId'
            value={this.state.truckTwitterId}
            label='Twitter ID:'
            elementId='truck-twitter'
            handleInputChange={this.handleInputChange}
          />
          <Input
            name='truckUrl'
            value={this.state.truckUrl}
            label='Truck URL:'
            elementId='truck-url'
            handleInputChange={this.handleInputChange}
          />
          <FormBtn
            handleFormSubmit={this.handleFormSubmit}
          >Submit</FormBtn>
        </form>
        <SignOutButton />
      </Container>
    )
  }
}

export default Admin;