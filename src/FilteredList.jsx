import React, { Component } from 'react';
import { DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    //The state is just a list of key/value pairs (like a hashmap)
    //TODO (FilteredList): Add an additional state variable within this.state called "type" and set it to a default value
    this.state = {
      search: ""
    };
  }

  //Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({search: event.target.value.trim().toLowerCase()});
  }

  //TODO (FilteredList): Set the state of the "type" state variable depending on what is passed in
  onFilter = (eventKey) => {
    this.setState({ type: eventKey });
  };

  //TODO (FilteredList): Change filterItem to take into account the "type" state variable when filtering
  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType = this.state.type === "All" || item.type === this.state.type;
    return matchesSearch && matchesType;
  };

  render() {
    return (
      <div className="filter-list" style={{ textAlign: 'center', margin: '20px' }}>
        <h1 style={{ color: '#4CAF50', fontSize: '2rem', marginBottom: '20px' }}>
          Produce Search
        </h1>
        <div style={{ marginBottom: '15px' }}>
          {/* Dropdown Menu for Type Selection */}
          <DropdownButton
            id="typeDropdown"
            title="Filter by Type"
            variant="success"
            style={{ display: 'inline-block', marginRight: '10px' }}
            onSelect={this.onFilter}
          >
            <Dropdown.Item eventKey="All">All </Dropdown.Item>
            <Dropdown.Item eventKey="Fruit">Fruit </Dropdown.Item>
            <Dropdown.Item eventKey="Vegetable">Vegetables</Dropdown.Item>
          </DropdownButton>

          <input
            type="text"
            placeholder="Search produce..."
            style={{
              padding: '8px',
              width: '250px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
            onChange={this.onSearch}
          />
        </div>
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
