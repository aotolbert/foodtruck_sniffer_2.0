import React from "react";
import { SearchBtn } from '../../../components/PanelButtons';
import { Container } from '../../Grid';
import "./DefaultPanel.css";


const DefaultPanel = props => (
  <Container
  id="slideID">   
    <div id="slidepanel" data-flag="defaultPanel">
    <SearchBtn 
    onClick= {props.onClickExpand()} 
    >    <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
    </div>
    <input type="text" className="form-control" placeholder="Find Food Trucks" aria-label="Search" aria-describedby="basic-addon1"/>
  </div>
    </SearchBtn>
  </div>

  </Container>

  );

  export default DefaultPanel;
  
  