import React from 'react';
import './App.css';
import Transfers from './Transfers/Transfers'
import Tickets from './Tickets/Tickets'


const URL = 'https://front-test.beta.aviasales.ru/';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transferCount: [],
            tickets: []
        };

        this.onTransferClick = this.onTransferClick.bind(this);
        this.getTickets = this.getTickets.bind(this);
    }

    componentDidMount() {
        fetch(URL + 'search')
            .then(data => data.json())
            .then(data => this.getTickets(data.searchId, []));
    }

    async getTickets(searchId, tickets) {
        const response = await fetch(URL + `tickets?searchId=${searchId}`);
        if (!response.ok) {
            this.getTickets(searchId, tickets);
            return;
        }
        const data = await response.json();
        if (data.stop) {
            this.setState({ tickets: tickets});
            return;
        }
        this.getTickets(searchId, tickets.concat(data.tickets));
    }

    onTransferClick(event) {
        const transferCount = this.state.transferCount;
        if (event.target.value === 'all') {
            this.setState({ transferCount: [] });
        } else {
            if (event.target.checked) {
                transferCount.push(Number(event.target.value));
            } else {
                transferCount.splice(transferCount.indexOf(Number(event.target.value)), 1);
            }
            this.setState({ transferCount });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="logo">
                    <img src="Logo.svg"/>
                </div>
                <div className="container">
                    <Transfers onTransferClick={this.onTransferClick} />
                    <Tickets tickets={this.state.tickets} transferCounts={this.state.transferCount} />
                </div>
            </div>
        );
    }
}

export default App;
